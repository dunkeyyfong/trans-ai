const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-[#F9FAFB] text-black">

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-10 rounded-lg shadow-lg">
            <div className="flex flex-col justify-start">
                <h2 className="text-4xl font-bold">We're here to answer your questions!</h2>
                <p className="mt-4 text-gray-600">Have questions or feedback? We’re here to help. Send us a message, and we’ll respond within 24 hours.</p>
            
                <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-600 text-2xl">✉️</span>
                        <div>
                            <p className="text-gray-600">Email</p>
                            <p className="text-lg font-semibold">support@kotoba.tokyo</p>
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
            
            <div className="p-6">
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
