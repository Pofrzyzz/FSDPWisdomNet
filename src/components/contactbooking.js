// ContactBooking.js
import React from 'react';
// Import your images - adjust paths to match your project structure
import contactImage from '../images/ContactUs.jpg';  // Add your contact image
import bookingImage from '../images/Appointment.jpg'; // Add your booking image

function ContactBooking() {
  return (
    // Added pt-16 (or adjust number for desired spacing) for top padding
    <section className="flex justify-center items-center bg-gray-100 py-8 pt-20 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Rest of the component remains the same */}
          <div className="w-full md:w-1/2">
            <a 
              href="ContactUsPage" 
              className="block w-full h-40 relative overflow-hidden rounded-lg group"
              style={{
                backgroundImage: `url(${contactImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            > 
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <p className="text-white font-bold text-lg md:text-xl">Contact Us</p>
              </div>
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a 
              href="BookingPage" 
              className="block w-full h-40 relative overflow-hidden rounded-lg group"
              style={{
                backgroundImage: `url(${bookingImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <p className="text-white font-bold text-lg md:text-xl">Book an Appointment</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactBooking;