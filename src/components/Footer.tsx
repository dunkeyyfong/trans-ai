import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-12">
                <div>
                <h3 className="text-lg font-semibold">About Us</h3>
                <ul className="mt-4 space-y-2 text-gray-400">
                    <li>Our Story</li>
                    <li>Technology</li>
                    <li>Careers</li>
                </ul>
                </div>
                <div>
                <h3 className="text-lg font-semibold">Help</h3>
                <ul className="mt-4 space-y-2 text-gray-400">
                    <li>FAQs</li>
                    <li>Support</li>
                    <li>Privacy Policy</li>
                </ul>
                </div>
                <div>
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <ul className="mt-4 space-y-2 text-gray-400">
                    <li>Email: .com</li>
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

export default Footer
