import { useState } from "react";
import { FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col items-start p-4 fixed left-0 top-0 transition-all duration-300 ease-in-out ${
        isHovered ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isHovered ? "w-48 opacity-100 scale-100" : "w-0 opacity-0 scale-90"
        }`}
      >
        <h2 className="text-xl font-bold ml-4">Admin Panel</h2>
      </div>

      {/* Menu Items */}
      <nav className="mt-6 space-y-4 w-full">
        {/* User Management */}
        <button className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 w-full transition-all duration-200 ease-in-out">
          <FiUsers size={24} />
          <span
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isHovered ? "w-48 opacity-100 scale-100" : "w-0 opacity-0 scale-90"
            }`}
          >
            User Management
          </span>
        </button>

        {/* Settings */}
        <button className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 w-full transition-all duration-200 ease-in-out">
          <FiSettings size={24} />
          <span
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isHovered ? "w-48 opacity-100 scale-100" : "w-0 opacity-0 scale-90"
            }`}
          >
            Settings
          </span>
        </button>

        {/* Logout */}
        <button
          className="flex items-center gap-4 p-3 bg-red-600 rounded-lg hover:bg-red-500 w-full transition-all duration-200 ease-in-out mt-10 shadow-md"
          onClick={handleLogout}
        >
          <FiLogOut size={24} />
          <span
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isHovered ? "w-48 opacity-100 scale-100" : "w-0 opacity-0 scale-90"
            }`}
          >
            Logout
          </span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
