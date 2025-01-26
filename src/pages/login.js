import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API calls
import logo from '../images/logo_ocbc.svg';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', pin: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Clear localStorage on component mount
  useEffect(() => {
    localStorage.clear(); // Clear localStorage when the component is loaded
    console.log('localStorage cleared.');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      // Send login data to the backend
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username: formData.username,
        pin: formData.pin,
      });

      console.log('Login response:', response.data);

      // Save userId to localStorage and navigate to the homepage
      const { id, username } = response.data.user;
      if (id) {
        localStorage.setItem('userId', id); 
        console.log("User ID:", id);
        navigate('/HomePage'); // Redirect to homepage  
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Backend error
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
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
