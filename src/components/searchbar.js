import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const searchIndex = [
  { title: "Change Contact Details", keywords: ["contact details"], popup: "contactDetails", page: "/generalfaq" },
  { title: "Retrieve Access Code", keywords: ["access code"], popup: "accessCode", page: "/generalfaq" },
  { title: "Request Fee Waiver", keywords: ["fee waiver"], popup: "feeWaiver", page: "/generalfaq" },
  { title: "Withdrawal Activation", keywords: ["withdrawal activation"], popup: "withdrawalActivation", page: "/generalfaq" },
];

// Configure Fuse.js for search
const fuse = new Fuse(searchIndex, {
  keys: ['title', 'keywords'],
  threshold: 0.4, // Adjust for sensitivity
});

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    // Show suggestions based on input length and search results
    if (input.length > 1) {
      const results = fuse.search(input).map(result => result.item);
      setSuggestions(results.length > 0 ? results : []);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    // Navigate to the specified page with the popup ID as a query parameter
    navigate(`${suggestion.page}?popupButton=${suggestion.popup}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative mx-auto max-w-xl mt-6">
      <input
        type="text"
        placeholder="Search for common enquiries..."
        className="w-full p-4 border text-gray-700 focus:outline-none focus:border-blue-500 rounded-full"
        value={query}
        onChange={handleInputChange}
      />
      
      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <strong>{suggestion.title}</strong> - {suggestion.keywords.join(', ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
