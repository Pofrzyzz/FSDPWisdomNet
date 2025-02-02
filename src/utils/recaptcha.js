const axios = require('axios');

const verifyRecaptcha = async (captchaResponse) => {
  const secretKey = "6Led0skqAAAAACCu9oJidz8cAzJjGM32m0pki1cw"; // Store key in .env file
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;

  try {
    const { data } = await axios.post(url);

    if (!data.success) {
      console.error("reCAPTCHA failed:", data);
      return { success: false, message: data['error-codes']?.join(', ') || 'Unknown error' };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return { success: false, message: 'Internal verification error' };
  }
};

module.exports = { verifyRecaptcha };
