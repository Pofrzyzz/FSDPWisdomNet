import React from 'react';

function Calender() {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Date & Time:</label>
            <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        </div>
    );
}

export default Calender;