const { verifyRecaptcha } = require('../utils/recaptcha'); // Import reCAPTCHA validation
const { signupUser } = require('../models/signupModel');

const signUpUser = async (req, res) => {
    const { username, nric, email, pin, recaptchaToken } = req.body;

    // Validate request body
    if (!username || !nric || !email || !pin) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
        return res.status(400).json({ success: false, message: `reCAPTCHA verification failed: ${recaptchaResult.message}` });
    }

    try {
        const result = await signupUser(username, nric, email, pin);
        res.status(201).json({ success: true, message: result.message });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { signUpUser };
