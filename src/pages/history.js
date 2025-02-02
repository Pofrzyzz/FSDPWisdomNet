import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Chatbot from "../components/aichatbot/aichatbot";
import BackGround from "../images/booking-bg.png";
import axios from 'axios';
import { Link } from "react-router-dom";
import moment from 'moment-timezone';

function HistoryPage() {
    const [ongoingBookings, setOngoingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        console.log("Retrieved userId from localStorage:", userId);
        if (!userId) {
            setError("User ID not found. Please log in.");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/api/history/${userId}`)
            .then((response) => {
                console.log("Booking History Response:", response.data); // Debugging line
                setOngoingBookings(response.data.ongoingBookings || []);
                setPastBookings(response.data.pastBookings || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch booking history:", err.response || err.message); // More details
                setError("Failed to fetch booking history.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-xl mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            <section className="flex flex-col min-h-screen">
                <div className="relative w-full h-80 md:h-96 overflow-hidden">
                    <img src={BackGround} alt="Appointment Banner" className="w-full h-full object-cover object-[center_10%]" />
                    <Link to="/BookingPage">
                        <div className="absolute top-40 left-16 text-lg font-semibold cursor-pointer z-10 flex items-center hover:underline hover:decoration-white">
                            <img src={require("../images/arrow-left-red.svg").default} alt="Back" className="w-5 h-5 mr-2" />
                            <span className="text-white">Back to Book Appointment</span>
                        </div>
                    </Link>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-60">
                        <h1 className="text-3xl md:text-6xl font-geomanist font-bold mt-32 md:mt-40">Booking History</h1>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Booking History</h2>

                    {/* Ongoing Bookings */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ongoing Bookings</h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto">
                        {ongoingBookings.length > 0 ? (
                            ongoingBookings.map((booking) => (
                                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                    <div className="text-left">
                                        <h4 className="text-xl font-semibold text-gray-700">{booking.Branch}</h4>
                                        <p className="text-gray-500">Location: {booking.Location}</p>
                                        <p className="text-gray-500">Reason: {booking.Reason}</p>
                                        {/* Combine DateOfAppointment and TimeOfAppointment */}
                                        <p className="text-gray-500">
                                            Date and Time: {moment(booking.DateOfAppointment).set({
                                                'hour': moment(booking.TimeOfAppointment).hour(),
                                                'minute': moment(booking.TimeOfAppointment).minute(),
                                                'second': moment(booking.TimeOfAppointment).second(),
                                            }).tz('Asia/Singapore').format('MMMM Do YYYY, h:mm A')}
                                            </p></div>
                                    <span className="text-sm text-blue-500">Ongoing</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No ongoing bookings.</p>
                        )}
                        </div>
                    </div>

                    {/* Past Bookings */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Past Bookings</h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto">
                        {pastBookings.length > 0 ? (
                            pastBookings.map((booking) => (
                                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                    <div className="text-left">
                                        <h4 className="text-xl font-semibold text-gray-700">{booking.Branch}</h4>
                                        <p className="text-gray-500">Location: {booking.Location}</p>
                                        <p className="text-gray-500">Reason: {booking.Reason}</p>
                                        {/* Combine DateOfAppointment and TimeOfAppointment */}
                                        
                                        <p className="text-gray-500">
                                        Date and Time: {moment(booking.DateOfAppointment).set({
                                            'hour': moment(booking.TimeOfAppointment).hour(),
                                            'minute': moment(booking.TimeOfAppointment).minute(),
                                            'second': moment(booking.TimeOfAppointment).second(),
                                        }).tz('Asia/Singapore').format('MMMM Do YYYY, h:mm A')}
                                        </p>
                                    </div>
                                    <span className="text-sm text-green-500">Completed</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No past bookings.</p>
                        )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <Chatbot />
        </div>
    );
}

export default HistoryPage;
