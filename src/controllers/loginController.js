const { verifyRecaptcha } = require('../utils/recaptcha'); // Import reCAPTCHA validation
const { getUser } = require('../models/loginModel');

const loginUser = async (req, res) => {
  const { username, pin, recaptchaToken } = req.body;

  // Validate input
  if (!username || !pin) {
    return res.status(400).json({ error: 'Username and PIN are required' });
  }

  // Verify reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaResult.success) {
    return res.status(400).json({ error: `reCAPTCHA verification failed: ${recaptchaResult.message}` });
  }

  try {
    const user = await getUser(username, pin);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or PIN' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user.UserID, username }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginUser };
