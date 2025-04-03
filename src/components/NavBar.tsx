import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <nav className="bg-black bg-opacity-70 backdrop-blur-md fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 shadow-lg shadow-black/50 z-[999]">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center rounded-lg">
          <span className="text-white font-bold text-sm">言葉</span>
        </div>
        <span className="text-white text-xl font-semibold">KotobaAI</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 text-white text-lg">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
      </div>

      {/* CTA buttons - Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/login" className="px-6 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          Log In
        </Link>
        <Link to="/register" className="px-6 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-white text-2xl cursor-pointer" onClick={showDrawer}>
        <MenuOutlined />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col space-y-4 text-lg">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/about" onClick={onClose}>About Us</Link>
          <Link to="/login" onClick={onClose}>Log In</Link>
          <Link to="/register" onClick={onClose}>Sign Up</Link>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
