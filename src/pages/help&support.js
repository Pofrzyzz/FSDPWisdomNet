import React from 'react';
import Navbar from '../components/navbar';
import CommonFaqs from '../components/commonfaqs';
import ContactBooking from '../components/contactbooking';
import Footer from '../components/footer';
import Help from '../components/needhelp';
import HelpDesk from '../images/HelpDesk.jpg';
import Chatbot from '../components/chatbot';
import Searchbar from '../components/searchbar'
import AIChatbot from '../components/aichatbot/aichatbot'

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      <section className="relative bg-white py-16 h-[420px]">
        <div className="container mx-auto px-6 md:px-12 text-center h-full">
          {/* Wrap the CardBanner image in a container with z-index */}
          <div className="absolute inset-0 z-0">
            <img
              src={HelpDesk}
              alt="Help Desk"
              className="w-full h-full object-cover"
            />
            {/* Red line at the bottom of the image */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-7xl md:text-6xl font-geomanist font-bold mt-32 md:mt-36 text-white">
              Help & Support
            </h1>
            {/* Search Bar */}
            <div >
              <Searchbar />
            </div>
          </div>
        </div>
      </section>

      {/* CommonFaqs Component */}
      <CommonFaqs />


      {/* Other Sections */}
      <section className="flex flex-col min-h-screen">
        <ContactBooking />
        <Help />
      </section>

      <Footer />

      <AIChatbot/>

      {/* Chatbot Button and Interface */}
      <Chatbot />
    </div>
  );
}

export default HomePage;