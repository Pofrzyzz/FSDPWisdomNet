import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import SearchIcon from '../images/search.svg';

const searchIndex = [
  { title: "General", keywords: ["contact details", "access code", "fee waiver", "withdrawal activation", "bank code", "myinfo", "remote account"], url: "/GeneralFaq" },
  { title: "Cards", keywords: ["card", "card activation", "credit limit", "balance", "transaction", "card replacement", "statement", "debit card", "credit card"], url: "/CardsFaq" },
  { title: "Loans", keywords: ["loan", "repayment", "interest", "tenure", "change debiting account", "fire insurance", "home loan"], url: "/LoansFaq" },
  { title: "Accounts", keywords: ["account", "cheque", "book", "cheque status", "bank statement", "fixed deposit", "withdraw"], url: "/AccountsFaq" },
];

const fuse = new Fuse(searchIndex, {
  keys: ['keywords', 'title'],
  threshold: 0.4, // Adjusts sensitivity; lower values = stricter matches, higher values = more fuzzy
});

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.length < 3) {
      alert("Please enter at least 3 characters to search.");
      return;
    }

    const results = fuse.search(query);
    
    if (results.length > 0) {
      navigate(results[0].item.url);
    } else {
      alert("No results found");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative mx-auto max-w-xl mt-6">
      <input
        type="text"
        placeholder="Search for common enquiries..."
        className="w-full p-4 border text-gray-700 focus:outline-none focus:border-blue-500 rounded-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        onClick={handleSearch}
      >
        <img src={SearchIcon} alt="Search" className="w-8 h-8 mr-4" />
      </button>
    </div>
  );
}

export default SearchBar;
