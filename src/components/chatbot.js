// src/components/chatbot.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import chatbotIcon from '../images/chatbot.svg';

const socket = io('http://localhost:5000'); // Ensure this URL points to the Express server

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [step, setStep] = useState(1); // Start at step 1
  const [name, setName] = useState('');
  const [nric, setNric] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('chatAssigned', ({ operatorName, branch, department, greeting }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'operator',
          message: greeting,
          timestamp: new Date()
        }
      ]);
    });

    return () => socket.off();
  }, []);

  const startLiveChat = () => {
    setStep(2);
  };

  const submitUserInfo = () => {
    if (name && nric) {
      setStep(5); // Go to chat step after submitting
      socket.emit('startChat', { name, nric });
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const timestamp = new Date();
      socket.emit('chatMessage', message);
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', message, timestamp }]);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isChatOpen ? (
        <div className="bg-white shadow-lg rounded-lg" style={{ width: '375px', height: '578px' }}>
          <div className="flex justify-between items-center bg-[#DD101E] text-white rounded-t-lg" style={{ height: '106px', width: '375px' }}>
            <div className="flex items-center p-4">
              <img src={chatbotIcon} alt="Chatbot Icon" className="w-8 h-8 mr-2" />
              <div>
                <h2 className="text-lg font-bold">Need help?</h2>
                <p className="text-sm">Our chatbot is here to assist with your inquiries.</p>
              </div>
            </div>
            <button
              className="text-white hover:text-gray-200 text-2xl font-bold p-4"
              onClick={() => setIsChatOpen(false)}
            >
              &#x2212;
            </button>
          </div>
          <div className="p-4 flex flex-col h-full justify-between">
            {/* Step 1: Ask if the user wants to start a live chat */}
            {step === 1 && (
              <div>
                <p className="text-sm text-gray-600">Would you like to start a live chat?</p>
                <button className="bg-[#DD101E] text-white p-2 rounded-lg w-full mt-2" onClick={startLiveChat}>Yes, Start Live Chat</button>
              </div>
            )}

            {/* Step 2: Ask for user information */}
            {step === 2 && (
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 mb-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="NRIC"
                  value={nric}
                  onChange={(e) => setNric(e.target.value)}
                  className="w-full p-2 mb-2 border rounded-lg"
                />
                <button className="bg-[#DD101E] text-white p-2 rounded-lg w-full mt-2" onClick={submitUserInfo}>Submit</button>
              </div>
            )}

            {/* Step 5: Show chat messages */}
            {step === 5 && (
              <div>
                <div className="overflow-y-scroll h-80 mb-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col mb-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-2 rounded-lg max-w-xs text-sm ${msg.sender === 'user' ? 'bg-gray-300 text-black' : 'bg-gray-200 text-black'}`}>
                        {msg.message}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-l-lg"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button onClick={sendMessage} className="bg-[#DD101E] text-white p-2 rounded-r-lg">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button className="flex items-center bg-[#DD101E] text-white p-3 rounded-full shadow-lg hover:bg-[#C00E1A] transition-colors" onClick={() => setIsChatOpen(true)}>
          <img src={chatbotIcon} alt="Chatbot Icon" className="w-8 h-8 mr-2" />
          <span>Need Help</span>
        </button>
      )}
    </div>
  );
}

export default Chatbot;
