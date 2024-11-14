// src/components/chatbot.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
import chatbotIcon from '../images/chatbot.svg';

const socket = io('http://localhost:5000');

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [nric, setNric] = useState('');
  const [nricError, setNricError] = useState(''); // Track NRIC validation error
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = React.useRef(null);

  useEffect(() => {
    if (chatId) {
      const messagesRef = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(newMessages);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });

      return unsubscribe;
    }
  }, [chatId]);

  const isValidNric = (nric) => {
    return /^[STFG]\d{7}[A-Z]$/.test(nric); // Validates NRIC format
  };

  const startLiveChat = () => setStep(2);

  const submitUserInfo = async () => {
    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (!isValidNric(nric)) {
      setNricError("Please enter a valid NRIC (e.g., S1234567A).");
      return;
    }
    setNricError('');
    setIsLoading(true);

    const chatRef = await addDoc(collection(db, 'chats'), {
      name,
      nric,
      status: 'active',
      createdAt: serverTimestamp(),
    });

    setChatId(chatRef.id);
    setIsLoading(false);
    setStep(5);
    socket.emit('startChat', { name, nric, chatId: chatRef.id });

    // Send an auto-generated greeting message
    await addDoc(collection(db, 'chats', chatRef.id, 'messages'), {
      message: `Hello ${name}, welcome to our live chat! An operator will be with you shortly.`,
      sender: 'system',
      timestamp: serverTimestamp(),
    });
  };

  const sendMessage = async () => {
    if (message.trim() && chatId) {
      const newMessage = {
        message,
        sender: 'user',
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);
      socket.emit('chatMessage', message);
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
            <button className="text-white hover:text-gray-200 text-2xl font-bold p-4" onClick={() => setIsChatOpen(false)}>&#x2212;</button>
          </div>
          <div className="p-4 flex flex-col h-full justify-between">
            {step === 1 && (
              <div>
                <p className="text-sm text-gray-600">Would you like to start a live chat?</p>
                <button className="bg-[#DD101E] text-white p-2 rounded-lg w-full mt-2" onClick={startLiveChat}>Yes, Start Live Chat</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-2 border rounded-lg" />
                <input type="text" placeholder="NRIC" value={nric} onChange={(e) => setNric(e.target.value)} className="w-full p-2 mb-2 border rounded-lg" />
                {nricError && <p className="text-red-500 text-sm mt-1">{nricError}</p>}
                <button className="bg-[#DD101E] text-white p-2 rounded-lg w-full mt-2" onClick={submitUserInfo}>Submit</button>
              </div>
            )}
            {isLoading && <div className="flex items-center justify-center h-full text-gray-700 text-lg font-semibold"><p>Wait a moment while we connect you to an operator...</p></div>}
            {step === 5 && !isLoading && (
              <div>
                <div className="overflow-y-scroll h-80 mb-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col mb-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-2 rounded-lg max-w-xs text-sm ${msg.sender === 'user' ? 'bg-gray-300 text-black' : 'bg-gray-200 text-black'}`}>
                        {msg.message}
                      </div>
                      <p className="text-xs text-gray-500">
                        {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="flex items-center">
                  <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 p-2 border rounded-l-lg" onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
                  <button onClick={sendMessage} className="bg-[#DD101E] text-white p-2 rounded-r-lg">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button className="flex items-center bg-[#DA291C] text-white pt-4 pb-4 pl-6 pr-6 rounded-full shadow-lg hover:bg-[#C00E1A] transition-colors" onClick={() => setIsChatOpen(true)}>
          <img src={chatbotIcon} alt="Chatbot Icon" className="w-6 h-6 mr-2" />
          <span className='font-opensans font-bold'>Need help?</span>
        </button>
      )}
    </div>
  );
}

export default Chatbot;
