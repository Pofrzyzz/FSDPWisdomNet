import React, { useState } from 'react';
import Branch from '../components/branch';
import Calendar from '../components/calendar';
import NavBar from '../components/navbar';
import BackGround from '../images/booking-bg.png';

function BookingPage() {
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        reason: '',
    });

    const handleConfirm = () => {
        if (formData.fullName && formData.email && formData.reason) {
            setIsConfirmed(true);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setIsConfirmed(false); 
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="font-opensans flex flex-col items-center justify-center min-h-screen">
            <div className="fixed top-0 w-full z-10">
                <NavBar />
            </div>
            <div className="w-full h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${BackGround})` }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-6xl font-bold">Book an Appointment</h1>
                    <p className="text-lg mt-2">Make a booking to consult our specialist for banking enquiries</p>
                </div>
            </div>

            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                <div className="flex flex-col space-y-8">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Branch onBranchSelect={setSelectedBranch} />
                        </div>
                        <div className="flex-1">
                            <Calendar selectedBranch={selectedBranch} />
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className="w-full mt-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors" 
                    disabled={!selectedBranch}
                >
                    Book
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-[600px] p-8">
                        {isConfirmed ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                                <div className="flex items-center justify-between mb-4">
                                    <span>{selectedBranch?.name} branch</span> {/* Accessing name property of selectedBranch */}
                                    <span>17 Oct, 14:00</span>
                                </div>
                                <div className="mb-2">
                                    <strong>Full name (NRIC):</strong> {formData.fullName}
                                </div>
                                <div className="mb-2">
                                    <strong>Email address:</strong> {formData.email}
                                </div>
                                <div className="mb-4">
                                    <strong>Reason for booking:</strong> {formData.reason}
                                </div>
                                <button 
                                    onClick={handleClose} 
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Exit
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
                                <div className="flex items-center justify-between mb-4">
                                    <span>{selectedBranch?.name} branch</span> {/* Accessing name property */}
                                    <span>17 Oct, 14:00</span>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                                        Full name (NRIC):
                                    </label>
                                    <input 
                                        type="text" 
                                        id="fullName" 
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email address:
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" 
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                                        Reason for booking:
                                    </label>
                                    <textarea 
                                        id="reason" 
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button 
                                        onClick={handleClose} 
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleConfirm} 
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingPage;
