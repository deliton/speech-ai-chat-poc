# Voice Chat with ChatGPT

<img src="https://github.com/deliton/speech-ai-chat-poc/assets/47995046/a2944873-639a-4758-885e-70727d394715" width="320">

## Introduction

This repository contains a Proof-of-Concept for real-time voice interaction with a chatbot powered by OpenAI's GPT-3.5 model. The application allows users to speak to the bot, which then processes the speech, interacts with ChatGPT, and responds verbally.

## How it works

The application operates as a command-line interface (CLI) tool. It records the user's voice upon a keypress, sends the audio to OpenAI's Whisper service for transcription, and then forwards the transcribed text to ChatGPT. The response from ChatGPT is then displayed in the terminal.

### Key Features:

- Voice recording start/stop with a keypress.
- Audio transcription using OpenAI's Whisper.
- Interaction with ChatGPT using transcribed text.
- Support for English and Portuguese languages.

### Pre-requisites

Before running the application, ensure you have the following:

- Node installed.
- An OpenAI API key with access to GPT-3.5 and Whisper models.
- Sox installed for audio recording (Linux/Mac) or an equivalent audio tool for Windows. To get it installed:
  - For Mac: `brew install sox`
  - For Linux: `sudo apt-get install sox libsox-fmt-all`
  - For Windows: You can download the [binaries](https://github.com/gillesdemey/node-record-lpcm16#:~:text=download%20the%20binaries) or use [chocolately](https://chocolatey.org/install) to install the package: `choco install sox.portable`

## How to run

#### Clone the repository:

```bash
git clone git@github.com:gillesdemey/node-record-lpcm16.git
cd speech-ai-chat-poc
```

#### Install dependencies:

```bash
npm install
```

#### Set up your OpenAI API key:

- Create a .env file in the root of the project.
- Add the following line to the .env file:

```bash
OPENAI_API_KEY=your_openai_api_key
```

#### Compile TypeScript to JavaScript:

```bash
npm run build
```

#### Run the application:

```bash
npm start
```

## To interact with the application:

- Press "Enter" key to start or stop recording.
- Speak into your microphone when recording is active.
- Press "Enter" again to stop recording and process your speech.
- View ChatGPT's response in the terminal.

## Conclusion

This project demonstrates a way to interact with ChatGPT using voice, leveraging OpenAI's powerful language and speech processing models. It serves as a foundational experiment for more advanced voice-interactive applications in the future.
