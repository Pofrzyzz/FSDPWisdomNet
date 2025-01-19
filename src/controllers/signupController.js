const { signupUser } = require('../models/signupModel');

const signUpUser = async (req, res) => {
    const { username, nric, email, pin } = req.body;

    // Validate request body
    if (!username || !nric || !email || !pin) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const result = await signupUser(username, nric, email, pin);
        res.status(201).json({ success: true, message: result.message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { signUpUser };
