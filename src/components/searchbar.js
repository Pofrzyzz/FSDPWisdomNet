import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const searchIndex = [
  //General FAQ Searches
  { title: "Change Contact Details", keywords: ["contact details"], popup: "contactDetails", page: "/generalfaq" },
  { title: "Retrieve Access Code", keywords: ["access code"], popup: "accessCode", page: "/generalfaq" },
  { title: "Request Fee Waiver", keywords: ["fee waiver"], popup: "feeWaiver", page: "/generalfaq" },
  { title: "Withdrawal Activation", keywords: ["withdrawal activation"], popup: "withdrawalActivation", page: "/generalfaq" },

  { title: "Bank Code", keywords: ["bank code"], popup: "bankCode", page: "/generalfaq" },
  { title: "About MyInfo", keywords: ["myinfo"], popup: "myInfo", page: "/generalfaq" },
  { title: "Apply through MyInfo", keywords: ["apply myinfo"], popup: "applyMyInfo", page: "/generalfaq" },
  { title: "About Remote Account Opening", keywords: ["Remote Account"], popup: "openRemoteAcc", page: "/generalfaq" },

  //Accounts FAQ Searches
  { title: "Apply for Cheque Book", keywords: ["apply cheque book"], popup: "applyCheque", page: "/accountsfaq" },
  { title: "Lost Cheque", keywords: ["Lost Cheque"], popup: "lostCheque", page: "/accountsfaq" },
  { title: "Cheque Status", keywords: ["cheque status"], popup: "chequeStatus", page: "/accountsfaq" },
  { title: "Stop Cheque Payment", keywords: ["stop cheque payment"], popup: "stopCheque", page: "/accountsfaq" },

  { title: "Request Bank Statement", keywords: ["Request Bank Statement"], popup: "reqBankStatement", page: "/accountsfaq" },
  { title: "Make SGD Fixed Deposit", keywords: ["Make SGD Fixed Deposit"], popup: "sgdFixedDep", page: "/accountsfaq" },
  { title: "Withdraw Fixed Deposit", keywords: ["Withdraw Fixed Deposit"], popup: "withdrawFixedDep", page: "/accountsfaq" },
  { title: "Retrieve Statements", keywords: ["Retrieve Statements"], popup: "retrieveStatements", page: "/accountsfaq" },

  //Loans FAQ Searches
  { title: "Full Loan Repayment", keywords: ["Full Loan Repayment"], popup: "fullLoanRepayment", page: "/loansfaq" },
  { title: "Partial Loan Repayment", keywords: ["Partial Loan Repayment"], popup: "partialLoanRepayment", page: "/loansfaq" },
  { title: "Cancel Partial Prepayment", keywords: ["Cancel Partial Prepayment "], popup: "cancelPartialPrepayment", page: "/loansfaq" },
  { title: "Change Loan Interest Rate Package", keywords: ["Change Loan Interest Rate Package"], popup: "changePackage", page: "/loansfaq" },

  { title: "Change Insurance Tenure Length", keywords: ["Change Insurance Tenure Length"], popup: "changeTenureLength", page: "/loansfaq" },
  { title: "Change Debiting Account", keywords: ["Change Debiting Account"], popup: "changeDebitingAcc", page: "/loansfaq" },
  { title: "Cancel Fire Insurance Policy", keywords: ["Cancel Fire Insurance Policy "], popup: "cancelFireInsurance", page: "/loansfaq" },
  { title: "Request Home Loan Statements", keywords: ["Request Home Loan Statements"], popup: "requestHomeStatement", page: "/loansfaq" },

  //Cards FAQ Searches
  { title: "Card Activation", keywords: ["Card Activation"], popup: "cardActivation", page: "/cardsfaq" },
  { title: "Overseas Card Activation", keywords: ["Overseas Card Activation"], popup: "overseasCardActivation", page: "/cardsfaq" },
  { title: "Apply for Card", keywords: ["Apply for Card"], popup: "applyCard", page: "/cardsfaq" },
  { title: "Credit Limit", keywords: ["Credit Limit"], popup: "creditLimit", page: "/cardsfaq" },

  { title: "Check Balance", keywords: ["Check Balance", "Money Left"], popup: "checkBalance", page: "/cardsfaq" },
  { title: "Check Transaction", keywords: ["Check Transaction"], popup: "checkTransaction", page: "/cardsfaq" },
  { title: "Card Replacement", keywords: ["Card Replacement", "New Card", "Damaged Card", "Lost Card"], popup: "cardReplacement", page: "/cardsfaq" },
  { title: "Retrieve Statements", keywords: ["Retrieve Statements"], popup: "retrieveStatements", page: "/cardsfaq" },

];

// Configure Fuse.js for search
const fuse = new Fuse(searchIndex, {
  keys: ['title', 'keywords'],
  threshold: 0.4,
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
              <strong>{suggestion.title}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
