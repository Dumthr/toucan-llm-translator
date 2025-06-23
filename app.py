from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # ✅ Allow requests from all origins

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    word = data.get("word", "")
    sentence = data.get("sentence", "")
    target_lang = data.get("target_lang", "English")

    prompt = f"""
You are a helpful language tutor.
Translate the word "{word}" in the context of the sentence "{sentence}" into {target_lang}.
Also explain its meaning, grammar, and usage briefly.
"""

    res = requests.post("http://localhost:11434/api/generate", json={
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    })

    output = res.json().get("response", "Translation unavailable.")
    return jsonify({"translation": output})


if __name__ == "__main__":
    app.run(port=5000)
