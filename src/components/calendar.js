import React, { useState, useEffect, useCallback } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function Calendar({ selectedBranch, onDateTimeSelect }) {
    const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Memoized fetchAvailableSlots function to prevent re-creation on every render
    const fetchAvailableSlots = useCallback(async () => {
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
    }, [selectedBranch, selectedDate]);

    useEffect(() => {
        fetchAvailableSlots();
    }, [fetchAvailableSlots]);

    const handleDateSelect = (day) => {
        const newSelectedDate = new Date(
            selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(),
            selectedDate ? selectedDate.getMonth() : new Date().getMonth(),
            day
        );
        setSelectedDate(newSelectedDate);
        setAvailableSlots([]);
        setSelectedTime(''); // Clear selected time if date changes
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setIsDateTimePickerOpen(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];  // Format date without time
            onDateTimeSelect(`${formattedDate} ${time}`);
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
                <div className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mt-2 w-[500px] p-4 border border-gray-300 rounded-lg bg-white shadow-lg flex space-x-4">
                    {/* Date Picker */}
                    <div className="flex-1">
                        <h3 className="text-gray-700 font-bold mb-2">Select a Date:</h3>
                        <div className="flex justify-between mb-2">
                            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))} className="text-gray-600 hover:text-red-500">
                                &lt;
                            </button>
                            <h4 className="font-medium">
                                {selectedDate ? selectedDate.toLocaleString('default', { month: 'long' }) : new Date().toLocaleString('default', { month: 'long' })} {selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()}
                            </h4>
                            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))} className="text-gray-600 hover:text-red-500">
                                &gt;
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {daysOfWeek.map((day) => (
                                <div key={day} className="font">{day}</div>
                            ))}
                            {Array.from({ length: new Date(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(), selectedDate ? selectedDate.getMonth() : new Date().getMonth(), 1).getDay() }).map((_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}
                            {Array.from({ length: new Date(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(), selectedDate ? selectedDate.getMonth() : new Date().getMonth() + 1, 0).getDate() }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleDateSelect(i + 1)}
                                    className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Time Slot Selector */}
                    <div className="flex-none w-32 h-80 overflow-y-auto border-l border-gray-300 pl-4">
                        <h3 className="text-gray-700 font-bold mb-2">Available Times:</h3>
                        <div className="flex flex-col space-y-2">
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot) => (
                                    <button
                                        key={slot.SlotID}
                                        onClick={() => handleTimeSelect(slot.StartTime)}
                                        className={`px-4 py-2 w-full border rounded-lg text-center transition-colors duration-200 ${
                                            selectedTime === slot.StartTime ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        } focus:outline-none`}
                                    >
                                        {slot.StartTime} - {slot.EndTime}
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No available slots for this date</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;
