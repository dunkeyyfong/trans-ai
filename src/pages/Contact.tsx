import React from 'react';

const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-[#F9FAFB] text-black">
       {/* Header */}
       <header className="bg-black bg-opacity-70 backdrop-blur-md fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 shadow-lg shadow-black/50 z-[999]">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center rounded-lg">
                    <span className="text-white font-bold text-sm">言葉</span>
                </div>
                <span className="text-white text-xl font-semibold">KotobaAI</span>
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8 text-white text-lg">
                <a href="/" className="hover:text-gray-300 transition">Home</a>
                <a href="/about" className="hover:text-gray-300 transition">About us</a>
                <a href="/contact" className="hover:text-gray-300 transition">Contact</a>
            </nav>

            {/* CTA + Icons */}
            <div className="flex items-center space-x-4">
                <a href="/login" className="px-6 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
                    Log In
                </a>
                <a href="/register" className="px-6 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
                    Sign Up
                </a>
            </div>
        </header>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-10 rounded-lg shadow-lg">
            <div className="flex flex-col justify-start">
                <h2 className="text-4xl font-bold">We're here to answer your questions!</h2>
                <p className="mt-4 text-gray-600">Have questions or feedback? We’re here to help. Send us a message, and we’ll respond within 24 hours.</p>
            
                <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-2xl">✉️</span>
                        <div>
                            <p className="text-gray-600">Email</p>
                            <p className="text-lg font-semibold">support@example.com</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-2xl">📞</span>
                        <div>
                            <p className="text-gray-600">Phone</p>
                            <p className="text-lg font-semibold">+1 234 567 890</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-2xl">📍</span>
                        <div>
                            <p className="text-gray-600">Address</p>
                            <p className="text-lg font-semibold">123 Ha Noi, Viet Nam, VN 1000</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-2xl">🕒</span>
                        <div>
                            <p className="text-gray-600">Working Hours</p>
                            <p className="text-lg font-semibold">Mon - Fri: 9 AM - 6 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold">Contact</h3>
                <p className="text-gray-600 mb-4">You can reach us anytime</p>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="text" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-md" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="text" placeholder="Phone #" className="w-full p-3 border border-gray-300 rounded-md" />
                    <textarea placeholder="Your Message" className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none"></textarea>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 font-semibold rounded-md hover:bg-blue-700 transition">Submit</button>
                </form>
            </div>
        </div>
    </section>
  );
};

export default Contact;
