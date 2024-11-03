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
    const [showTooltip, setShowTooltip] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [errors, setErrors] = useState({
        branch: '',
        dateTime: '',
        form: '',
    });

    const handleConfirm = () => {
        // Validate the form data before confirming
        if (formData.fullName && formData.email && formData.reason) {
            setIsConfirmed(true);
            setShowModal(true);
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                form: "Please enter your name, a valid email address, and reason for booking."
            }));
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setIsConfirmed(false); 
        setErrors({ branch: '', dateTime: '', form: '' }); 
        setFormData({
            fullName: '',
            email: '',
            reason: '',
        });
        setSelectedBranch(null);
        setSelectedDateTime(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleBook = () => {
        let hasErrors = false;
        const newErrors = { branch: '', dateTime: '', form: '' };

        // Check for branch and datetime selection
        if (!selectedBranch) {
            newErrors.branch = "Please select a branch.";
            hasErrors = true;
        }
        if (!selectedDateTime) {
            newErrors.dateTime = "Please select a date and time.";
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            setShowModal(true);
        }
    };

    return (
        <div className="flex flex-col min-h-screen relative bg-gray-100">
            <NavBar />
            <div className="relative w-full h-80 md:h-96 overflow-hidden">
                <img
                    src={BackGround}
                    alt="Appointment Banner"
                    className="w-full h-full object-cover object-[center_10%]" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-60">
                    <h1 className="text-3xl md:text-5xl font-bold mt-32 md:mt-40">Book an Appointment</h1>
                    <p className="text-center mt-3 max-w-2xl text-base md:text-lg leading-tight px-4">
                        Make a booking to consult our specialist for banking enquiries<br />
                    </p>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto mt-8">
                <div className="flex flex-col space-y-8">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1">
                            <Branch onBranchSelect={setSelectedBranch} />
                            {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                        </div>
                        <div className="flex-1 relative" 
                             onMouseEnter={() => !selectedBranch && setShowTooltip(true)} 
                             onMouseLeave={() => setShowTooltip(false)}
                        >
                            <Calendar selectedBranch={selectedBranch} onDateTimeSelect={setSelectedDateTime} />
                            {errors.dateTime && <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>}
                            {showTooltip && (
                                <div className="absolute bg-red-500 text-white text-sm p-2 rounded shadow-lg" 
                                     style={{ top: '100%', left: '0' }}>
                                    Please select a branch first
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="justify-content-center text-center">
                    <button 
                        onClick={handleBook} 
                        disabled={!selectedBranch || !selectedDateTime}
                        className={`w-20 mt-6 py-2 font-semibold rounded transition-colors ${(!selectedBranch || !selectedDateTime) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                    >
                        Book
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-[600px] p-8">
                        {isConfirmed ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                                <div className="flex items-center justify-between mb-4">
                                    <span>{selectedBranch?.name} branch</span>
                                    <span>{selectedDateTime}</span>
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
                                    <span>{selectedBranch?.name} branch</span>
                                    <span>{selectedDateTime}</span>
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
                                    />
                                </div>
                                {errors.form && <p className="text-red-500 text-sm mt-1">{errors.form}</p>}
                                <div className="flex justify-end space-x-4">
                                    <button onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
                                        Cancel
                                    </button>
                                    <button onClick={handleConfirm} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
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
