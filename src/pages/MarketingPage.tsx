import React from 'react';
import Footer from "../components/Footer";

const MarketingPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white">
        <header className="bg-black bg-opacity-50 p-6 text-center text-3xl font-bold shadow-lg">
          YouTube Transcription & Trans AI
        </header>

        <main className="flex flex-1 flex-col items-center justify-center p-6">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Revolutionizing Video Transcription with AI
          </h1>
          <p className="text-lg max-w-2xl text-center text-gray-200">
            Our platform provides seamless YouTube video transcription and AI-powered text processing for enhanced accessibility and insights.
          </p>

          <div className="mt-6 flex space-x-4">
            <a href="/home" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md shadow-md hover:bg-yellow-500">
              Learn More
            </a>
            <a href="/contact" className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-700">
              Contact Us
            </a>
          </div>
        </main>
        <footer className='bg-white'>
          <Footer/>
        </footer>
      </div>
    </>
  );
};

export default MarketingPage;
