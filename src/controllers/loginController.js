const axios = require('axios');
const { getUser } = require('../models/loginModel');

const verifyRecaptcha = async (captchaResponse) => {
  const secretKey = "6Led0skqAAAAACCu9oJidz8cAzJjGM32m0pki1cw"; // Replace with your actual Secret Key
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;

  try {
    const { data } = await axios.post(url);
    return data.success; // Returns true if verified, false otherwise
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
};

const loginUser = async (req, res) => {
  const { username, pin, recaptchaToken } = req.body;

  // Validate input
  if (!username || !pin) {
    return res.status(400).json({ error: 'Username and pin are required' });
  }

  // Verify reCAPTCHA
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(400).json({ error: 'reCAPTCHA verification failed' });
  }

  try {
    const user = await getUser(username, pin);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or pin' });
    }

    // Login successful
    res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user.UserID, username: username }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginUser };
