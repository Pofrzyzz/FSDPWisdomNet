import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../images/logo_ocbc.svg';
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', pin: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  // Clear localStorage on component mount (Only for debugging; remove if needed)
  useEffect(() => {
    console.log('localStorage cleared on page load.');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!captchaVerified) {
      setErrorMessage('Please verify the CAPTCHA.');
      return;
    }

    try {
      const recaptchaToken = captchaRef.current.getValue();
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username: formData.username,
        pin: formData.pin,
        recaptchaToken,
      });

      console.log('Login response:', response.data);

      const { id, username, nric } = response.data.user;
      if (id) {
        // ✅ Store user details in localStorage so they persist after browser close
        localStorage.setItem('userId', id);
        localStorage.setItem('username', username);
        localStorage.setItem('nric', nric);
        console.log("User data stored in localStorage:", { id, username, nric });

        navigate('/HomePage'); // Redirect to homepage  
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }

      // 🔄 Reset reCAPTCHA on failure
      if (captchaRef.current) {
        captchaRef.current.reset();
      }
      setCaptchaVerified(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Back Button */}
            <div 
                onClick={() => navigate(-1)} // Go back to the previous page
                className="absolute top-20 left-16 text-lg font-semibold cursor-pointer z-10 flex items-center hover:underline hover:decoration-white"
            >
                <img src={require("../images/arrow-left-red.svg").default} alt="Back" className="w-5 h-5 mr-2" />
                <span className="text-black">Back</span>
            </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="OCBC Logo" className="h-12" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Online Banking</h2>

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

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have Online Banking?{' '}
            <a href="SignUpPage" className="text-red-600 hover:underline">
              Sign up now.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
