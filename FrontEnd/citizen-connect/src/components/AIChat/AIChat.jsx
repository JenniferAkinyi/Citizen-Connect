import React, { useState } from 'react';
import axios from 'axios';
import './AIChat.css';

const AIChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { prompt: input });
      const aiMessage = { sender: 'ai', text: response.data.response };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    }

    setInput('');
  };

  return (
    <div className="ai-chat-container">
      <h2>AI Chat</h2>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AIChat;