import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'

const AboutUs = () => {
  return (
    <section className="bg-gray-100 text-black min-h-screen mt-[6vh]">
      {/* Navbar */}
      <Navbar />

      {/* Header Image */}
      <div className="relative w-full h-[400px]">
        <img src="/about.png" alt="Hero Background" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">Welcome to Kotoba!</h1>

        {/* Introduction */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Translate YouTube Videos with Ease</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Kotoba is your go-to platform for translating subtitles from YouTube videos into
              multiple languages. Using advanced technology, we seamlessly convert speech into text,
              helping you understand video content quickly and accurately.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="/ABOUT_US.jpg" 
              alt="AI Transcription" 
              className="w-full rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            />
          </div>
        </div>

        {/* History Section */}
        <div className="mt-20 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <img 
              src="/public/about-img.png" 
              alt="Our History" 
              className="w-full rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-semibold mb-4">Our Journey</h1>
            <p className="text-lg mb-4">
              At <span className="font-semibold">Kotoba</span>, we believe that language should never
              be a barrier to understanding the world. Our journey began with a simple yet powerful
              idea: <span className="italic">making video content accessible to everyone, regardless
              of language.</span>
            </p>
            <p className="text-lg mb-4">
              As avid learners and explorers, we often struggled with videos in languages we didn’t
              understand. Existing tools were either too complex, inaccurate, or lacked seamless
              integration. That’s when we set out to build <span className="font-semibold">Kotoba</span>—
              a platform designed to <span className="italic">effortlessly translate and transcribe
              YouTube videos</span> with precision and ease.
            </p>
            <p className="text-lg mt-6">
              From a passion project to a tool that empowers thousands, <span className="font-semibold">
              Kotoba</span> continues to evolve, ensuring that <span className="italic">knowledge and
              entertainment remain borderless.</span> 🚀
            </p>
            <p className="text-lg mt-4 font-semibold text-blue-500">
              Join us on this journey and explore the world, one translation at a time. 🌍✨
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-10">What Our Users Say</h2>
          <div className="flex flex-col lg:flex-row gap-6 justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <p className="text-lg italic">
                "Kotoba has changed how I learn new languages! It's incredibly accurate."
              </p>
              <span className="block mt-4 font-semibold">- Emily, Language Enthusiast</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <p className="text-lg italic">
                "A must-have for content creators and educators! Amazing tool."
              </p>
              <span className="block mt-4 font-semibold">- Mark, YouTuber</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  )
}

export default AboutUs
