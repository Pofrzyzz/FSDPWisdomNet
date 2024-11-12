import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Branch({ onBranchSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branches, setBranches] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:5000/api/branch')  // Use full URL with port number
            .then((response) => {
                setBranches(response.data);
            })
            .catch((error) => {
                console.error('Error fetching branches:', error);
            });
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleBranchSelect = (branch) => {
        setSelectedBranch(branch);
        onBranchSelect(branch);
        setIsOpen(false);
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-left text-xl font-bold">Select a branch:</label>
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white hover:bg-red-500 hover:text-white transition duration-200 flex items-center justify-between"
                >
                    <span>{selectedBranch ? selectedBranch.name : 'Select a branch'}</span>
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute z-20 left-1/2 transform -translate-x-1/2 w-72 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto h-50 w-96">
                        {branches.map((branch) => (
                            <div
                                key={branch.id}  // Adjusted to use "id" as per branchModel
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
