import React, { useState } from 'react';
import NavBar from '../components/navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import QueueIcon from '../images/QueueIcon.svg';
import InfoIcon from '../images/InfoIcon.svg';
import Chatbot from '../components/chatbot';

function InQueue() {
  const navigate = useNavigate();
  const location = useLocation();

  const { mobileNumber, selectedProblem, queueNumber: initialQueueNumber } = location.state || {};
  const [queueNumber, setQueueNumber] = useState(initialQueueNumber || 20); // Default queue is 20 if undefined
  const [showModal, setShowModal] = useState(false);

  // Reversed progress bar: Starts empty at 20, fills up as it nears 0
  const progressPercentage = ((20 - queueNumber) / 20) * 100;

  const handleWithdrawClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleWithdrawCompletely = () => {
    console.log('Leaving queue. Queue number before:', queueNumber);

    // Reduce queue number locally
    const updatedQueueNumber = Math.max(queueNumber - 1, 0);
    setQueueNumber(updatedQueueNumber);

    console.log('Queue number after leaving:', updatedQueueNumber);

    // Close modal and navigate back to homepage
    setShowModal(false);
    navigate('/', { state: { message: 'You have left the queue. Your queue number is saved for next time.' } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <NavBar />

      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl mt-56 p-8 flex flex-col items-center relative">
        <button onClick={handleWithdrawClick} className="absolute top-1 left-4 text-red-500 text-4xl font-bold">
          &larr;
        </button>

        <div className="absolute top-4 right-4 text-gray-700 text-sm">
          <p>Mobile Number: <span className="font-semibold">{mobileNumber}</span></p>
          <p>Selected Problem: <span className="font-semibold">{selectedProblem}</span></p>
        </div>

        <div className="mt-4 mb-3">
          <img src={QueueIcon} alt="Queue Icon" className="w-16 h-22" />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-2 relative">
          You Are Now In The Queue
          <div className="inline-block relative ml-2 group">
            <img src={InfoIcon} alt="Information" className="w-5 h-5 cursor-pointer filter transform translate-y-0.5" />
            <div className="absolute left-6 transform -translate-x-full top-full mt-2.5 w-64 p-3 bg-white text-sm text-gray-700 border rounded-lg shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50">
              Due to high call volumes, instead of staying on hold, you’ll be notified when it’s your turn.
            </div>
          </div>
        </h1>

        <h2 className="text-6xl font-bold text-center text-black mb-2">{queueNumber}</h2>
        <p className="text-gray-500 text-sm text-center mb-6">PEOPLE AHEAD OF YOU</p>

        {/* Queue Progress Bar - Now Starts Empty and Fills Up as You Get Closer */}
        <div className="w-full max-w-lg relative">
          <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-red-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div
            className="absolute w-6 h-6 bg-white border-2 border-red-500 rounded-full shadow-lg transition-all duration-300"
            style={{
              top: '-4px',
              left: `${progressPercentage}%`,
              transform: 'translateX(-50%)',
            }}
          ></div>
        </div>

        <p className="text-gray-700 text-sm text-center mt-6">
          Thank you for your patience. We will call you as soon as it is your turn.
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Do you want to leave the queue?</h2>
            <p className="text-gray-700 mb-6">
              If you leave, you will lose your queue position and will not be contacted.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleWithdrawCompletely} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Leave Queue
              </button>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
}

export default InQueue;
















