import { useState } from "react";
import { Drawer, Button } from "antd";
import {  FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      {/* Button mở Drawer */}
      <Button
        type="primary"
        icon={<FiMenu size={20} />}
        className="fixed top-4 left-4 z-50 bg-gray-900 border-none text-white hover:bg-gray-800"
        onClick={() => setVisible(true)}
      />

      {/* Drawer */}
      <Drawer
        title="Admin Panel"
        placement="left"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        width={250}
        className="bg-gray-900 text-white"
      >
        {/* Menu Items */}
        <nav className="space-y-4">
         

          {/* Logout */}
          <button
            className="flex items-center gap-4 p-3 bg-red-600 rounded-lg hover:bg-red-500 w-full transition-all duration-200 ease-in-out mt-10 shadow-md"
            onClick={handleLogout}
          >
            <FiLogOut size={24} />
            <span>Logout</span>
          </button>
        </nav>
      </Drawer>
    </>
  );
};

export default AdminSidebar;
