const axios = require('axios');
const chatSessions = {}; // In-memory storage for sessions
const messagesStore = {}; // In-memory storage for messages
const operator = {
  operatorId: 1,
  operatorName: "John Doe",
  departmentName: "Customer Support",
  branchName: "OCBC Main Branch"
};

const verifyRecaptcha = async (captchaResponse) => {
  const secretKey = "6Led0skqAAAAACCu9oJidz8cAzJjGM32m0pki1cw";
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;

  try {
    const { data } = await axios.post(url);
    return data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
};

// Function to start a new chat session
const requestChat = async (userId, name, nric, recaptchaToken) => {
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    throw new Error('reCAPTCHA verification failed');
  }
  
  const chatId = `chat_${Date.now()}`; // Unique chat ID using timestamp
  chatSessions[chatId] = { userId, name, nric, chatId, operator };
  messagesStore[chatId] = [];

  return { chatId, operator };
};

// Function to save messages to in-memory storage
const handleMessage = (chatId, senderType, messageText) => {
  const message = {
    senderType,
    messageText,
    timestamp: new Date()
  };
  messagesStore[chatId].push(message);
  return message;
};

module.exports = { requestChat, handleMessage };
