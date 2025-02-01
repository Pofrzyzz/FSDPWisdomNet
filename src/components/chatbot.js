import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
import ReCAPTCHA from 'react-google-recaptcha';
import chatbotIcon from '../images/chatbot.svg';

const socket = io('http://localhost:5000');

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [nric, setNric] = useState('');
  const [nricError, setNricError] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);
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
    return /^[STFG]\d{7}[A-Z]$/.test(nric);
  };

  const startLiveChat = () => setStep(2);

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const submitUserInfo = async () => {
    if (!captchaVerified) {
      alert('Please verify the CAPTCHA before starting the chat.');
      return;
    }
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
                <ReCAPTCHA sitekey="6Led0skqAAAAAGYGip8-6I8QlJwaWfBw-P3Lz3V6" onChange={handleCaptchaChange} ref={captchaRef} />
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
