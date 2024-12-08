import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';
import ReactMarkdown from 'react-markdown';

const chat_service = process.env.REACT_APP_CHAT_SERVICE;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [songs, setSongs] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // TODO: Replace with your actual API endpoint
      const userId = localStorage.getItem('user_id');
      console.log("User ID:", userId);
      const response = await fetch(chat_service, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          chat_id: null,
          query: inputMessage
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      console.log("Response:", response);
      const data = await response.json();

      // Add AI response
      const aiMessage = {
        type: 'ai',
        content: data.content || "I'm sorry, I couldn't process that request.",
        timestamp: new Date().toLocaleTimeString()
      };

      const songs = data.songs || [];

      setMessages(prev => [...prev, aiMessage]);
      setSongs(songs);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      const errorMessage = {
        type: 'ai',
        content: "Sorry, I'm having trouble connecting right now.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>Music Assistant</h2>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type}-message`}
          >
            <div className="message-content">
              {message.type === 'ai' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about music..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
