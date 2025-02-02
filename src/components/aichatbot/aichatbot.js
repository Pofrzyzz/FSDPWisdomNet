// Chatbot.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { db } from "../../firebaseConfig"; // Adjust the path as needed
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import chatbotIcon from "../../images/chatbot.svg"; // Adjust the path as needed

// Create a single socket instance for live chat
const socket = io("http://localhost:5000");

const Chatbot = () => {
  // Overall chat popup and selection states
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedChatType, setSelectedChatType] = useState(null);

  const openChat = () => {
    setIsOpen(true);
  };

  // When closing, reset selections
  const closeChat = () => {
    setIsOpen(false);
    setSelectedLanguage(null);
    setSelectedChatType(null);
  };

  return (
    <div className="font-opensans">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-4 right-4 z-50 bg-[#DA291C] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#C00E1A] flex items-center gap-2 font-semibold"
        >
          <img src={chatbotIcon} alt="Chatbot Icon" className="w-5 h-5" />
          <span className="font-semibold text-base">Need Help?</span>
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white shadow-lg rounded-lg w-96 h-[550px] flex flex-col">
            {/* Step 1: Language Selection */}
            {!selectedLanguage ? (
              <LanguageSelection onSelectLanguage={setSelectedLanguage} onClose={closeChat} />
            ) : 
            /* Step 2: Chat Type Selection */
            !selectedChatType ? (
              <ChatTypeSelection
                onSelectChatType={setSelectedChatType}
                onBack={() => setSelectedLanguage(null)}
                onClose={closeChat}
                selectedLanguage={selectedLanguage}
              />
            ) : 
            /* Step 3: Chat Interface (AI Chatbot or Live Chat) */
            selectedChatType === "ai" ? (
              <AIChatInterface onClose={closeChat} selectedLanguage={selectedLanguage} />
            ) : (
              <LiveChatInterface onClose={closeChat} selectedLanguage={selectedLanguage} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ===================== Subcomponent: LanguageSelection ===================== */
const LanguageSelection = ({ onSelectLanguage, onClose }) => {
  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Select Language</h2>
        <button onClick={onClose} className="text-xl font-bold">&times;</button>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        <button
          onClick={() => onSelectLanguage("English")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          English
        </button>
        <button
          onClick={() => onSelectLanguage("Malay")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Malay
        </button>
        <button
          onClick={() => onSelectLanguage("Chinese")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Chinese
        </button>
        <button
          onClick={() => onSelectLanguage("Tamil")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Tamil
        </button>
      </div>
    </div>
  );
};

/* ===================== Subcomponent: ChatTypeSelection ===================== */
const ChatTypeSelection = ({
  onSelectChatType,
  onBack,
  onClose,
  selectedLanguage,
}) => {
  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Choose Chat Option</h2>
        <button onClick={onClose} className="text-xl font-bold">&times;</button>
      </div>
      <p className="mt-2 text-gray-600">
        Selected language: {selectedLanguage}
      </p>
      <div className="flex flex-col space-y-4 mt-4">
        <button
          onClick={() => onSelectChatType("ai")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          AI Chatbot
        </button>
        <button
          onClick={() => onSelectChatType("live")}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Live Chat
        </button>
      </div>
      <button onClick={onBack} className="mt-4 text-blue-500">
        Back
      </button>
    </div>
  );
};

/* ===================== Subcomponent: AIChatInterface ===================== */
const AIChatInterface = ({ onClose, selectedLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    if (!greeted) {
      const greetingMessage = {
        role: "bot",
        content: "Hello! How can I assist you today?",
      };
      setMessages((prev) => [...prev, greetingMessage]);
      setGreeted(true);
    }
  }, [greeted]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          sender: "user",
          message: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          transformRequest: [
            (data, headers) => {
              delete headers["X-Requested-With"];
              return JSON.stringify(data);
            },
          ],
        }
      );

      const botReplies = response.data.map((reply) => ({
        role: "bot",
        content: reply.text,
        learnMoreLink: reply.custom?.link,
      }));

      setMessages((prev) => [...prev, ...botReplies]);
    } catch (error) {
      console.error("Error communicating with Rasa:", error.message);
      const errorMessage = {
        role: "bot",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center bg-red-500 text-white px-6 py-4 rounded-t-lg">
        <img
          src={chatbotIcon}
          alt="Chatbot Icon"
          className="w-8 h-8 mr-2"
        />
        <div>
          <h2 className="text-3xl font-bold">AI Chatbot</h2>
          <p className="text-sm mt-1">Our chatbot is here to assist you.</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-white text-xl font-bold"
        >
          &times;
        </button>
      </div>
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg text-base ${
                msg.role === "user"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.content}</p>
              {msg.learnMoreLink && (
                <a
                  href={msg.learnMoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                >
                  Learn More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Input Section */}
      <div className="flex items-center space-x-3 border-t p-4">
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
  );
};

/* ===================== Subcomponent: LiveChatInterface ===================== */
const LiveChatInterface = ({ onClose, selectedLanguage }) => {
  const [step, setStep] = useState(2);
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [nricError, setNricError] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setStep(2);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (chatId) {
      const messagesRef = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("timestamp", "asc")
      );
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
      return () => unsubscribe();
    }
  }, [chatId]);

  const isValidNric = (nric) => /^[STFG]\d{7}[A-Z]$/.test(nric);

  const submitUserInfo = async () => {
    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (!isValidNric(nric)) {
      setNricError("Please enter a valid NRIC (e.g., S1234567A).");
      return;
    }
    setNricError("");
    setIsLoading(true);
    const chatRef = await addDoc(collection(db, "chats"), {
      name,
      nric,
      status: "active",
      createdAt: serverTimestamp(),
    });
    setChatId(chatRef.id);
    console.log("Chat session started, chatId:", chatRef.id);
    setIsLoading(false);
    setStep(5);
    socket.emit("startChat", { name, nric, chatId: chatRef.id });
    socket.on("chatAssigned", (data) => {
      console.log("Received chatAssigned event:", data);
    });
    await addDoc(collection(db, "chats", chatRef.id, "messages"), {
      message: `Hello ${name}, welcome to our live chat! An operator will be with you shortly.`,
      sender: "system",
      timestamp: serverTimestamp(),
    });
  };

  const sendMessage = async () => {
    if (message.trim() && chatId) {
      console.log("Sending message:", message, "Chat ID:", chatId);
      const newMessage = {
        message,
        sender: "user",
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "chats", chatId, "messages"), newMessage);
      socket.emit("chatMessage", { chatId, message });
      setMessage("");
    } else {
      console.log("Message not sent: Missing chatId or empty message.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#DD101E] text-white p-4 rounded-t-lg">
        <div className="flex items-center">
          <img
            src={chatbotIcon}
            alt="Chatbot Icon"
            className="w-8 h-8 mr-2"
          />
          <div>
            <h2 className="text-lg font-bold">Live Chat</h2>
            <p className="text-sm">An operator will assist you shortly</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
      {/* Chat Body */}
      <div className="p-4 flex-1 overflow-y-auto bg-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center text-gray-700 text-lg font-semibold">
            <p>Loading...</p>
          </div>
        ) : step === 2 ? (
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
            {nricError && (
              <p className="text-red-500 text-sm mt-1">{nricError}</p>
            )}
            <button
              className="bg-[#DD101E] text-white p-2 rounded-lg w-full mt-2"
              onClick={submitUserInfo}
            >
              Start Chat
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-y-scroll h-80 mb-4 hide-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col mb-2 ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs text-sm ${
                      msg.sender === "user"
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center p-3 border-t bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-[#DD101E] text-white p-3 rounded-r-lg hover:bg-[#C00E1A] transition-colors"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
