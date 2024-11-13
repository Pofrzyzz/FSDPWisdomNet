import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const searchIndex = [
//General FAQ Searches
{ title: "Change Contact Details", keywords: ["contact details", "update contact", "edit contact info", "change phone number", "change email"], popup: "contactDetails", page: "/generalfaq" },
{ title: "Retrieve Access Code", keywords: ["access code", "forgot access code", "reset access code", "access pin"], popup: "accessCode", page: "/generalfaq" },
{ title: "Request Fee Waiver", keywords: ["fee waiver", "waive fees", "fee exemption", "apply for fee waiver"], popup: "feeWaiver", page: "/generalfaq" },
{ title: "Withdrawal Activation", keywords: ["withdrawal activation", "activate withdrawal", "enable withdrawal", "withdraw access"], popup: "withdrawalActivation", page: "/generalfaq" },
{ title: "Bank Code", keywords: ["bank code", "swift code", "routing number", "branch code"], popup: "bankCode", page: "/generalfaq" },
{ title: "About MyInfo", keywords: ["myinfo", "myinfo account", "about myinfo", "myinfo details"], popup: "myInfo", page: "/generalfaq" },
{ title: "Apply through MyInfo", keywords: ["apply myinfo", "myinfo application", "submit through myinfo"], popup: "applyMyInfo", page: "/generalfaq" },
{ title: "About Remote Account Opening", keywords: ["Remote Account", "open remote account", "account opening online", "remote banking"], popup: "openRemoteAcc", page: "/generalfaq" },

//Accounts FAQ Searches
{ title: "Apply for Cheque Book", keywords: ["apply cheque book", "new cheque book", "request cheque book"], popup: "applyCheque", page: "/accountsfaq" },
{ title: "Lost Cheque", keywords: ["Lost Cheque", "missing cheque", "report lost cheque", "lost cheque report"], popup: "lostCheque", page: "/accountsfaq" },
{ title: "Cheque Status", keywords: ["cheque status", "track cheque", "check cheque status"], popup: "chequeStatus", page: "/accountsfaq" },
{ title: "Stop Cheque Payment", keywords: ["stop cheque payment", "cancel cheque", "void cheque"], popup: "stopCheque", page: "/accountsfaq" },
{ title: "Request Bank Statement", keywords: ["Request Bank Statement", "get bank statement", "bank statement copy", "monthly statement"], popup: "reqBankStatement", page: "/accountsfaq" },
{ title: "Make SGD Fixed Deposit", keywords: ["Make SGD Fixed Deposit", "SGD deposit", "fixed deposit setup", "new fixed deposit"], popup: "sgdFixedDep", page: "/accountsfaq" },
{ title: "Withdraw Fixed Deposit", keywords: ["Withdraw Fixed Deposit", "terminate fixed deposit", "fixed deposit withdrawal", "close fixed deposit"], popup: "withdrawFixedDep", page: "/accountsfaq" },
{ title: "Retrieve Statements", keywords: ["Retrieve Statements", "view statements", "download statements", "account statements"], popup: "retrieveStatements", page: "/accountsfaq" },

//Loans FAQ Searches
{ title: "Full Loan Repayment", keywords: ["Full Loan Repayment", "pay off loan", "loan settlement", "clear loan"], popup: "fullLoanRepayment", page: "/loansfaq" },
{ title: "Partial Loan Repayment", keywords: ["Partial Loan Repayment", "pay part of loan", "partial repayment", "reduce loan"], popup: "partialLoanRepayment", page: "/loansfaq" },
{ title: "Cancel Partial Prepayment", keywords: ["Cancel Partial Prepayment", "stop partial prepayment", "prepayment cancellation"], popup: "cancelPartialPrepayment", page: "/loansfaq" },
{ title: "Change Loan Interest Rate Package", keywords: ["Change Loan Interest Rate Package", "update loan interest", "modify loan package"], popup: "changePackage", page: "/loansfaq" },
{ title: "Change Insurance Tenure Length", keywords: ["Change Insurance Tenure Length", "adjust insurance term", "insurance tenure change"], popup: "changeTenureLength", page: "/loansfaq" },
{ title: "Change Debiting Account", keywords: ["Change Debiting Account", "switch debiting account", "new payment account"], popup: "changeDebitingAcc", page: "/loansfaq" },
{ title: "Cancel Fire Insurance Policy", keywords: ["Cancel Fire Insurance Policy", "end fire insurance", "terminate fire insurance"], popup: "cancelFireInsurance", page: "/loansfaq" },
{ title: "Request Home Loan Statements", keywords: ["Request Home Loan Statements", "home loan statement", "mortgage statement"], popup: "requestHomeStatement", page: "/loansfaq" },

//Cards FAQ Searches
{ title: "Card Activation", keywords: ["Card Activation", "activate card", "enable card"], popup: "cardActivation", page: "/cardsfaq" },
{ title: "Overseas Card Activation", keywords: ["Overseas Card Activation", "international card use", "activate card abroad"], popup: "overseasCardActivation", page: "/cardsfaq" },
{ title: "Apply for Card", keywords: ["Apply for Card", "card application", "new credit card", "debit card request"], popup: "applyCard", page: "/cardsfaq" },
{ title: "Credit Limit", keywords: ["Credit Limit", "increase credit limit", "reduce credit limit", "credit limit update"], popup: "creditLimit", page: "/cardsfaq" },
{ title: "Check Balance", keywords: ["Check Balance", "Money Left", "account balance", "available balance"], popup: "checkBalance", page: "/cardsfaq" },
{ title: "Check Transaction", keywords: ["Check Transaction", "view transaction", "transaction history", "recent transactions"], popup: "checkTransaction", page: "/cardsfaq" },
{ title: "Card Replacement", keywords: ["Card Replacement", "New Card", "Damaged Card", "Lost Card", "replace card", "card reissue"], popup: "cardReplacement", page: "/cardsfaq" },
{ title: "Retrieve Statements", keywords: ["Retrieve Statements", "view statements", "card statement", "download card statements"], popup: "retrieveStatements", page: "/cardsfaq" },


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
