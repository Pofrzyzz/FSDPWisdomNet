import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/help&support';
import BookingPage from './pages/booking';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/BookingPage" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
