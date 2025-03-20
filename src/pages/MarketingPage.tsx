import { useState, useEffect, useRef } from "react";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Contact from "./Contact";
import Carousel from "../components/Carousel";

const MarketingPage = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "This tool saves me hours of work. AI-generated transcripts are super accurate!",
      author: "Jane Doe, Content Creator",
    },
    {
      quote:
        "Multi-language support is a game-changer for my international audience.",
      author: "Carlos M., Podcaster",
    },
    {
      quote:
        "The summarization feature is amazing! Helps me quickly understand video content.",
      author: "David S., Researcher",
    },
    {
      quote:
        "I've tried many tools, but this one stands out for its accuracy and speed!",
      author: "Emily R., Journalist",
    },
    {
      quote: "Perfect for research and content creation. Highly recommend!",
      author: "Mark T., Video Editor",
    },
    {
      quote: "This tool is an absolute must-have for any content creator.",
      author: "Sophia L., Social Media Manager",
    },
    {
      quote:
        "The best transcription tool I've ever used. Saves so much time and effort!",
      author: "Alex B., Freelancer",
    },
    {
      quote:
        "It's amazing how well this tool captures different accents and dialects.",
      author: "Mika S., Language Teacher",
    },
    {
      quote:
        "I love how easy it is to use. The AI does all the hard work for me!",
      author: "John D., Content Strategist",
    },
    {
      quote:
        "As a journalist, accuracy is everything. This tool delivers every time.",
      author: "Rachel K., Investigative Reporter",
    },
    {
      quote:
        "A must-have tool for researchers and educators who deal with long-form content.",
      author: "Dr. Helen W., University Professor",
    },
    {
      quote:
        "The ability to export transcripts into multiple formats is super useful!",
      author: "Oliver M., Marketing Specialist",
    },
    {
      quote:
        "Game changer for accessibility! Now my content is more inclusive than ever.",
      author: "Lisa T., Disability Advocate",
    },
    {
      quote:
        "Fast, reliable, and incredibly easy to integrate into my workflow.",
      author: "Daniel P., Video Producer",
    },
    {
      quote:
        "I use this tool daily to create subtitles for my videos. Love it!",
      author: "Samantha L., YouTuber",
    },
    {
      quote:
        "It’s rare to find an AI tool that gets everything right. This one does!",
      author: "Chris J., Entrepreneur",
    },
    {
      quote: "Great for generating captions for TikTok and Instagram Reels!",
      author: "Bella R., Social Media Influencer",
    },
    {
      quote:
        "My team and I use this tool all the time for translating and localizing content.",
      author: "Leo G., Localization Expert",
    },
    {
      quote:
        "Super accurate and fast! Helped me transcribe hours of interviews.",
      author: "Kevin N., Podcast Host",
    },
    {
      quote:
        "Definitely worth the investment. The AI is leagues ahead of other tools.",
      author: "Angela C., Film Director",
    },
  ];

  const contactRef = useRef<HTMLDivElement>(null);
  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
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
    setIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3)
    );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen text-white">
        {/* NavBar */}
        <Navbar />
        {/* Background Image Fullscreen */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-maketing.jpg')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Main Content */}
        <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 md:p-20 text-center w-full max-w-6xl mx-auto  min-h-screen z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 md:mb-8 drop-shadow-lg">
            Revolutionizing Video Transcription with AI
          </h1>
          <p className="text-lg md:text-2xl max-w-4xl text-gray-200">
            Our platform provides seamless YouTube video transcription and AI-powered text processing for enhanced accessibility and insights.
          </p>

         {/* Buttons */}
          <div className="mt-8 md:mt-10 flex flex-col md:flex-row justify-center items-center gap-6 w-full">
            <a
              onClick={scrollToHowItWorks}
              className="px-10 py-4 md:px-12 md:py-5 bg-white text-black text-xl font-bold rounded-lg shadow-xl transition-transform transform hover:scale-105 w-56 md:w-64 text-center"
            >
              Learn More
            </a>
            <a
              onClick={scrollToContact}
              className="px-10 py-4 md:px-12 md:py-5 bg-gray-800 text-white text-xl font-bold rounded-lg shadow-xl hover:bg-gray-700 transition-transform transform hover:scale-105 cursor-pointer w-56 md:w-64 text-center"
            >
              Contact Us
            </a>
          </div>

        </main>

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-white text-black animate-fade-in">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-10">Key Features</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
              {[
                { icon: "🎙️", title: "AI Transcription", desc: "Accurate speech-to-text conversion using AI." },
                { icon: "📊", title: "Smart Summarization", desc: "Get concise and meaningful summaries." },
                { icon: "🌎", title: "Multi-Language Support", desc: "Transcribe and translate with ease." },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 md:p-8 shadow-lg rounded-lg bg-gray-100 transition-transform transform md:hover:scale-105 md:hover:shadow-xl active:scale-95 active:shadow-lg text-xl flex flex-col items-center text-center"
                >
                  <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-20 bg-gray-900 text-white animate-slide-up">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-10">How It Works</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
              {[
                { icon: "🔗", step: "Step 1: Upload a Link", desc: "Paste your YouTube video link or upload a local file." },
                { icon: "⚡", step: "Step 2: AI Processing", desc: "Our AI extracts and processes the video transcript." },
                { icon: "📄", step: "Step 3: Get Your Transcript", desc: "Download the transcript or use AI-powered summarization." },
              ].map((step, index) => (
                <div
                  key={index}
                  className="p-6 md:p-8 shadow-lg rounded-lg bg-gray-800 transition-transform transform md:hover:scale-105 md:hover:shadow-xl active:scale-95 active:shadow-lg text-xl flex flex-col items-center text-center"
                >
                  <div className="text-4xl md:text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2">{step.step}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Testimonials Section - Mobile Optimized */}
        <section className="py-16 px-4 sm:px-6 bg-white text-black animate-fade-in">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10">
              What Our Users Say
            </h2>

            <div className="relative w-full overflow-hidden">
              <Carousel testimonials={testimonials} index={index} />
            </div>
          </div>
        </section>


        {/* Call to Action */}
        <section
          id="call-to-action"
          className="py-16 px-6 sm:py-20 text-white text-center animate-slide-up bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-marketing.jpg')" }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
            Get Started Today
          </h2>
          <p className="text-lg sm:text-2xl max-w-md sm:max-w-3xl mx-auto mb-6 sm:mb-8">
            Join thousands of users who are transforming video transcription with AI. 
            Sign up now and try it for free!
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-4 sm:px-10 sm:py-5 bg-white text-black text-lg font-semibold rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-transform transform hover:scale-105 text-center"
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
