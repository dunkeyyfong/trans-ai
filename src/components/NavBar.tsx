import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-70 backdrop-blur-md fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 shadow-lg shadow-black/50 z-[999]">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center rounded-lg">
          <span className="text-white font-bold text-sm">言葉</span>
        </div>
        <span className="text-white text-xl font-semibold">KotobaAI</span>
      </Link>

      {/* Navigation */}
      <div className="hidden md:flex space-x-8 text-white text-lg">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
      </div>

      {/* CTA + Icons */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="px-6 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          Log In
        </Link>
        <Link to="/register" className="px-6 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
