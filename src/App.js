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
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/ContactUsPage" element={<ContactUsPage />} />
        <Route path="/InQueuePage" element={<InQueuePage />} />
        <Route path="/CardsFaq" element={<CardsFaq />} />
        <Route path="/AccountsFaq" element={<AccountsFaq />} />
        <Route path="/LoansFaq" element={<LoansFaq />} />
        <Route path="/InvestmentsFaq" element={<InvestmentsFaq />} />
        <Route path="/LoginPage" element={<LoginPage/>}/>
        <Route path="/SignUpPage" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
