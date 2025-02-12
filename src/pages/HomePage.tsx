import React from "react";
import { FaSearch } from "react-icons/fa";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">What can I help with?</h1>

        {/* Input Box */}
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Message ChatGPT"
            className="w-full p-4 pl-10 pr-16 border rounded-full shadow-md focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <button className="absolute right-4 top-2 bg-black text-white p-2 rounded-full">
            ▶
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
