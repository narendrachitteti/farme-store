import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import farmLogo from "../assets/logo12.png";
import googleplay from "../assets/googleplay.webp";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        
        {/* Left Section: Logo and App Download */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={farmLogo} // Replace with your actual logo path
            alt="Farm E-Store Logo"
            className="w-24 mb-4"
          />
          <div className="flex flex-col items-center md:items-start">
            <img
              src={googleplay} // Replace with your actual Google Play image path
              alt="Download on Google Play"
              className="w-32 mb-4"
            />
            <p className="text-gray-600 font-semibold mb-2 text-center md:text-left">Social Links</p>
            <div className="flex space-x-2">
              <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer" />
              <FaTwitter className="text-gray-600 hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="text-gray-600 hover:text-pink-500 cursor-pointer" />
              <FaYoutube className="text-gray-600 hover:text-red-600 cursor-pointer" />
              <FaLinkedinIn className="text-gray-600 hover:text-blue-700 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Middle Section: Links and Address */}
        <div className="flex flex-col md:flex-row text-gray-700 text-center md:text-left space-y-4 md:space-y-0 md:space-x-12">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-green-600">About us</a>
            <a href="#" className="hover:text-green-600">Contact Us</a>
            <a href="#" className="hover:text-green-600">Privacy Policy</a>
            <a href="#" className="hover:text-green-600">Terms & Conditions</a>
            <a href="#" className="hover:text-green-600">Return & Refund Policy</a>
            <a href="#" className="hover:text-green-600">Shipping/Delivery Policy</a>
            <a href="#" className="hover:text-green-600">Careers</a>
            <a href="#" className="hover:text-green-600">FAQ</a>
          </div>
          <div className="md:border-l border-gray-300 md:pl-4">
            <p className="font-semibold">Registered office:</p>
            <p>Farm E-Store Private Limited</p>
            <p>6/237-G-8-K Devalam Street</p>
            <p>Extn.Ward No.6, Madanapalle-517325</p>
            <p>Annamayya District, Andhra Pradesh.</p>
            <p>CIN: U74999AP2022PTC121551</p>
          </div>
        </div>

        {/* Right Section: Call and WhatsApp */}
        <div className="flex flex-col items-center md:items-end">
          <div className="bg-orange-400 text-white py-2 px-4 rounded-md mb-2 text-center text-lg font-semibold">
            Call To Order<br />9010189891
          </div>
          <button className="flex items-center space-x-2 text-green-600 text-lg font-semibold">
            <FaWhatsapp className="text-2xl" />
            <span>WhatsApp To Order</span>
          </button>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-green-600 text-white py-4 mt-8 text-center text-sm">
        Copyright © 2024 Farm E-Store Private Limited
      </div>
    </footer>
  );
};

export default Footer;
