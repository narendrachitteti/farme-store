import React from "react";
import farmLogo from "../assets/logo12.png";
import googleplay from "../assets/googleplay.webp";
import facebookIcon from "../assets/facebook1.png"; // replace with actual path
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";
import youtubeIcon from "../assets/youtube.png";
import linkedinIcon from "../assets/linkedin.png";
import whatsapp from "../assets/whatsapp.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-2 border-t border-gray-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        
        {/* Left Section: Logo and App Download */}
        <div className="flex flex-col items-center md:items-start">
        <Link to="/">
          <img
            src={farmLogo} // Replace with your actual logo path
            alt="Farm E-Store Logo"
            className="w-24 mb-4"
          />
          </Link>
          <div className="flex flex-col items-center md:items-start">
            <img
              src={googleplay} // Replace with your actual Google Play image path
              alt="Download on Google Play"
              className="w-32 mb-4"
            />
            <p className="text-gray-600 font-semibold mb-2 text-center md:text-left">Social Links</p>
            <div className="flex space-x-2">
            <img src={facebookIcon} alt="Facebook" className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <img src={twitterIcon} alt="Facebook" className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <img src={instagramIcon} alt="Facebook" className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <img src={youtubeIcon} alt="Facebook" className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <img src={linkedinIcon} alt="Facebook" className="w-6 h-6 cursor-pointer hover:opacity-80" />
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
            Call To Order<br />9533752744
          </div>
          <button className="flex items-center space-x-2 text-green-600 text-lg font-semibold">
            <a
              href="https://wa.me/9533752744"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-600 text-lg font-semibold"
            >
              <img src={whatsapp} alt="WhatsApp" className="w-6 h-6 cursor-pointer hover:opacity-80" />
              <span>WhatsApp To Order</span>
            </a>
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
