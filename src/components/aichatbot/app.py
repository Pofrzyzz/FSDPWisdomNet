from flask import Flask, request, jsonify
from flask_cors import CORS
from intents_model import classify_intent

app = Flask(__name__)
CORS(app)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_message = data.get('message', '')
    intent, response = classify_intent(user_message)
    return jsonify({'intent': intent, 'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
