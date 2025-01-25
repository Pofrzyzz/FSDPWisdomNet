import React, { useState, useEffect, useCallback } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

function Calendar({ selectedBranch, onDateTimeSelect }) {
    const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlotID, setSelectedSlotID] = useState(null);

    const toggleDateTimePicker = () => {
        if (selectedBranch) {
            setIsDateTimePickerOpen(!isDateTimePickerOpen);
        }
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        const date = selectedDate || new Date(); // Use current date if selectedDate is null
        setSelectedDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };
    
    const handleNextMonth = () => {
        const date = selectedDate || new Date(); // Use current date if selectedDate is null
        setSelectedDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    const handleDateSelect = (day) => {
        const newSelectedDate = new Date(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(), selectedDate ? selectedDate.getMonth() : new Date().getMonth(), day, 12);
        setSelectedDate(newSelectedDate);
        if (selectedBranch) {
            fetchAvailableSlots(selectedBranch.id, newSelectedDate.toISOString().split('T')[0]);
        }
    };

    const handleTimeSelect = (time, slotID) => {
        setSelectedTime(time);
        setSelectedSlotID(slotID); // Store the selected SlotID
        if (selectedDate) {
            onDateTimeSelect({
                date: selectedDate.toISOString().split('T')[0],
                time: time,
                slotID: slotID
            });
        }
    };

    const fetchAvailableSlots = async (branchID, date) => {
        try {
            const response = await axios.get('http://localhost:5000/api/slots/available', {
                params: { branchID, date }
            });
            setTimeSlots(response.data); // Store complete slot data including SlotID and StartTime
        } catch (error) {
            console.error("Error fetching available slots:", error);
        }
    };

    useEffect(() => {
        setSelectedTime('');
    }, [selectedBranch]);

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
                <button onClick={toggleDateTimePicker} className={`text-gray-600 focus:outline-none ${!selectedBranch && 'cursor-not-allowed'}`} disabled={!selectedBranch}>
                    <FaCalendarAlt size={24} />
                </button>
            </div>

            {isDateTimePickerOpen && selectedBranch && (
                <div className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 p-4 border border-gray-300 rounded-lg bg-white shadow-lg flex space-x-4">
                    {/* Date Picker */}
                    <div className="flex-1">
                        <h3 className="text-gray-700 font-bold mb-2">Date:</h3>
                        <div className="flex justify-between mb-2">
                            <button onClick={handlePrevMonth} className="text-gray-600 hover:text-red-500">
                                &lt;
                            </button>
                            <h4 className="font-medium">
                                {selectedDate ? selectedDate.toLocaleString('default', { month: 'long' }) : new Date().toLocaleString('default', { month: 'long' })} {selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()}
                            </h4>
                            <button onClick={handleNextMonth} className="text-gray-600 hover:text-red-500">
                                &gt;
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {daysOfWeek.map(day => (
                                <div key={day} className="font">{day}</div>
                            ))}
                            {Array.from({ length: getFirstDayOfMonth(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(), selectedDate ? selectedDate.getMonth() : new Date().getMonth()) }, (_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}
                            {Array.from({ length: getDaysInMonth(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(), selectedDate ? selectedDate.getMonth() : new Date().getMonth()) }, (_, i) => {
                                const today = new Date(); // Current date
                                const isToday =
                                    today.getDate() === i + 1 &&
                                    today.getMonth() === (selectedDate ? selectedDate.getMonth() : new Date().getMonth()) &&
                                    today.getFullYear() === (selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleDateSelect(i + 1)}
                                        className={`px-2 py-1 rounded-lg ${
                                            isToday
                                                ? 'bg-red-500 text-white' // Highlight current date
                                                : selectedDate && selectedDate.getDate() === i + 1
                                                ? 'bg-red-300 text-white' // Highlight selected date
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            })}
                        </div>

                    </div>

                    {/* Time Slot Selector */}
                    <div className="flex-none w-20 h-80 overflow-y-auto">
                        <h3 className="text-gray-700 font-bold mb-2">Time:</h3>
                        <div className="flex flex-col space-y-2">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot.SlotID} // Use SlotID as key
                                    onClick={() => handleTimeSelect(slot.StartTime, slot.SlotID)} // Pass SlotID along with time
                                    className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                                        selectedTime === slot.StartTime ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } focus:outline-none`}
                                >
                                    {slot.StartTime}
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
