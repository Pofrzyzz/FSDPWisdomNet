import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../images/logo_ocbc.svg';

const OperatorLoginPage = () => {
  const [formData, setFormData] = useState({ username: '', pin: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  // Clear session storage on component mount
  useEffect(() => {
    sessionStorage.clear(); // Remove any existing session data
    console.log('Session storage cleared.');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle reCAPTCHA verification
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Ensure the user has verified reCAPTCHA before submitting
    if (!captchaVerified) {
      setErrorMessage('Please verify the CAPTCHA.');
      return;
    }

    try {
      const recaptchaToken = captchaRef.current.getValue(); // Get the reCAPTCHA token

      const response = await axios.post('http://localhost:5000/api/operators/login', {
        username: formData.username,
        pin: formData.pin,
        recaptchaToken,
      });

      console.log('Operator login response:', response.data);

      const { id, username, department } = response.data.operator;
      if (id) {
        sessionStorage.setItem('operatorId', id); // 🔄 Store in sessionStorage
        sessionStorage.setItem('operatorName', username);
        sessionStorage.setItem('department', department);
        console.log("Operator ID stored in sessionStorage:", id);
        
        navigate('/OperatorDashboard'); // ✅ Redirect to Operator Dashboard
      } else {
        console.error('Operator ID is undefined');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Backend error message
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }

      // 🔴 Reset reCAPTCHA UI and force the user to verify again after failure
      if (captchaRef.current) {
        captchaRef.current.reset(); // Reset reCAPTCHA
      }
      setCaptchaVerified(false); // Require user to tick it again
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="OCBC Logo" className="h-12" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Operator Login</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
        )}

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">PIN</label>
            <input
              type="password"
              name="pin"
              placeholder="PIN"
              value={formData.pin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* reCAPTCHA */}
          <ReCAPTCHA 
            sitekey="6Led0skqAAAAAGYGip8-6I8QlJwaWfBw-P3Lz3V6" 
            onChange={handleCaptchaChange} 
            ref={captchaRef} 
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default OperatorLoginPage;
