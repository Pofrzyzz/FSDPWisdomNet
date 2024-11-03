// src/components/Chatbot.js
import React, { useState } from 'react';
import chatbotIcon from '../images/chatbot.svg';

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isChatOpen ? (
        <div className="bg-white shadow-lg rounded-lg" style={{ width: '375.38px', height: '578px' }}>
          <div className="flex justify-between items-center bg-[#DD101E] text-white rounded-t-lg" style={{ height: '106px', width: '375.33px' }}>
            <div className="flex items-center p-4">
              <img src={chatbotIcon} alt="Chatbot Icon" className="w-8 h-8 mr-2" />
              <div>
                <h2 className="text-lg font-bold">Need help?</h2>
                <p className="text-sm">Our chatbot is here to assist with your Personal Banking enquiries.</p>
              </div>
            </div>
            <button
              className="text-white hover:text-gray-200 text-2xl font-bold p-4"
              onClick={() => setIsChatOpen(false)}
            >
              &#x2212;
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600">Chat interface content goes here...</p>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center bg-[#DD101E] text-white p-3 rounded-full shadow-lg hover:bg-[#C00E1A] transition-colors"
          onClick={() => setIsChatOpen(true)}
        >
          <img src={chatbotIcon} alt="Chatbot Icon" className="w-8 h-8 mr-2" />
          <span>Need Help</span>
        </button>
      )}
    </div>
  );
}

export default Chatbot;
