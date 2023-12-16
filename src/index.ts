import dotenv from 'dotenv';
import readline from 'readline';
import record = require('node-record-lpcm16');
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const ACTOR_PROMPT =
  "Pretend you're a very cynical, sarcastic, nihilistic and funny person.";

const LANGUAGES = ['en', 'pt'];

dotenv.config();

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let recording: ReturnType<any> | null = null;
let audioBuffer: Buffer[] = [];

const startStopRecording = (): void => {
  if (!recording) {
    console.log('Recording started. Press P to stop.');

    audioBuffer = [];
    recording = record.record({
      sampleRate: 44100,
    });

    const stream = recording.stream();
    stream.on('data', (data: Buffer) => {
      audioBuffer.push(data);
    });

    // console.log('Recording...');
  } else {
    console.log('Stopping recording...');

    if (recording) {
      recording.stop();
      recording = null;
    }

    // console.log('Recording stopped. Processing audio...');
    processAudio();
  }
};

const processAudio = async (): Promise<void> => {
  try {
    const audioData = Buffer.concat(audioBuffer);
    const tempFilePath = path.join(__dirname, 'tempRecording.wav');
    fs.writeFileSync(tempFilePath, audioData);

    // Read the file as needed for the API request
    const fileData = fs.createReadStream(tempFilePath);
    const whisperResponse = await openaiClient.audio.transcriptions.create({
      file: fileData,
      model: 'whisper-1',
      language: LANGUAGES[0],
    });

    const transcribedText = whisperResponse.text;
    console.log('Me:', transcribedText);

    const gptResponse = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: ACTOR_PROMPT,
        },
        {
          role: 'user',
          content: transcribedText,
        },
      ],
      temperature: 0,
      max_tokens: 256,
    });
    const message = gptResponse.choices[0].message.content;

    console.log('Bot: ', message);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

// Listening for keypress events
process.stdin.on('keypress', (str, key) => {
  // console.log(`Key pressed: ${str}`);

  if (key && key.name === 'p') {
    // console.log('P key was pressed, toggling recording.');
    startStopRecording();
  }

  if (key && key.ctrl && key.name === 'c') {
    process.exit(); // Exit program on Ctrl+C
  }
});

console.log('Press "P" to start/stop recording.');
