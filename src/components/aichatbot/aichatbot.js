// aichatbot.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { db } from "../../firebaseConfig"; // Adjust path as needed
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import chatbotIcon from "../../images/chatbot.svg";
import micIcon from "../../images/mic2.png"; // Ensure this image exists

// -------------------------------
// Google Translate API Integration (for text translation)
// -------------------------------
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
console.log("Google API Key:", GOOGLE_API_KEY);

async function translateText(text, targetLanguage, sourceLanguage = "auto") {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;
  const response = await axios.post(
    url,
    {
      q: text,
      source: sourceLanguage,
      target: targetLanguage,
      format: "text",
    },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data.data.translations[0].translatedText;
}

function mapLanguageToCode(language) {
  switch (language) {
    case "English":
      return "en";
    case "Malay":
      return "ms";
    case "Chinese":
      return "zh-CN";
    case "Tamil":
      return "ta";
    default:
      return "en";
  }
}

// -------------------------------
// Create a single socket instance for Live Chat
// -------------------------------
const socket = io("http://localhost:5000");

/* =======================================================================
   Top-Level Chatbot Component
======================================================================= */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedChatType, setSelectedChatType] = useState(null);

  const openChat = () => {
    setIsOpen(true);
  };

  // When closing, reset selections.
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
              <LanguageSelection
                onSelectLanguage={setSelectedLanguage}
                onClose={closeChat}
              />
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
            /* Step 3: Render the chosen chat interface */
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

/* =======================================================================
   Subcomponent: LanguageSelection
======================================================================= */
const LanguageSelection = ({ onSelectLanguage, onClose }) => {
  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Select Language</h2>
        <button onClick={onClose} className="text-xl font-bold">
          &times;
        </button>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        <button onClick={() => onSelectLanguage("English")} className="bg-red-500 text-white py-2 px-4 rounded">
          English
        </button>
        <button onClick={() => onSelectLanguage("Malay")} className="bg-red-500 text-white py-2 px-4 rounded">
          Malay
        </button>
        <button onClick={() => onSelectLanguage("Chinese")} className="bg-red-500 text-white py-2 px-4 rounded">
          Chinese
        </button>
        <button onClick={() => onSelectLanguage("Tamil")} className="bg-red-500 text-white py-2 px-4 rounded">
          Tamil
        </button>
      </div>
    </div>
  );
};

/* =======================================================================
   Subcomponent: ChatTypeSelection
======================================================================= */
const ChatTypeSelection = ({ onSelectChatType, onBack, onClose, selectedLanguage }) => {
  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Choose Chat Option</h2>
        <button onClick={onClose} className="text-xl font-bold">
          &times;
        </button>
      </div>
      <p className="mt-2 text-gray-600">
        Selected language: {selectedLanguage}
      </p>
      <div className="flex flex-col space-y-4 mt-4">
        <button onClick={() => onSelectChatType("ai")} className="bg-red-500 text-white py-2 px-4 rounded">
          AI Chatbot
        </button>
        <button onClick={() => onSelectChatType("live")} className="bg-red-500 text-white py-2 px-4 rounded">
          Live Chat
        </button>
      </div>
      <button onClick={onBack} className="mt-4 text-blue-500">
        Back
      </button>
    </div>
  );
};

