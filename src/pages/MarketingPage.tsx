import { useState, useEffect, useRef } from "react";
import React  from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Contact from "./Contact";


const MarketingPage = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    { quote: "This tool saves me hours of work. AI-generated transcripts are super accurate!", author: "Jane Doe, Content Creator" },
    { quote: "Multi-language support is a game-changer for my international audience.", author: "Carlos M., Podcaster" },
    { quote: "The summarization feature is amazing! Helps me quickly understand video content.", author: "David S., Researcher" },
    { quote: "I've tried many tools, but this one stands out for its accuracy and speed!", author: "Emily R., Journalist" },
    { quote: "Perfect for research and content creation. Highly recommend!", author: "Mark T., Video Editor" },
    { quote: "This tool is an absolute must-have for any content creator.", author: "Sophia L., Social Media Manager" },
    { quote: "The best transcription tool I've ever used. Saves so much time and effort!", author: "Alex B., Freelancer" },
    { quote: "It's amazing how well this tool captures different accents and dialects.", author: "Mika S., Language Teacher" },
    { quote: "I love how easy it is to use. The AI does all the hard work for me!", author: "John D., Content Strategist" },
    { quote: "As a journalist, accuracy is everything. This tool delivers every time.", author: "Rachel K., Investigative Reporter" },
    { quote: "A must-have tool for researchers and educators who deal with long-form content.", author: "Dr. Helen W., University Professor" },
    { quote: "The ability to export transcripts into multiple formats is super useful!", author: "Oliver M., Marketing Specialist" },
    { quote: "Game changer for accessibility! Now my content is more inclusive than ever.", author: "Lisa T., Disability Advocate" },
    { quote: "Fast, reliable, and incredibly easy to integrate into my workflow.", author: "Daniel P., Video Producer" },
    { quote: "I use this tool daily to create subtitles for my videos. Love it!", author: "Samantha L., YouTuber" },
    { quote: "It’s rare to find an AI tool that gets everything right. This one does!", author: "Chris J., Entrepreneur" },
    { quote: "Great for generating captions for TikTok and Instagram Reels!", author: "Bella R., Social Media Influencer" },
    { quote: "My team and I use this tool all the time for translating and localizing content.", author: "Leo G., Localization Expert" },
    { quote: "Super accurate and fast! Helped me transcribe hours of interviews.", author: "Kevin N., Podcast Host" },
    { quote: "Definitely worth the investment. The AI is leagues ahead of other tools.", author: "Angela C., Film Director" }
  ];

  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
  };

  return (
    <>
      <div className="flex flex-col min-h-screen text-white">
        {/* NavBar */}
        <Navbar/>
        {/* Background Image Fullscreen */}
        <div className="fixed inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/bg-maketing.jpg')" }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Main Content */}
        <main className="relative flex flex-1 flex-col items-center justify-center p-16 text-center w-full max-w-6xl mx-auto min-h-screen z-10">
          <h1 className="text-7xl font-extrabold text-white mb-8 drop-shadow-lg">
            Revolutionizing Video Transcription with AI
          </h1>
          <p className="text-2xl max-w-4xl text-gray-200">
            Our platform provides seamless YouTube video transcription and AI-powered text processing for enhanced accessibility and insights.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex space-x-8">
            <a
              href="/home"
              className="px-10 py-5 bg-white text-black text-lg font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              Learn More
            </a>
            <a
              onClick={scrollToContact}
              className="px-10 py-5 bg-gray-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105 cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-20 bg-white text-black animate-fade-in">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-10">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "🎙️ AI Transcription", desc: "Accurate speech-to-text conversion using state-of-the-art AI models." },
                { title: "📊 Smart Summarization", desc: "Get concise and meaningful summaries of your video content." },
                { title: "🌎 Multi-Language Support", desc: "Transcribe and translate into multiple languages effortlessly." },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-8 shadow-lg rounded-lg bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-xl text-xl"
                >
                  <h3 className="text-3xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-900 text-white animate-slide-up">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "🔗 Step 1: Upload a Link", desc: "Paste your YouTube video link or upload a local file." },
                { step: "⚡ Step 2: AI Processing", desc: "Our AI extracts and processes the video transcript." },
                { step: "📄 Step 3: Get Your Transcript", desc: "Download the transcript or use AI-powered summarization." },
              ].map((step, index) => (
                <div
                  key={index}
                  className="p-8 shadow-lg rounded-lg bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-xl text-xl"
                >
                  <h3 className="text-3xl font-semibold mb-4">{step.step}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white text-black animate-fade-in">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-10">What Our Users Say</h2>

            {/* Slider Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {/* Chia testimonials thành các nhóm 3 phần tử */}
                {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                  <div key={i} className="flex p-4 min-w-full justify-center gap-14">
                    {testimonials.slice(i * 3, i * 3 + 3).map((testimonial, j) => (
                      <div
                        key={j}
                        className="w-1/3 p-8 shadow-lg rounded-lg bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-xl text-xl"
                      >
                        <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                        <p className="mt-4 font-semibold">{testimonial.author}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Dấu chấm điều hướng */}
            <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? "bg-gray-800" : "bg-gray-400"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-indigo-700 text-white text-center animate-slide-up">
          <h2 className="text-5xl font-bold mb-6">Get Started Today</h2>
          <p className="text-2xl max-w-3xl mx-auto mb-8">
            Join thousands of users who are transforming video transcription with AI. Sign up now and try it for free!
          </p>
          <a
            href="/register"
            className="px-10 py-5 bg-white text-black text-lg font-semibold rounded-xl shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
          >
            Sign Up Now
          </a>
        </section>

        <div ref={contactRef} className="z-10">
          <Contact />
        </div>


        {/* Footer */}
        <div className="bg-white z-10">
          <Footer />
        </div>
      </div>

      {/* Custom animations using Tailwind + CSS */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fast-blink {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fast-blink {
          animation: fast-blink 0.5s infinite ease-in-out;
        }
        .hover\\:animate-none:hover {
          animation: none !important;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-in-out forwards;
        }
      `}</style>
    </>
  );
};

export default MarketingPage;
