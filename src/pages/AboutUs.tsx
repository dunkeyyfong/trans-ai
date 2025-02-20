import React from 'react'

const AboutUs = () => {
return (
    <section className="bg-gray-100 text-black min-h-screen">
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

        {/* Header Image */}
        <div className="relative w-full h-[400px]">
        <img
            src="/public/about.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
        />
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <h1 className="text-6xl font-bold text-left mb-10">ABOUT US</h1>

        {/* Introduction */}
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
                Revolutionizing Video Transcription with AI
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
                Our platform provides seamless YouTube video transcription and
                AI-powered text processing, making video content more accessible
                and insightful. Whether you need accurate subtitles, multilingual
                support, or automated summarization, our AI technology is here to
                transform how you interact with video content.
            </p>
            </div>
            <div className="lg:w-1/2">
            <img
                src="/public/about-img.png"
                alt="AI Transcription"
                className="w-full rounded-lg shadow-lg"
            />
            </div>
        </div>

        {/* History Section */}
        <div className="mt-20 flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
                <img
                    src="/public/Our-Journey.png"
                    alt="Our History"
                    className="w-full rounded-lg shadow-lg"
                />
            </div>
            <div className="lg:w-1/2">
                <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                    We started with a vision to bridge the gap between video content
                    and textual information. Since our inception, we've integrated
                    cutting-edge AI models to deliver real-time, highly accurate
                    transcriptions that empower creators, businesses, and educators
                    worldwide.
                </p>
            </div>
        </div>

            {/* Our Promise */}
            <div className="mt-20 text-center">
                <h2 className="text-4xl font-bold">Our Promise</h2>
                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
                We are committed to providing the most advanced and user-friendly
                AI-driven transcription service. Whether you're a content creator,
                researcher, or business professional, we ensure that every
                transcript is accurate, accessible, and tailored to your needs.
                </p>
            </div>
        </div>

        {/* Footer */}
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
                    <li>Email: support@yourplatform.com</li>
                    <li>Phone: +1 234 567 890</li>
                </ul>
                </div>
            </div>
            <div className="text-center text-gray-400 mt-8">
                &copy; 2025 Kotoba AI. All rights reserved.
            </div>
        </footer>
    </section>
    )
}

export default AboutUs