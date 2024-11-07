import React from 'react';
import NavBar from '../components/navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import QueueIcon from '../images/QueueIcon.svg';
import InfoIcon from '../images/InfoIcon.svg';
import Chatbot from '../components/chatbot';

function InQueue() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobileNumber, selectedProblem } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Include the NavBar */}
      <NavBar />

      {/* Queue Status Card */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl mt-56 p-8 flex flex-col items-center relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-1 left-4 text-red-500 text-4xl font-bold"
        >
          &larr;
        </button>

        {/* Display Mobile Number and Selected Problem */}
        <div className="absolute top-4 right-4 text-gray-700 text-sm">
          <p>Mobile Number: <span className="font-semibold">{mobileNumber}</span></p>
          <p>Selected Problem: <span className="font-semibold">{selectedProblem}</span></p>
        </div>

        {/* Queue Icon */}
        <div className="mt-4 mb-3">
          <img src={QueueIcon} alt="Queue Icon" className="w-16 h-22" />
        </div>

        {/* Queue Status Heading */}
        <h1 className="text-2xl font-semibold text-center mb-2 relative">
          You Are Now In The Queue
          <div className="inline-block relative ml-2 group">
            <img
              src={InfoIcon}
              alt="Information"
              className="w-5 h-5 cursor-pointer filter transform translate-y-0.5"
              style={{ filter: 'brightness(0) invert(60%)' }}
            />
            {/* Info Bubble */}
            <div className="absolute left-6 transform -translate-x-full top-full mt-2.5 w-64 p-3 bg-white text-sm text-gray-700 border rounded-lg shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50">
              <div className="absolute -top-2 right-3 transform translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-300"></div>
              Due to high call volumes, instead of staying on hold, you’ll be notified when it’s your turn, ensuring more efficient service and a smoother experience for all customers.
            </div>
          </div>
        </h1>

        {/* Queue Position */}
        <h2 className="text-6xl font-bold text-center text-black mb-2">26</h2>
        <p className="text-gray-500 text-sm text-center mb-6">PEOPLE AHEAD OF YOU</p>

        {/* Queue Progress Bar */}
        <div className="w-full max-w-lg relative">
          <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
            {/* Red progress part */}
            <div className="absolute top-0 left-0 h-full bg-red-500 rounded-full" style={{ width: '50%' }}></div>
          </div>

          {/* White circle positioned fully above the red and gray bars */}
          <div
            className="absolute w-6 h-6 bg-white border-2 border-red-500 rounded-full shadow-lg"
            style={{ top: '-6px', left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 3px 2px rgba(255, 0, 0, 0.5)' }}
          ></div>
        </div>

        {/* Thank You Message */}
        <p className="text-gray-700 text-sm text-center mt-6">
          Thank you for your patience. We will call you as soon as it is your turn.
        </p>
      </div>

      {/* Chatbot Button and Interface */}
      <Chatbot />
      
    </div>
  );
}

export default InQueue;
















