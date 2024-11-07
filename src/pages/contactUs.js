import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import ContactBanner from '../images/ContactBanner.svg';
import Footer from '../components/footer'
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

  const handleConfirm = () => {
    setShowModal(false);
    navigate('/InQueuePage', {
    state: {
      mobileNumber: mobileNumber,
      selectedProblem: selectedProblem,
    },
  });
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      <NavBar />

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
              <button className={`bg-gray-200 w-56 h-24 rounded flex items-center justify-center text-xl text-center ${selectedProblem === 'Card Services' ? 'border-4 border-red-500' : ''}`} onClick={() => handleSelectProblem('Card Services')}>Card Services</button>
              <button className={`bg-gray-200 w-56 h-24 rounded flex items-center justify-center text-xl text-center ${selectedProblem === 'Payment & Transfers' ? 'border-4 border-red-500' : ''}`} onClick={() => handleSelectProblem('Payment & Transfers')}>Payment & Transfers</button>
              <button className={`bg-gray-200 w-56 h-24 rounded flex items-center justify-center text-xl text-center ${selectedProblem === 'Digital Banking Assistance' ? 'border-4 border-red-500' : ''}`} onClick={() => handleSelectProblem('Digital Banking Assistance')}>Digital Banking Assistance</button>
              <button className={`bg-gray-200 w-56 h-24 rounded flex items-center justify-center text-xl text-center ${selectedProblem === 'Loan & Financing' ? 'border-4 border-red-500' : ''}`} onClick={() => handleSelectProblem('Loan & Financing')}>Loan & Financing</button>
              <button className={`bg-gray-200 w-56 h-24 rounded flex items-center justify-center text-xl text-center ${selectedProblem === 'Fraud & Security' ? 'border-4 border-red-500' : ''}`} onClick={() => handleSelectProblem('Fraud & Security')}>Fraud & Security</button>
              <button className={`bg-gray-200 w-56 h-24 rounded flex items-center justify-center text-xl text-center ${selectedProblem === 'Investment & Insurance' ? 'border-4 border-red-500' : ''}`} onClick={() => handleSelectProblem('Investment & Insurance')}>Investment & Insurance</button>
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
       <section><Footer /> </section>
       {/* Chatbot Button and Interface */}
       <Chatbot />
    </div>

  
  );
}

export default ContactUs;
















