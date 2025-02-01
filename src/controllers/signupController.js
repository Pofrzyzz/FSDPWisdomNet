const axios = require('axios');
const { signupUser } = require('../models/signupModel');

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

const signUpUser = async (req, res) => {
    const { username, nric, email, pin, recaptchaToken } = req.body;

    // Validate request body
    if (!username || !nric || !email || !pin) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }

    try {
        const result = await signupUser(username, nric, email, pin);
        res.status(201).json({ success: true, message: result.message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { signUpUser };
