// socket.js
const { requestChat, handleMessage } = require('./controllers/chatController');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Start a new chat session
    socket.on('startChat', ({ name, nric }) => {
      const { chatId, operator } = requestChat(socket.id, name, nric);

      socket.join(chatId); // User joins their chat room

      const greetingMessage = `Hello ${name}, I am ${operator.operatorName} from ${operator.departmentName}. How can I assist you today?`;
      handleMessage(chatId, 'operator', greetingMessage); // Add greeting to message history

      socket.emit('chatAssigned', { greeting: greetingMessage });
    });

    // Receive and broadcast chat messages
    socket.on('chatMessage', (msg) => {
      const chatId = Object.keys(socket.rooms).find(id => id.startsWith('chat_'));
      if (chatId) {
        const message = handleMessage(chatId, 'user', msg);
        io.to(chatId).emit('chatMessage', message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSocket;
