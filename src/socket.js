// socket.js
const { requestChat, handleMessage } = require('./controllers/chatController');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Start a new chat session
    socket.on('startChat', ({ name, nric, chatId }) => {
      console.log("🆕 New chat started:", { name, nric, chatId }); // Debugging

      const { operator } = requestChat(socket.id, name, nric);
      socket.join(chatId); // User joins their chat room

      const greetingMessage = `Hello ${name}, I am ${operator.operatorName} from ${operator.departmentName}. How can I assist you today?`;
      handleMessage(chatId, 'operator', greetingMessage); // Add greeting to chat history

      console.log("📩 Sending chatAssigned event with greeting...");
      socket.emit('chatAssigned', { greeting: greetingMessage });
    });

    // Receive and broadcast chat messages
    socket.on('chatMessage', ({ chatId, message }) => {
      console.log("📩 Received chatMessage event:", { chatId, message }); // Debugging
      if (chatId) {
        const newMessage = handleMessage(chatId, 'user', message);
        io.to(chatId).emit('chatMessage', newMessage);
      } else {
        console.log("⚠️ chatMessage event failed: No chatId provided.");
      }
    });

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSocket;
