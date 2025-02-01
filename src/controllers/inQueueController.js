const { reduceQueueNumber } = require('../models/InQueueModel');

const decreaseQueueNumber = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    console.log('No mobile number provided');
    return res.status(400).json({ error: 'Mobile number is required.' });
  }

  try {
    console.log('Reducing queue number for mobile number:', mobileNumber);
    const result = await reduceQueueNumber(mobileNumber);
    console.log('Queue number reduced:', result);

    if (result.success) {
      return res.status(200).json({ message: 'Queue number decreased. You have left the queue.' });
    } else {
      return res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error in decreaseQueueNumber:', error.message);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

module.exports = { decreaseQueueNumber };






