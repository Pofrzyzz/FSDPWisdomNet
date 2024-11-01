import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/help&support';
import BookingPage from './pages/booking';
import ContactUsPage from './pages/contactUs';
import InQueuePage from './pages/InQueue';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/ContactUsPage" element={<ContactUsPage />} />
        <Route path="/InQueuePage" element={<InQueuePage />} />
      </Routes>
    </Router>
  );
}

export default App;
