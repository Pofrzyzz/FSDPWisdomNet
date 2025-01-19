const { getUser } = require('../models/loginModel');

const loginUser = async (req, res) => {
  const { username, pin } = req.body;

  // Validate input
  if (!username || !pin) {
    return res.status(400).json({ error: 'Username and pin are required' });
  }

  try {
    const user = await getUser(username, pin);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or pin' });
    }

    // Login successful
    res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user.id, username: user.username} 
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginUser };
