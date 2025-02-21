import { Button, Dropdown } from "antd";
import { useState } from "react";
import type { MenuProps } from "antd";
import { FaBars, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { LogoutOutlined } from "@ant-design/icons";

interface SideBarProps {
  userName: string;
}

const items: MenuProps["items"] = [
  // {
  //   key: "1",
  //   label: (
  //     <button className="w-full text-left" onClick={() => alert("Logged out!")}>
  //       <LogoutOutlined className="mr-3 text-red-500"/> <span className="text-red-500">Log Out</span>
  //     </button>
  //   ),
  // },
  // {
  //   key: "2",
  //   label: (
  //     <a
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       href="https://www.aliyun.com"
  //     >
  //       2nd menu item
  //     </a>
  //   ),
  // },
  {
    key: "1",
    label: (
      <button className="w-full text-left" onClick={() => alert("Logged out!")}>
        <LogoutOutlined className="mr-3 text-red-500"/> <span className="text-red-500">Log Out</span>
      </button>
    ),
  },
];

const SideBar = ({ userName }: SideBarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="w-64 bg-white h-screen flex flex-col">
      {/* Header với tìm kiếm và chỉnh sửa */}
      <div className="p-4 flex items-center justify-between border-b">
        <FaBars className="text-gray-600 cursor-pointer text-xl" />
        <div className="flex gap-2">
          {/* Icon Search mở modal */}
          <div
            className="p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            <FaSearch className="text-gray-600 text-xl" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 flex-1">
        <button className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md mb-4">
          <FaPlus /> New Chat
        </button>

        <h2 className="text-gray-500 text-sm mb-2">Today</h2>
        <ul className="space-y-2">
          <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">
            React Router cấu hình
          </li>
          <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">
            Prisma Client Binary Error
          </li>
          <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">
            Gọi API xác thực email
          </li>
        </ul>
      </div>

      {/* Projects */}
      <div className="p-4 border-t">
        <h2 className="text-gray-500 text-sm mb-2">User</h2>
        <Dropdown menu={{ items }} placement="topLeft">
          <p className="m-3">{userName}</p>
        </Dropdown>
      </div>

      {/* Search Modal (Bên trong Sidebar) */}
      {isSearchOpen && (
        <div className="absolute left-64 top-0 w-96 bg-white shadow-lg rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full p-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-2 p-2 rounded-full hover:bg-gray-200"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>

          {/* Danh sách gợi ý */}
          <div className="mt-4">
            <h2 className="text-gray-500 text-sm mb-2">Recent Searches</h2>
            <ul className="space-y-2">
              <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                🗨️ New chat
              </li>
              <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                🤖 Tạo game cờ vua AI
              </li>
              <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                🏠 Trang chủ hoàn chỉnh
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
