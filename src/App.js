import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/help&support';
import BookingPage from './pages/booking';
import ContactUsPage from './pages/contactUs';
import InQueuePage from './pages/InQueue';
import CardsFaq from './pages/cards'
import AccountsFaq from './pages/accounts'
import InvestmentsFaq from './pages/investments'
import LoansFaq from './pages/loans'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/ContactUsPage" element={<ContactUsPage />} />
        <Route path="/InQueuePage" element={<InQueuePage />} />
        <Route path="/CardsFaq" element={<CardsFaq />} />
        <Route path="/AccountsFaq" element={<AccountsFaq />} />
        <Route path="/LoansFaq" element={<LoansFaq />} />
        <Route path="/InvestmentsFaq" element={<InvestmentsFaq />} />
      </Routes>
    </Router>
  );
}

export default App;
