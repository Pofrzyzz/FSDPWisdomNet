import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function Calendar() {
    const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    // Available time slots
    const timeSlots = ['0900', '1000', '1200', '1230', '1400', '1600'];

    // Toggle date & time picker display
    const toggleDateTimePicker = () => {
        setIsDateTimePickerOpen(!isDateTimePickerOpen);
    };

    // Function to handle date change
    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Date & Time:</label>
            <div className="flex items-center space-x-2 mb-4">
                {/* Input field to display selected date and time */}
                <input
                    type="text"
                    value={
                        selectedDate
                            ? `${selectedDate.toISOString().substring(0, 10)} ${selectedTime || ''}`
                            : ''
                    }
                    readOnly
                    placeholder="Select a date and time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {/* Calendar icon to open date & time picker */}
                <button onClick={toggleDateTimePicker} className="text-gray-600 focus:outline-none">
                    <FaCalendarAlt size={24} />
                </button>
            </div>

            {/* Date & Time Picker Options */}
            {isDateTimePickerOpen && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md flex space-x-4">
                    {/* Date Picker */}
                    <div className="flex-1">
                        <h3 className="text-gray-700 font-medium mb-2">Select a date:</h3>
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {Array.from({ length: 31 }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1))}
                                    className={`px-2 py-1 rounded-lg ${
                                        selectedDate.getDate() === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Slot Selector */}
                    <div className="flex-1">
                        <h3 className="text-gray-700 font-medium mb-2">Select a time:</h3>
                        <div className="flex flex-col space-y-2">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                                        selectedTime === time ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } focus:outline-none`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;
