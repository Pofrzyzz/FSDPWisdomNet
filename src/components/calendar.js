import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function Calendar({ selectedBranch }) {
    const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    const timeSlots = ['0900', '1000', '1200', '1230', '1400', '1600', '1700', '1800', '1900', '2000'];

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
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
    };

    return (
        <div className="relative mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Date & Time:</label>
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    value={selectedDate ? `${selectedDate.toISOString().substring(0, 10)} ${selectedTime || ''}` : ''}
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
                        <h3 className="text-gray-700 font-medium mb-2">Select a date:</h3>
                        <div className="flex justify-between mb-2">
                            <button onClick={handlePrevMonth} className="text-gray-600 hover:text-red-500">
                                &lt;
                            </button>
                            <h4 className="font-bold">
                                {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
                            </h4>
                            <button onClick={handleNextMonth} className="text-gray-600 hover:text-red-500">
                                &gt;
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {daysOfWeek.map(day => (
                                <div key={day} className="font-bold">{day}</div>
                            ))}
                            {Array.from({ length: getFirstDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }, (_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}
                            {Array.from({ length: getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth()) }, (_, i) => (
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
                    <div className="flex-none w-32 h-60 overflow-y-auto ">
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
