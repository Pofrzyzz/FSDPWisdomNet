import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo_ocbc.svg';

const LoginPage = () => {
  const [formData, setFormData] = useState({ accessCode: '', pin: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this with actual login logic
    const isLoginSuccessful = formData.username === 'user' && formData.pin === '123456';

    if (isLoginSuccessful) {
      navigate('/HomePage');
    } else {
      alert('Invalid access code or PIN');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
        <img src={logo} alt="OCBC Logo" className="h-12"/>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Online Banking</h2>

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

          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            Login
          </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-600 mt-4">
            Don't have Online Banking? <a href="SignUpPage" className="text-red-600 hover:underline">Sign up now.</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
