import React from "react";
import farmLogo from "../assets/logo12.png";
import googleplay from "../assets/googleplay.webp";
import facebookIcon from "../assets/facebook1.png";
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";
import youtubeIcon from "../assets/youtube.png";
import linkedinIcon from "../assets/linkedin.png";
import whatsapp from "../assets/whatsapp.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-300">
      {/* Main Container */}
      <div className="container mx-auto px-4 flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-center md:items-start">
        {/* Left Section: Logo and App Download */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/">
            <img
              src={farmLogo}
              alt="Farm E-Store Logo"
              className="w-20 md:w-24 mb-4"
            />
          </Link>
          <div className="flex flex-col items-center md:items-start">
            <img
              src={googleplay}
              alt="Download on Google Play"
              className="w-28 md:w-32 mb-4"
            />
            <p className="text-gray-600 font-semibold mb-2 text-center md:text-left">
              Social Links
            </p>
            <div className="flex space-x-3 justify-center">
              <img
                src={facebookIcon}
                alt="Facebook"
                className="w-6 h-6 cursor-pointer hover:opacity-80"
              />
              <img
                src={twitterIcon}
                alt="Twitter"
                className="w-6 h-6 cursor-pointer hover:opacity-80"
              />
              <img
                src={instagramIcon}
                alt="Instagram"
                className="w-6 h-6 cursor-pointer hover:opacity-80"
              />
              <img
                src={youtubeIcon}
                alt="YouTube"
                className="w-6 h-6 cursor-pointer hover:opacity-80"
              />
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                className="w-6 h-6 cursor-pointer hover:opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Middle Section: Links and Address */}
        <div className="flex flex-col text-center md:text-left space-y-6 md:space-y-0 md:flex-row md:space-x-12 text-gray-700">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              About us
            </a>
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              Contact Us
            </a>
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              Return & Refund Policy
            </a>
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              Shipping/Delivery Policy
            </a>
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              Careers
            </a>
            <a href="#" className="hover:text-green-600 text-sm md:text-base">
              FAQ
            </a>
          </div>
          <div className="md:border-l border-gray-300 md:pl-4">
            <p className="font-semibold text-sm md:text-base">
              Registered office:
            </p>
            <p className="text-sm md:text-base">Farm E-Store Private Limited</p>
            <p className="text-sm md:text-base">6/237-G-8-K Devalam Street</p>
            <p className="text-sm md:text-base">
              Extn.Ward No.6, Madanapalle-517325
            </p>
            <p className="text-sm md:text-base">
              Annamayya District, Andhra Pradesh.
            </p>
            <p className="text-sm md:text-base">
              CIN: U74999AP2022PTC121551
            </p>
          </div>
        </div>

        {/* Right Section: Call and WhatsApp */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="bg-orange-400 text-white py-2 px-4 rounded-md text-center text-sm md:text-lg font-semibold">
            Call To Order<br />9533752744
          </div>
          <button className="flex items-center space-x-2">
            <a
              href="https://wa.me/9533752744"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-600 text-sm md:text-lg font-semibold"
            >
              <img
                src={whatsapp}
                alt="WhatsApp"
                className="w-6 h-6 cursor-pointer hover:opacity-80"
              />
              <span>WhatsApp To Order</span>
            </a>
          </button>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-green-600 text-white py-3 mt-6 text-center text-xs md:text-sm">
        Copyright © 2024 Farm E-Store Private Limited
      </div>
    </footer>
  );
};

export default Footer;
