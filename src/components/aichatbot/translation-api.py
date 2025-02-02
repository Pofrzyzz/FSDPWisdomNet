from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_translator import GoogleTranslator
from langdetect import detect

app = Flask(name)
CORS(app)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get("text")
    source = data.get("source", "auto")
    target = data.get("target", "en")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        # Detect language if source is auto.
        if source == "auto":
            detected_lang = detect(text)  # e.g., "ms", "en", etc.
        else:
            detected_lang = source

        translated_text = GoogleTranslator(source=detected_lang, target=target).translate(text)
        return jsonify({
            "translatedText": translated_text,
            "detectedLanguage": detected_lang
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if name == 'main':
    app.run(host="0.0.0.0", port=5055, debug=True)