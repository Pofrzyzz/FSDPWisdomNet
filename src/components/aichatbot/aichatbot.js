import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/aichatbot");

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [greeted, setGreeted] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);

    // Greet user
    if (!greeted) {
      const greetingMessage = {
        role: "bot",
        content: "Hello! How can I assist you today?",
      };
      setMessages((prev) => [...prev, greetingMessage]);
      setGreeted(true);
    }
  };

  useEffect(() => {
    socket.on("chat_reply", (botReply) => {
      const botMessage = { role: "bot", content: botReply };
      setMessages((prev) => [...prev, botMessage]); // Add bot's reply to chat
    });

    return () => {
      socket.off("chat_reply");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    socket.emit("chat_message", input);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="font-opensans">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-5 right-48 flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
        >
          <img
            src={require("../../images/chatbot.svg").default}
            alt="Chatbot Icon"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm font-bold">Need help?</span>
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-8 w-[16%] h-[52%] border rounded-2xl shadow-lg bg-white flex flex-col font-opensans">
          {/* Header Section */}
          <div className="flex items-center bg-red-500 text-white px-6 py-4 rounded-t-2xl">
            <img
              src={require("../../images/chatbot.svg").default}
              alt="Chatbot Icon"
              className="w-8 h-10 mr-3 mb-12"
            />
            <div>
              <h2 className="text-3xl font-bold mt-4">Need help?</h2>
              <p className="text-ms mt-2">
                Our chatbot is here to assist with your Personal Banking
                enquiries.
              </p>
            </div>
            <button
              onClick={toggleChat}
              className="ml-auto text-white text-xl font-bold hover:text-gray-200 focus:outline-none mb-20"
            >
             <span className="block w-6 h-1 bg-white rounded-full"></span>
            </button>
          </div>

          {/* Messages Section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg text-base ${
                    msg.role === "user"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex items-center space-x-3 border-t p-4 font-opensans">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-blue-500 font-bold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
