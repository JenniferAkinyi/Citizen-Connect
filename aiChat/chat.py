import os
import openai
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

api_key = os.getenv("AI_API_KEY")

client = openai.OpenAI(api_key=api_key)  # Use the new client structure

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow requests from your frontend's origin

def generate_response(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    response = generate_response(prompt)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
