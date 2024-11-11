import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function Calendar({ selectedBranch, onDateTimeSelect }) {
    const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const fetchAvailableSlots = async () => {
        if (selectedBranch && selectedDate) {
            try {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                const response = await fetch(`http://localhost:5000/api/slots/available?branchID=${selectedBranch.id}&date=${formattedDate}`);
                const data = await response.json();
                setAvailableSlots(data);
            } catch (error) {
                console.error("Error fetching available slots:", error);
            }
        }
    };

    useEffect(() => {
        if (selectedBranch && selectedDate) {
            fetchAvailableSlots();
        }
    }, [selectedBranch, selectedDate]);

    const handleDateSelect = (day) => {
        const newSelectedDate = new Date(
            selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(),
            selectedDate ? selectedDate.getMonth() : new Date().getMonth(),
            day,
            12
        );
        setSelectedDate(newSelectedDate);
        if (selectedTime) {
            onDateTimeSelect(`${newSelectedDate.toISOString().split('T')[0]} ${selectedTime}`);
        }
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        if (selectedDate) {
            onDateTimeSelect(`${selectedDate.toISOString().split('T')[0]} ${time}`);
        }
    };

    return (
        <div className="relative mb-4">
            <label className="block text-gray-700 mb-2 text-left text-xl font-bold">Date & Time:</label>
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    value={selectedDate ? `${selectedDate.toISOString().split('T')[0]} ${selectedTime || ''}` : ''}
                    readOnly
                    placeholder="Select a date and time"
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${!selectedBranch && 'bg-gray-200'}`}
                    disabled={!selectedBranch}
                />
                <button onClick={() => setIsDateTimePickerOpen(!isDateTimePickerOpen)} className={`text-gray-600 focus:outline-none ${!selectedBranch && 'cursor-not-allowed'}`} disabled={!selectedBranch}>
                    <FaCalendarAlt size={24} />
                </button>
            </div>
            {isDateTimePickerOpen && selectedBranch && (
                <div className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 p-4 border border-gray-300 rounded-lg bg-white shadow-lg flex space-x-4">
                    {/* Date Picker and Time Slot Selector code here */}
                </div>
            )}
        </div>
    );
}

export default Calendar;
