import React, { useState } from 'react';

function Branch({ onBranchSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    // Placeholder data for branches
    const branches = [
        { id: 1, name: 'OCBC Centre branch', street: '65 Chua St', additionalInfo: '#01-00 OCBC Centre (with Premier Banking Centre), Singapore 049513' },
        { id: 2, name: 'Singapore Management University FRANK Store', street: '70 Stamford Road #B1-43', additionalInfo: 'Singapore Management University, Singapore 178901' },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleBranchSelect = (branch) => {
        setSelectedBranch(branch);
        onBranchSelect(branch); // Notify parent component of the selected branch
        setIsOpen(false);
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Select a branch:</label>
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white hover:bg-red-500 hover:text-white transition duration-200 flex items-center justify-between"
                >
                    <span>{selectedBranch ? selectedBranch.name : 'Select a branch'}</span>
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute z-20 left-1/2 transform -translate-x-1/2 w-64 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto h-40   ">
                        {branches.map((branch) => (
                            <div
                                key={branch.id}
                                onClick={() => handleBranchSelect(branch)}
                                className="p-4 hover:bg-red-500 hover:text-white cursor-pointer transition duration-200"
                            >
                                <h3 className="font-bold">{branch.name}</h3>
                                <p className="text-sm">{branch.street}</p>
                                <p className="text-sm text-gray-500">{branch.additionalInfo}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Branch;
