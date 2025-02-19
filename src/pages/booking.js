import React, { useState } from 'react';
import Branch from '../components/branch';
import Calendar from '../components/calendar';
import NavBar from '../components/navbar';
import Footer from '../components/footer'; 
import BackGround from '../images/booking-bg.png';
import Chatbot from '../components/aichatbot/aichatbot';
import axios from 'axios';
import moment3 from 'moment';
import { Link } from 'react-router-dom';

function BookingPage() {
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        reason: '',
    });
    const [showTooltip, setShowTooltip] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [slotID, setSlotID] = useState(null);
    const [errors, setErrors] = useState({
        branch: '',
        dateTime: '',
        form: '',
    });

    const handleBook = () => {
        let hasErrors = false;
        const newErrors = { branch: '', dateTime: '', form: '' };
    
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
            const userId = localStorage.getItem('userId'); // Check for user ID in local storage
    
            if (!userId) {
                // Show login modal if user is not logged in
                setShowModal(true);
            } else {
                // Proceed with booking if user is logged in
                setIsConfirmed(false); // Ensure confirmation state is reset
                setShowModal(true);
            }
        }
    };

    const handleConfirm = async () => {
        const userId = localStorage.getItem('userId'); 
        const bookingMadeTime = moment3().format('YYYY-MM-DD HH:mm:ss');
    
        console.log("Selected Branch:", selectedBranch);
        console.log("Selected DateTime:", selectedDateTime);
        console.log("Reason:", formData.reason);
    
        if (!userId || !selectedBranch || !slotID || !bookingMadeTime || !formData.reason) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                form: 'Please fill in all the fields.',
            }));
            return;
        }
    
        try {
            const appointmentData = {
                BranchID: selectedBranch.id,
                UserID: parseInt(userId),
                Reason: formData.reason,
                BookingDateTime: bookingMadeTime,
                SlotID: slotID,
            };
    
            console.log("Sending Appointment Data:", appointmentData);
    
            const response = await axios.post('http://localhost:5000/api/appointment/create', appointmentData);
            console.log("Backend Response:", response.data);
    
            if ((response.status === 200 || response.status === 201) && response.data.message === 'Appointment created successfully') {
                setIsConfirmed(true);
                setShowModal(true);
                
                // Store values before reset
                setFormData((prev) => ({
                    ...prev,
                    reason: formData.reason,
                }));
    
                setSelectedBranch((prev) => ({ ...prev }));
                setSelectedDateTime((prev) => ({ ...prev }));
    
                setSlotID(null);
            } else {
                console.error('Unexpected response:', response);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    form: response.data.error || 'An error occurred while booking your appointment.',
                }));
            }
        } catch (error) {
            console.error('Error during appointment booking:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                form: 'Failed to book the appointment. Please try again later.',
            }));
        }
    };
    
    

    const handleDateTimeSelect = (dateTimeInfo) => {
        setSelectedDateTime(dateTimeInfo); 
        setSlotID(dateTimeInfo.slotID); // Set slotID separately if you want to use it directly
    };

    const handleClose = () => {
        setShowModal(false);
        setIsConfirmed(false); 
        setErrors({ branch: '', dateTime: '', form: '' }); 
        setFormData({
            reason: '',
        });
        setSelectedBranch(null);
        setSelectedDateTime(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <NavBar />

            <section className="flex flex-col min-h-screen">
                <div className="relative w-full h-80 md:h-96 overflow-hidden">
                    <img
                        src={BackGround}
                        alt="Appointment Banner"
                        className="w-full h-full object-cover object-[center_10%]" 
                    />

                    {/* Back button */}
                    <Link to="/HomePage">
                        <div className="absolute top-40 left-16 text-lg font-semibold cursor-pointer z-10 flex items-center hover:underline hover:decoration-white">
                            <img src={require('../images/arrow-left-red.svg').default} alt="Back" className="w-5 h-5 mr-2" />
                            <span className="text-white">Back to Help & Support</span>
                        </div>
                    </Link>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-60">
                        <h1 className="text-3xl md:text-6xl font-geomanist font-bold mt-32 md:mt-40">Book an Appointment</h1>
                        <p className="text-center mt-3 max-w-2xl text-base md:text-lg leading-tight px-4">
                            Make a booking to consult our specialist for banking enquiries<br />
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto mt-8">
                <Link to="/HistoryPage">
                        <div className="absolute top-90 left-16 text-lg font-semibold cursor-pointer z-10 flex items-center hover:underline hover:decoration-white">
                            {/* <img src={require('../images/arrow-left-red.svg').default} alt="Back" className="w-5 h-5 mr-2" /> */}
                            <span className="text-black underline">View Booking History</span>
                        </div>
                    </Link>
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
                                <Calendar selectedBranch={selectedBranch} onDateTimeSelect={handleDateTimeSelect} />
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
                            {!localStorage.getItem('userId') ? (
                                <>
                                    <h2 className="text-xl font-bold mb-4">Please Log In</h2>
                                    <p className="mb-6">You need to log in to make a booking.</p>
                                    <div className="flex justify-end">
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            window.location.href = '/';
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                                    >
                                        Log In
                                        </button>
                                    </div>
                                </>
                            ) : isConfirmed ? (
                                <>
                                    <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                                    <div className="flex items-center justify-between mb-4">
                                        <strong>Branch:</strong> <span>{selectedBranch?.name || "Not selected"}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <strong>Date & Time:</strong> <span>{selectedDateTime?.date} {selectedDateTime?.time}</span>
                                    </div>
                                    <div className="mb-4">
                                        <strong>Reason:</strong> <span>{formData.reason || "Not provided"}</span>
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
                                        <span>{selectedBranch?.name}</span>
                                        <span>{selectedDateTime?.date} {selectedDateTime?.time}</span> {/* Correct rendering of selectedDateTime */}
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
            </section>

            <Footer />
            <Chatbot />
        </div>
    );
}

export default BookingPage;
