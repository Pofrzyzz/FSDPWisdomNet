import React from 'react';
import Navbar from '../components/navbar';
import CommonFaqs from '../components/commonfaqs';
import ContactBooking from '../components/contactbooking';
import Footer from '../components/footer';
import Help from '../components/needhelp';
import Chatbot from '../components/chatbot';
import Searchbar from '../components/searchbar'

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mt-28 md:mt-28">Help & Support</h1>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-xl mt-6">
            <Searchbar />
          </div>
          
          {/* Common FAQ Section */}
          <CommonFaqs />
          {/* View More Button */}
          <button className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors">
            View More
          </button>
        </div>
      </section>
      
      {/* Other Sections */}
      <section className="flex flex-col min-h-screen">
        <ContactBooking />
        <Help />
      </section>
      
      <Footer />

      {/* Chatbot Button and Interface */}
      <Chatbot />
    </div>
  );
}

export default HomePage;
