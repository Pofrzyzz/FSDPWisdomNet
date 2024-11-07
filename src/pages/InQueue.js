// src/pages/InQueue.js
import React from 'react';
import NavBar from '../components/navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import QueueIcon from '../images/QueueIcon.svg';
import Chatbot from '../components/chatbot';

function InQueue() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve passed state (mobile number, problem, and queue number)
  const { mobileNumber, selectedProblem, queueNumber } = location.state || {};

  console.log("Received data in InQueue.js:", { mobileNumber, selectedProblem, queueNumber });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <NavBar />

      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl mt-56 p-8 flex flex-col items-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-1 left-4 text-red-500 text-4xl font-bold"
        >
          &larr;
        </button>

        {/* Display Mobile Number, Selected Problem, and Queue Number */}
        <div className="absolute top-4 right-4 text-gray-700 text-sm">
          <p>Mobile Number: <span className="font-semibold">{mobileNumber}</span></p>
          <p>Selected Problem: <span className="font-semibold">{selectedProblem}</span></p>
        </div>

        <div className="mt-4 mb-3">
          <img src={QueueIcon} alt="Queue Icon" className="w-16 h-22" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-2 relative">
          You Are Now In The Queue
        </h1>
        
        {/* Display Actual Queue Number */}
        <h2 className="text-6xl font-bold text-center text-black mb-2">
          {queueNumber !== undefined ? queueNumber : "Queue number not available"}
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">PEOPLE AHEAD OF YOU</p>

        <p className="text-gray-700 text-sm text-center mt-6">
          Thank you for your patience. We will call you as soon as it is your turn.
        </p>
      </div>

      <Chatbot />
    </div>
  );
}

export default InQueue;



















