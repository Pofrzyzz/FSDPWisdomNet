import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/scrolltotop';
import HomePage from './pages/help&support';
import BookingPage from './pages/booking';
import ContactUsPage from './pages/contactUs';
import InQueuePage from './pages/InQueue';
import CardsFaq from './pages/cards'
import AccountsFaq from './pages/accounts'
import GeneralFaq from './pages/generalfaq'
import LoansFaq from './pages/loans'
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import OperatorDashboard from './pages/operatorDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/ContactUsPage" element={<ContactUsPage />} />
        <Route path="/InQueuePage" element={<InQueuePage />} />
        <Route path="/CardsFaq" element={<CardsFaq />} />
        <Route path="/AccountsFaq" element={<AccountsFaq />} />
        <Route path="/LoansFaq" element={<LoansFaq />} />
        <Route path="/GeneralFaq" element={<GeneralFaq />} />
        <Route path="/LoginPage" element={<LoginPage/>}/>
        <Route path="/SignUpPage" element={<SignUpPage/>}/>
        <Route path="/OperatorPage" element={<OperatorDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
