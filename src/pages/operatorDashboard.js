// src/components/operatorDashboard.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Express server URL on port 5000

function OperatorDashboard() {
  const [chatRequests, setChatRequests] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on('newChatRequest', (chatRequest) => {
      console.log('New chat request received:', chatRequest);
      setChatRequests((prevRequests) => [...prevRequests, chatRequest]);
    });

    socket.on('receiveMessage', (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.off();
  }, []);

  const acceptChat = (chat) => {
    setCurrentChat(chat);
    setChatRequests(chatRequests.filter((req) => req.chatId !== chat.chatId));

    // Initialize chat with the auto-generated welcome message
    setChatMessages([{ sender: 'operator', message: chat.message, timestamp: new Date() }]);
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('operatorMessage', message);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'operator', message, timestamp: new Date() },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <h2>Operator Dashboard</h2>
      <div>
        <h3>Incoming Chat Requests</h3>
        {chatRequests.map((chat, index) => (
          <div key={index}>
            <p><strong>{chat.name}</strong> - {chat.nric}</p>
            <button onClick={() => acceptChat(chat)}>Accept Chat</button>
          </div>
        ))}
      </div>

      {currentChat && (
        <div className="chat-window mt-4">
          <h3>Chat with {currentChat.name}</h3>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}:</strong> {msg.message}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default OperatorDashboard;
