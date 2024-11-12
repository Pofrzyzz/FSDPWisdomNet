// chatModel.js
const { sql, poolPromise } = require('../../dbConfig');

const startChatSession = async (userId, branchId, departmentId, socketId) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('UserID', sql.Int, userId);
    request.input('BranchID', sql.Int, branchId);
    request.input('DepartmentID', sql.Int, departmentId);
    request.input('SocketID', sql.NVarChar, socketId);

    const result = await request.query(`
      INSERT INTO Chats (UserID, BranchID, DepartmentID, OperatorID, SocketID, StartedAt)
      OUTPUT INSERTED.ChatID
      VALUES (1, 1, 1, 1, @SocketID, GETDATE())
    `);

    return result.recordset[0].ChatID;
  } catch (error) {
    console.error('Error starting chat session:', error);
    throw error;
  }
};

const saveMessageToDatabase = async (chatId, senderType, messageText) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('ChatID', sql.Int, chatId);
    request.input('SenderType', sql.NVarChar, senderType);
    request.input('MessageText', sql.NVarChar, messageText);

    await request.query(`
      INSERT INTO Messages (ChatID, SenderType, MessageText, SentAt)
      VALUES (@ChatID, @SenderType, @MessageText, GETDATE())
    `);
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

module.exports = { startChatSession, saveMessageToDatabase };
