# Toucan LLM Translator 🦜

A Chrome extension that translates selected text using a local LLM (via Ollama with Mistral). Select a word or sentence on any webpage to get a contextual translation with explanation.

## Features
- Translate selected words or phrases in real-time
- Spinner appears near your selection
- Works with a Flask API running locally on port 5000
- Manual input via popup also supported

## Tech Stack
- Chrome Extension (Manifest V3)
- Content Scripts + Popup UI
- Flask + Python backend
- Ollama + Mistral for local LLM inference

## Getting Started

1. Clone this repo
2. Load unpacked extension in Chrome via `chrome://extensions`
3. Start Flask backend: `python app.py`
4. Select any text on a webpage to translate

## License
MIT
