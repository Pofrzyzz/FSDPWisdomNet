// chatController.js
const { startChatSession, saveMessageToDatabase } = require('../models/chatModel');

const requestChat = async (userId, name, nric, branchId, departmentId) => {
    try {
      const chatId = await startChatSession(userId, branchId, departmentId);
      const operator = await getAvailableOperator(branchId, departmentId);
  
      if (!operator) {
        throw new Error('No available operators in this department.');
      }
  
      // Connect the operator with the user
      return { chatId, operator };
    } catch (error) {
      console.error('Error requesting chat:', error);
      throw error;
    }
  };

const initiateChat = async (userId, branchId, departmentId) => {
  try {
    const chatId = await startChatSession(userId, branchId, departmentId);
    return chatId;
  } catch (error) {
    console.error('Error initiating chat session:', error);
    throw error;
  }
};

const handleMessage = async (chatId, senderType, messageText) => {
  try {
    await saveMessageToDatabase(chatId, senderType, messageText);
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

module.exports = { initiateChat, handleMessage, requestChat};
