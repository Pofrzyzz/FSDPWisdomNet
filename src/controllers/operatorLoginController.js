const { verifyRecaptcha } = require('../utils/recaptcha'); // Import reCAPTCHA validation
const { getOperator } = require('../models/operatorModel'); // Import updated model

const loginOperator = async (req, res) => {
  const { username, pin, recaptchaToken } = req.body;

  if (!username || !pin) {
    return res.status(400).json({ error: 'Username and PIN are required' });
  }

  // Verify reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaResult.success) {
    return res.status(400).json({ error: `reCAPTCHA verification failed: ${recaptchaResult.message}` });
  }

  try {
    const operator = await getOperator(username, pin);
    if (!operator) {
      return res.status(401).json({ error: 'Invalid operator credentials' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      operator: { id: operator.OperatorID, username, department: operator.AssignedDepartmentID }
    });
  } catch (error) {
    console.error("Error logging in operator:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginOperator };
