import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-12">
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-white">Our Story</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">Technology</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Help</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
            <a 
                href="https://thuvienphapluat.vn/page/viewcontentleft.aspx?key=86&utm_source=chatgpt.com" 
                className="hover:text-white" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                FAQs
              </a>
            </li>
            <li>
            <a 
                href="https://thuvienphapluat.vn/page/viewcontentleft.aspx?key=86&utm_source=chatgpt.com" 
                className="hover:text-white" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Support
              </a>
            </li>
            <li>
              <a 
                href="https://thuvienphapluat.vn/page/viewcontentleft.aspx?key=86&utm_source=chatgpt.com" 
                className="hover:text-white" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>Email: contact@kotobaai.com</li>
            <li>Phone: +1 234 567 890</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-8">
        &copy; 2025 Kotoba AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
