import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../images/logo_ocbc.svg';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    pin: '',
    nric: '',
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const captchaRef = useRef(null);
  const navigate = useNavigate();

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

      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/HomePage'); // Redirect to homepage
      } else {
        setErrorMessage(`Sign-up failed: ${data.message}`);

        // 🔴 Force reCAPTCHA reset after failure
        if (captchaRef.current) {
          captchaRef.current.reset(); // Reset reCAPTCHA UI
        }
        setCaptchaVerified(false); // Require user to tick it again
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('An error occurred while signing up.');

      // 🔴 Reset reCAPTCHA UI after failure
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Sign Up</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
        )}

        {/* Sign-up Form */}
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
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">NRIC</label>
            <input
              type="text"
              name="nric"
              placeholder="NRIC (e.g., S1234567A)"
              value={formData.nric}
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

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-red-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
