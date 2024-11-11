// chatModel.js
const { poolPromise } = require('../../dbConfig');

const startChatSession = async (userId, branchId, departmentId) => {
  const pool = await poolPromise;
  const request = pool.request();
  request.input('UserID', userId);
  request.input('BranchID', branchId);
  request.input('DepartmentID', departmentId);

  const result = await request.query(`
    INSERT INTO Chats (UserID, BranchID, DepartmentID, StartedAt)
    OUTPUT INSERTED.ChatID
    VALUES (@UserID, @BranchID, @DepartmentID, GETDATE())
  `);
  
  return result.recordset[0].ChatID;
};

const saveMessageToDatabase = async (chatId, senderType, messageText) => {
  const pool = await poolPromise;
  const request = pool.request();
  request.input('ChatID', chatId);
  request.input('SenderType', senderType);
  request.input('MessageText', messageText);
  
  return request.query(`
    INSERT INTO Messages (ChatID, SenderType, MessageText, SentAt)
    VALUES (@ChatID, @SenderType, @MessageText, GETDATE())
  `);
};

module.exports = { startChatSession, saveMessageToDatabase };
