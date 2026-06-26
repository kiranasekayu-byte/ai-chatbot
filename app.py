import os
from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

genai.configure(api_key=os.getenv("API_KEY"))

model = genai.GenerativeModel("gemini-pro")

@app.route("/")
def home():
    return "AI Chatbot Jalan"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data["message"]

    response = model.generate_content(message)

    return jsonify({"reply": response.text})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)