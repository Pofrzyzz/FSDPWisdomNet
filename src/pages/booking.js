import React from 'react';
import Branch from '../components/branch';
import Calendar from '../components/calendar';
import NavBar from '../components/navbar';

function BookingPage() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen pt-32">
            <NavBar />
            <header className="text-center mb-8">
                <h1 className="text-4xl font-semibold text-gray-800">Book an Appointment</h1>
                <p className="text-gray-600 mt-2">Make a booking to consult our specialist for banking enquiries</p>
            </header>
            <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Branch />
                        </div>
                        <div className="flex-1">
                            <Calendar />
                        </div>
                    </div>
                </div>
                <button className="w-full mt-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors">
                    Book
                </button>
            </div>
        </div>
    );
}

export default BookingPage;
