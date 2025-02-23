import React from "react";
import { FaBars, FaPlus } from "react-icons/fa";

interface SideBarProps {
  chatHistory: { title: string; url: string }[];
  onRestoreChat: (url: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ chatHistory, onRestoreChat }) => {
  return (
    <div className="w-64 bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <FaBars className="text-gray-600 cursor-pointer text-xl" />
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md mb-4">
          <FaPlus /> New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-gray-500 text-sm mb-2">Recent Chats</h2>
        <ul className="space-y-2">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => (
              <li
                key={index}
                className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition"
                onClick={() => onRestoreChat(chat.url)}
              >
                {chat.title}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent chats</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
