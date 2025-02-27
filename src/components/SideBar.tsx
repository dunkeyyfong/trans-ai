import React, { useState } from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Modal, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Chat {
  title: string;
  id: number;
}

interface SideBarProps {
  chatHistory: Chat[];
  onNewChat: (newChatTitle: string) => void;
  onRestoreChat: (chatId: number) => void;
  onLogout: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ chatHistory, onNewChat, onRestoreChat, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // Mở Modal Tạo Chat
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChatTitle("");
  };

  // Xử lý tạo chat
  const handleCreateChat = () => {
    if (!chatTitle.trim()) return;
    onNewChat(chatTitle);
    handleCloseModal();
  };

  const handleChatClick = (chatId: number) => {
    onRestoreChat(chatId); // Gọi hàm từ HomePage để xử lý loading
  // Xử lý mở Modal xác nhận Logout
  }

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // Xác nhận Logout
  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem("token"); // Xóa token đăng nhập (nếu có)
    onLogout(); // Gọi hàm onLogout từ prop
    navigate("/login"); // Chuyển hướng về trang Login
  };

  return (
    <>
      {/* Sidebar trên desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white h-screen">
        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleOpenModal}
            className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md"
          >
            <FaPlus /> New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-gray-500 text-sm mb-2">Today</h2>
          <ul className="space-y-2">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat) => (
                <li
                  key={chat.id}
                  className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition flex items-center gap-2"
                  onClick={() => handleChatClick(chat.id)}
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

      {/* Sidebar trên mobile */}
      <div className="md:hidden bg-white w-full flex flex-col">
        <button
          onClick={handleOpenModal}
          className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md mb-4"
        >
          <FaPlus /> New Chat
        </button>

      {/* Chat History */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-gray-500 text-sm mb-2">Today</h2>
        <ul className="space-y-2">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <li
                key={chat.id}
                className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition flex items-center gap-2"
                onClick={() => handleChatClick(chat.id)}
              >
                {chat.title}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent chats</p>
          )}
        </ul>

      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleOpenLogoutModal} // Mở modal xác nhận logout
          className="w-full flex items-center gap-2 p-2 bg-red-500 text-white rounded-md"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Modal Tạo Chat */}
      <Modal
        title="Create New Chat"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreateChat}>
            OK
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter chat name"
          value={chatTitle}
          onChange={(e) => setChatTitle(e.target.value)}
        />
      </Modal>

      {/* Modal Xác Nhận Logout */}
      <Modal
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsLogoutModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="logout" type="primary" danger onClick={handleConfirmLogout}>
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
      </div>
    </>
  );
};

export default SideBar;
