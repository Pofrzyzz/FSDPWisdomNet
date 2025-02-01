// chatController.js

const chatSessions = {}; // In-memory storage for sessions
const messagesStore = {}; // In-memory storage for messages
const operator = {
  operatorId: 1,
  operatorName: "John Doe",
  departmentName: "Customer Support",
  branchName: "OCBC Main Branch"
};

// Function to start a new chat session
const requestChat = (userId, name, nric) => {
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