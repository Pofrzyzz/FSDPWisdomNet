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
  if (!messagesStore[chatId]) {
    console.warn(`messagesStore for chatId ${chatId} is undefined. Initializing a new array.`);
    messagesStore[chatId] = []; // This prevents the crash.
    // Alternatively, you might choose to return an error instead:
    // return { error: "Chat session not found." };
  }
  const message = {
    senderType,
    messageText,
    timestamp: new Date()
  };
  messagesStore[chatId].push(message);
  return message;
};

module.exports = { requestChat, handleMessage };