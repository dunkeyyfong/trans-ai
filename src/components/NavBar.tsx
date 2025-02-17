import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets//imgs/logo_trans-ai.png";

const Navbar = () => {
  return (
    <nav className="p-4 shadow-md border flex justify-between items-center">
      <Link to="/home" className="text-xl font-bold text-emerald-600">
      <img src={Logo} alt="Logo_Trans-Ai" className="h-8" />
      </Link>
      <ul className="flex-grow flex justify-center space-x-6 text-gray-800 font-medium">
        <li>
          <Link to="/home" className="hover:text-gray-600 transition duration-300">
          Home
          </Link>
        </li>
        <li>
          <Link to="/" className="hover:text-gray-600 transition duration-300">
          Marketing
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-600 transition duration-300">
          About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-600 transition duration-300">
          Contact
          </Link>
        </li>
      </ul>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-100 transition duration-300"
        >
          Log in
        </Link>
        <Link
          to="/register"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition duration-300"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;