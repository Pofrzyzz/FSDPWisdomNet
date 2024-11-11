// src/pages/ContactUs.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/navbar';
import ContactBanner from '../images/ContactBanner.svg';
import Footer from '../components/footer';
import Chatbot from '../components/chatbot';

function ContactUs() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleJoinQueue = () => {
    if (mobileNumber.trim().length !== 8 || isNaN(mobileNumber)) {
      setErrorMessage('Please enter a valid 8-digit mobile number.');
    } else {
      setErrorMessage('');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/contact', {
        mobileNumber,
        selectedProblem,
      });

      if (response.status === 200) {
        const queueNumber = response.data.queueNumber;
        console.log("Queue Number received from backend:", queueNumber);

        setShowModal(false);
        navigate('/InQueuePage', {
          state: {
            mobileNumber,
            selectedProblem,
            queueNumber, // Pass queue number to InQueue.js
          },
        });
      }
    } catch (error) {
      console.error('Error saving contact info:', error);
      setErrorMessage('Failed to join the queue. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      <NavBar />

      {/* Back button */}
      <Link to="/HomePage">
        <div className="absolute top-40 left-16 text-lg font-semibold cursor-pointer z-10 flex items-center hover:underline hover:decoration-white">
          <img src={require('../images/arrow-left-red.svg').default} alt="Back" className="w-5 h-5 mr-2" />
          <span className="text-white">Back to Help & Support</span>
        </div>
      </Link>

      <section className="flex flex-col min-h-screen">
        <div className="relative w-full h-80 md:h-96 overflow-hidden">
          <img
            src={ContactBanner}
            alt="Contact Us Banner"
            className="w-full h-full object-cover object-[center_10%]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-60">
            <h1 className="text-3xl md:text-5xl font-bold mt-32 md:mt-40">Contact Us</h1>
            <p className="text-center mt-3 max-w-2xl text-base md:text-lg leading-tight px-4">
              Take a queue number if you wish to speak to a customer<br />
              service executive, and we will contact you once it's your turn.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-center p-12 gap-20">
          <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-2/5">
            <h2 className="block text-gray-700 mb-6 text-left text-xl font-bold">Call Centre Traffic Status</h2>
            <div className="flex justify-between text-left">
              <div>
                <p className="text-gray-500 mb-1">Total Calls Today</p>
                <h3 className="text-4xl font-semibold">1,437</h3>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Currently In Queue</p>
                <h3 className="text-4xl font-semibold">26</h3>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Waiting Time</p>
                <h3 className="text-4xl font-semibold">17:00</h3>
              </div>
            </div>
          </div>

          {/* Mobile Number Section with Error Message Below the Border */}
          <div className="w-full md:w-2/5">
            <div className="bg-white shadow-md rounded-lg p-6">
              <label htmlFor="mobileNumber" className="block text-gray-700 mb-2 text-left text-xl font-bold">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <button
                onClick={handleJoinQueue}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Join The Queue
              </button>
            </div>

            {/* Error Message Displayed Below the Entire Mobile Number Border */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2 ml-6">{errorMessage}</p>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full md:w-3/4 lg:w-2/3 relative">
              <button
                className="absolute top-0.5 right-2 text-gray-500 hover:text-gray-700 text-4xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-6">How can we assist you today?</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Problem Selection Buttons */}
                {['Card Services', 'Payment & Transfers', 'Digital Banking Assistance', 'Loan & Financing', 'Fraud & Security', 'Investment & Insurance'].map((problem) => (
                  <button
                    key={problem}
                    className={`bg-gray-200 w-56 h-24 rounded flex items-center justify-center text-xl text-center ${selectedProblem === problem ? 'border-4 border-red-500' : ''}`}
                    onClick={() => handleSelectProblem(problem)}
                  >
                    {problem}
                  </button>
                ))}
              </div>
              <button
                className="absolute bottom-2.5 right-8 bg-red-500 text-white py-1 px-6 rounded-full text-sm font-bold hover:bg-red-600 transition duration-200"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </section>
      <section><Footer /></section>
      {/* Chatbot Button and Interface */}
      <Chatbot />
    </div>
  );
}

export default ContactUs;

