/* =======================================================================
   Subcomponent: AIChatInterface 
   (Uses DeepSeek for translation – with CORS proxy adjustments)
======================================================================= */
const AIChatInterface = ({ onClose, selectedLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const greetedRef = useRef(false); // Use ref to track if greeting has been sent
  const [detectedLanguage, setDetectedLanguage] = useState("en");

  // Use a proxy to bypass CORS issues (for development only)
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  function simpleDetectLanguage(original, translated) {
    if (/[\u4e00-\u9fff]/.test(original)) {
      return "zh-CN";
    }
    if (/[\u0B80-\u0BFF]/.test(original)) {
      return "ta";
    }
    if (original.trim().toLowerCase() !== translated.trim().toLowerCase()) {
      return "ms";
    }
    return "en";
  }

  // Add the greeting only once on mount using a ref
  useEffect(() => {
    if (!greetedRef.current) {
      const greetingMessage = {
        role: "bot",
        content: "Hello! How can I assist you today?",
      };
      setMessages((prev) => [...prev, greetingMessage]);
      greetedRef.current = true;
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    try {
      // First: Translate the user's input
      const translationResponse = await axios.post(
        CORS_PROXY + "http://localhost:5055/translate",
        {
          text: input,
          source: "auto",
          target: "en",
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const translatedInput = translationResponse.data.translatedText;
      console.log("Translated input:", translatedInput);
      const userLang = simpleDetectLanguage(input, translatedInput);
      console.log("Detected language (via heuristic):", userLang);
      setDetectedLanguage(userLang);

      // Second: Send the translated input to the chatbot backend
      const rasaResponse = await axios.post(
        CORS_PROXY + "http://localhost:5005/webhooks/rest/webhook",
        {
          sender: "user",
          message: translatedInput,
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

      // Map and translate (if needed) the bot replies
      const botReplies = rasaResponse.data.map((reply) => ({
        role: "bot",
        content: reply.text,
        learnMoreLink: reply.custom?.link,
      }));
      const finalBotReplies = await Promise.all(
        botReplies.map(async (reply) => {
          if (userLang && userLang !== "en") {
            console.log("Translating bot response to:", userLang);
            try {
              const responseBack = await axios.post(
                CORS_PROXY + "http://localhost:5055/translate",
                {
                  text: reply.content,
                  source: "en",
                  target: userLang,
                },
                { headers: { "Content-Type": "application/json" } }
              );
              console.log("Translated bot response:", responseBack.data.translatedText);
              return { ...reply, content: responseBack.data.translatedText };
            } catch (error) {
              console.error("Error translating bot response:", error.message);
              return reply;
            }
          } else {
            console.log("No translation needed for bot response (userLang:", userLang, ")");
            return reply;
          }
        })
      );
      setMessages((prev) => [...prev, ...finalBotReplies]);
    } catch (error) {
      console.error("Error communicating with backend:", error.message);
      const errorMessage = {
        role: "bot",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setInput(""); // Clear the input after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex items-center bg-red-500 text-white px-6 py-4 rounded-t-2xl">
        <img
          src={require("../../images/chatbot.svg").default}
          alt="Chatbot Icon"
          className="w-8 h-10 mr-3"
        />
        <div>
          <h2 className="text-3xl font-bold mt-4">Need help?</h2>
          <p className="text-ms mt-2">
            Our chatbot is here to assist with your Personal Banking enquiries.
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-white text-xl font-bold hover:text-gray-200 focus:outline-none"
        >
          <span className="block w-6 h-1 bg-white rounded-full"></span>
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
      <div className="flex items-center space-x-3 border-t p-4 font-opensans">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Type your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-[#DD101E] text-white py-3 px-6 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-blue-500 font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

/* =======================================================================
   Subcomponent: LiveChatInterface (Using Google Translate & Google Speech-to-Text)
======================================================================= */
const LiveChatInterface = ({ onClose, selectedLanguage }) => {
  const [step, setStep] = useState(2);
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [nricError, setNricError] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Determine the user’s language code from their selection.
  const userLanguage = mapLanguageToCode(selectedLanguage);

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
        const newMessagesPromises = snapshot.docs.map(async (doc) => {
          let msg = { id: doc.id, ...doc.data() };
          if (msg.sender === "user") {
            if (msg.original) {
              msg.message = msg.original;
            }
          } else {
            if (userLanguage !== "en" && !msg.messageType) {
              try {
                const translated = await translateText(msg.message, userLanguage, "en");
                msg.message = translated;
              } catch (error) {
                console.error("Error translating operator message:", error.message);
              }
            }
          }
          return msg;
        });
        Promise.all(newMessagesPromises).then(setMessages);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
      return () => unsubscribe();
    }
  }, [chatId, userLanguage]);

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

  // This function sends a text message (with translation if needed)
  const sendTextMessage = async () => {
    if (message.trim() && chatId) {
      let messageToSend = message;
      if (userLanguage !== "en") {
        try {
          messageToSend = await translateText(message, "en", userLanguage);
          console.log("Translated user message to English:", messageToSend);
        } catch (error) {
          console.error("Error translating user message:", error.message);
        }
      }
      const newMessageDoc = {
        message: messageToSend,
        sender: "user",
        timestamp: serverTimestamp(),
      };
      if (userLanguage !== "en") {
        newMessageDoc.original = message;
      }
      await addDoc(collection(db, "chats", chatId, "messages"), newMessageDoc);
      socket.emit("chatMessage", { chatId, message: messageToSend });
      setMessage("");
    } else {
      console.log("Message not sent: Missing chatId or empty message.");
    }
  };

  // -------------------------------
  // Google Speech-to-Text Integration (Hold-to-record with Google's API)
  // -------------------------------
  // We use MediaRecorder to record audio and then send it (as base64) to Google's Speech-to-Text API.
  // When the transcript is received, it is placed into the text input.
  const recordedChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    const constraints = { audio: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const options = { mimeType: "audio/webm" };
      const mediaRecorder = new MediaRecorder(stream, options);
      recordedChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        try {
          const base64Audio = await blobToBase64(blob);
          const transcript = await googleSpeechToText(base64Audio, userLanguage);
          console.log("Speech transcript:", transcript);
          setMessage(transcript);
        } catch (err) {
          console.error("Speech-to-text error:", err);
        }
      };
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const base64data = reader.result.split(",")[1];
        resolve(base64data);
      };
      reader.readAsDataURL(blob);
    });
  };

  const googleSpeechToText = async (base64Audio, userLang) => {
    // Map our language code to a Speech-to-Text language code.
    let languageCode = "en-US";
    if (userLang === "ms") languageCode = "ms-MY";
    else if (userLang === "zh-CN") languageCode = "zh-CN";
    else if (userLang === "ta") languageCode = "ta-IN";

    const url = `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`;
    const requestBody = {
      config: {
        encoding: "WEBM_OPUS", // Adjust if necessary.
        sampleRateHertz: 48000, // Adjust if needed.
        languageCode: languageCode,
      },
      audio: {
        content: base64Audio,
      },
    };

    const response = await axios.post(url, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data && response.data.results && response.data.results.length > 0) {
      return response.data.results[0].alternatives[0].transcript;
    } else {
      throw new Error("No speech recognition result");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendTextMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#DD101E] text-white p-4 rounded-t-lg">
        <div className="flex items-center">
          <img src={chatbotIcon} alt="Chatbot Icon" className="w-8 h-8 mr-2" />
          <div>
            <h2 className="text-lg font-bold">Live Chat</h2>
            <p className="text-sm">An operator will assist you shortly</p>
          </div>
        </div>
        <button className="text-white hover:text-gray-200 text-2xl font-bold" onClick={onClose}>
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
            {nricError && <p className="text-red-500 text-sm mt-1">{nricError}</p>}
            <button className="bg-[#DD101E] text-white p-2 rounded-lg w-full mt-2" onClick={submitUserInfo}>
              Start Chat
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-y-scroll h-80 mb-4 hide-scrollbar">
              {messages.map((msg, index) => (
                <div key={index} className={`flex flex-col mb-2 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`p-2 rounded-lg max-w-xs text-sm ${msg.sender === "user" ? "bg-red-500 text-white" : "bg-gray-300 text-black"}`}>
                    {msg.messageType === "voice" ? (
                      <audio controls src={msg.message} />
                    ) : (
                      <p>{msg.message}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Input Section */}
            <div className="flex items-center p-3 border-t bg-white">
              {/* Mic Button with hold-to-record using Google's Speech-to-Text */}
              <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-2"
              >
                <img src={micIcon} alt="Mic" className="w-6 h-6 object-contain" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={sendTextMessage}
                className="bg-[#DD101E] text-white py-3 px-6 rounded-r-lg hover:bg-[#C00E1A] transition-colors"
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
