// src/pages/operatorDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';

function OperatorDashboard() {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'chats'), where('status', '==', 'active'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({ ...doc.data(), chatId: doc.id }));
      setActiveChats(chats);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const messagesRef = query(collection(db, 'chats', selectedChat.chatId, 'messages'), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const chatMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(chatMessages);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });

      return unsubscribe;
    }
  }, [selectedChat]);

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  const sendMessage = async () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        message,
        sender: 'operator',
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'chats', selectedChat.chatId, 'messages'), newMessage);
      setMessage('');
    }
  };

  const endChat = async (chatId) => {
    await updateDoc(doc(db, 'chats', chatId), { status: 'closed' });
    setActiveChats((prevChats) => prevChats.filter((chat) => chat.chatId !== chatId));
    setSelectedChat(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-bold mb-4 text-[#DD101E]">Active Chats</h2>
        <ul className="space-y-2">
          {activeChats.map((chat) => (
            <li key={chat.chatId} className="flex justify-between items-center p-3 bg-white rounded shadow-md hover:bg-gray-50">
              <div className="cursor-pointer" onClick={() => selectChat(chat)}>
                {chat.name} - {chat.nric}
              </div>
              <button onClick={() => endChat(chat.chatId)} className="text-sm text-[#DD101E]">End Chat</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex-1 p-4 overflow-y-scroll bg-white shadow-inner rounded-t-lg">
              <h3 className="text-xl font-bold mb-4 text-[#DD101E]">Chat with {selectedChat.name}</h3>
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'operator' ? 'text-left' : 'text-right'}`}>
                  <div className={`p-2 rounded ${msg.sender === 'operator' ? 'bg-blue-100' : 'bg-gray-300'}`}>
                    {msg.message}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex p-4 border-t bg-gray-100">
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

export default OperatorDashboard;
