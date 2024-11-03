import React from 'react';

function ContactBooking() {
  return (
    <div className="flex justify-center items-center bg-gray-100 py-8 h-[50vh]">
      <div className="w-1/2 flex justify-center items-center border-r border-gray-300">
      <a href="ContactUsPage" className="w-3/4 h-40 bg-gray-200 flex items-center justify-center" > 
          <p className="text-gray-700 font-bold text-lg">Contact Us</p>
        </a>
      </div>
      <div className="w-1/2 flex justify-center items-center">
      <a href="BookingPage" className="w-3/4 h-40 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-700 font-bold text-lg">Book an Appointment</p>
        </a>
      </div>
    </div>
  );
}

export default ContactBooking;
