import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages(prev => [...prev, { id: Date.now(), text: input }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto p-4 bg-gradient-to-br from-pink-50 to-indigo-50">
      <h1 className="text-3xl font-bold text-center text-[#5f27cd] mb-6">Chat</h1>
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-white shadow mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="mb-2 p-2 bg-pink-100 rounded">
              {msg.text}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded shadow hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
