import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

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
        {/* About Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center py-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <img src="/about-img.png" alt="AI Translation" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl font-semibold">Your Partner in AI-Powered Translation</h2>
            <p className="text-gray-700 text-lg mt-4">
              We bridge language barriers with cutting-edge AI translation technology, delivering fast, accurate, and culturally nuanced solutions.
            </p>
            <div className="mt-6">
              <p className="font-semibold">✔ Expertise</p>
              <p className="text-gray-600">Our team includes AI specialists and linguists with years of experience.</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">✔ Instant Support</p>
              <p className="text-gray-600">Get seamless translations and expert guidance whenever you need it.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center py-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold">Revolutionizing Translation with AI</h2>
            <p className="text-gray-700 text-lg mt-4">
              Our AI-driven platform empowers businesses and individuals to communicate globally with precision and ease.
            </p>
            <div className="mt-6">
              <p className="font-semibold">✔ Advanced Technology</p>
              <p className="text-gray-600">Leveraging state-of-the-art AI for superior translation quality.</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">✔ Global Reach</p>
              <p className="text-gray-600">Support for over 100 languages, tailored to your needs.</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">✔ Real-Time Solutions</p>
              <p className="text-gray-600">Instant translations to keep your conversations flowing without delay.</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="/ABOUT_US.jpg" alt="Translation Technology" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-20 bg-blue-950 text-white py-16 rounded-lg">
          <h3 className="text-2xl font-semibold text-center mb-4 text-white">Why choose us</h3>
          <h2 className="text-4xl font-bold text-center mb-10">Unlock Global Communication with AI Translation</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
            {[
              { title: "AI Translation", description: "Fast and accurate translations powered by advanced AI algorithms." },
              { title: "Localization", description: "Adapt your content culturally for any region or audience." },
              { title: "Multilingual Support", description: "Seamless communication across 100+ languages." },
              { title: "Custom Solutions", description: "Tailored AI translation services for your unique needs." }
            ].map((service, index) => (
              <div key={index} className="bg-blue-900 p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
                <p className="text-blue-200">{service.description}</p>
                <a href="#" className="mt-4 inline-block text-blue-400 hover:text-blue-300 transition">
                  → LEARN MORE
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default AboutUs;