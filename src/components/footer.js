import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '../images/logo_ocbc.svg';

function Footer() {
  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src={logo} alt="OCBC Logo" className="mb-4 h-10" />
          <p className="font-semibold">Personal Banking</p>
          <p className="text-sm text-gray-600">You are in <span className="font-bold text-black">Singapore</span> ▼</p>
          <ul className="mt-4 text-sm text-gray-600 space-y-1">
            <li>Premier Banking</li>
            <li>FRANK by OCBC</li>
            <li>Business Banking</li>
            <li>OCBC Group</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Useful links</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>OCBC Online Banking</li>
            <li>ATM and Branch locator</li>
            <li>Help and Support</li>
            <li>Important Documents</li>
            <li>Report Vulnerability</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Get in touch with us</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Contact Us</li>
            <li>+65 6363 3333</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaYoutube />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-xs text-gray-600">
        <ul className="flex justify-center space-x-4 mb-2">
          <li>Conditions of Access</li>
          <li>Policies</li>
          <li>Notices</li>
        </ul>
        <p>© Copyright 2004 – 2024 – OCBC Bank. All Rights Reserved. Co. Reg. No.: 193200032W</p>
      </div>
    </div>
  );
}

export default Footer;
