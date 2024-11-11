// src/socket.js
const { requestChat } = require('./controllers/chatController');
const { getOperatorDetails } = require('./models/operatorModel');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('startChat', async ({ name, nric, department }) => {
      try {
        const { chatId, operator } = await requestChat(socket.id, name, nric, department);

        if (!operator) {
          socket.emit('noOperatorAvailable', { message: 'No operator is available at the moment. Please try again later.' });
          return;
        }

        socket.chatId = chatId;
        socket.operatorId = operator.OperatorID;

        // Join the operator's room
        socket.join(`operator_${operator.OperatorID}`);

        // Send auto-generated welcome message
        const greetingMessage = `Hello, I am ${operator.OperatorName} from the ${operator.DepartmentName} department at the ${operator.BranchName} branch. How can I assist you today?`;
        socket.emit('chatAssigned', {
          operatorName: operator.OperatorName,
          branch: operator.BranchName,
          department: operator.DepartmentName,
          greeting: greetingMessage,
        });

        // Notify the operator about the new chat request
        io.to(`operator_${operator.OperatorID}`).emit('newChatRequest', {
          chatId,
          userId: socket.id,
          name,
          nric,
          message: greetingMessage, // Send the greeting message for the operator to see
        });

        console.log(`Assigned operator ${operator.OperatorID} to chat ID ${chatId}`);
      } catch (error) {
        console.error('Error starting chat:', error);
        socket.emit('error', { message: 'An error occurred while starting the chat. Please try again.' });
      }
    });

    socket.on('chatMessage', (msg) => {
      if (socket.operatorId) {
        io.to(`operator_${socket.operatorId}`).emit('receiveMessage', {
          sender: 'user',
          message: msg,
          timestamp: new Date(),
        });
      }
    });

    socket.on('operatorMessage', (msg) => {
      if (socket.chatId) {
        io.to(socket.chatId).emit('chatMessage', {
          sender: 'operator',
          message: msg,
          timestamp: new Date(),
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSocket;
