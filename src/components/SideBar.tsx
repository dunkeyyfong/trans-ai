import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Modal, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from '@ant-design/icons';

interface Chat {
  title: string;
  id: number;
}

interface SideBarProps {
  chatHistory: Chat[];
  onNewChat: (newChatTitle: string) => void;
  onRestoreChat: (chatId: number) => void;
  onDeleteChat: (chatId: number) => void;
  onLogout: () => void;
  userEmail: string;
  userName?: string;
}

const SideBar: React.FC<SideBarProps> = ({ chatHistory, onNewChat, onRestoreChat, onDeleteChat, onLogout, userEmail, userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  const [deleteChatId, setDeleteChatId] = useState<number | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChatTitle("");
  };

  const handleCreateChat = () => {
    if (!chatTitle.trim()) return;
    onNewChat(chatTitle);
    handleCloseModal();
  };

  const handleOpenDeleteModal = (chatId: number) => {
    setDeleteChatId(chatId);
  };

  const handleConfirmDeleteChat = () => {
    if (deleteChatId !== null) {
      onDeleteChat(deleteChatId);
      setDeleteChatId(null);
    }
  };

  const handleChatClick = (chatId: number) => {
    onRestoreChat(chatId);
  };

  const handleOpenLogoutModal = () => {
    localStorage.removeItem("user");
    onLogout();
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar trên desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white h-screen relative">
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
                  className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition flex items-center justify-between"
                >
                  <span
                    onClick={() => handleChatClick(chat.id)}
                    className="flex-1 cursor-pointer truncate overflow-hidden whitespace-nowrap max-w-[200px]"
                    title={chat.title}
                  >
                    {chat.title}
                  </span>
                  <FaTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer flex-shrink-0 ml-2"
                    onClick={() => handleOpenDeleteModal(chat.id)}
                  />
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent chats</p>
            )}
          </ul>
        </div>


        {/* User Info & Dropdown */}
        <div className="p-4 relative">
          <div
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all"
          >
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold uppercase flex-shrink-0">
              {userEmail?.charAt(0)}
            </div>

            <span className="text-sm font-medium text-gray-800 truncate max-w-[160px]">
              {userEmail}
            </span>
          </div>

          {isUserMenuOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <div
              className="relative w-[400px] bg-white text-black rounded-2xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setIsUserMenuOpen(false)}
                className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
              />

              <h1 className="text-lg font-semibold">Tài khoản của bạn</h1>

              {/* Avatar + Name + Email + Edit */}
              <div className="flex items-center gap-4 my-4">
                <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold uppercase">
                  {userEmail?.charAt(0)}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {userName || "Người dùng"}
                    </h3>
                    <p className="text-sm text-gray-600">{userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Log out*/}
              <div className="flex justify-end border-gray-300">
                <button
                  onClick={handleOpenLogoutModal}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-600 hover:text-white transition"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Sidebar trên mobile */}
      <div className="md:hidden bg-white w-full h-screen flex flex-col">
        {/* New Chat Button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleOpenModal}
            className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md"
          >
            <FaPlus /> New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="px-4 flex-1 overflow-y-auto">
          <h2 className="text-gray-500 text-sm mb-2">Today</h2>
          <ul className="space-y-2">
            {chatHistory.length > 0 ? (
              chatHistory.map((chat) => (
                <li
                  key={chat.id}
                  className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition flex items-center justify-between"
                >
                  <span
                    onClick={() => handleChatClick(chat.id)}
                    className="flex-1 cursor-pointer truncate overflow-hidden whitespace-nowrap max-w-[200px]"
                    title={chat.title}
                  >
                    {chat.title}
                  </span>
                  <FaTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer flex-shrink-0 ml-2"
                    onClick={() => handleOpenDeleteModal(chat.id)}
                  />
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent chats</p>
            )}
          </ul>
        </div>

        <div
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
          <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold uppercase flex-shrink-0">
            {userEmail?.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
            {userEmail}
          </span>
        </div>

        {/* User dropdown menu (Logout) */}
        {isUserMenuOpen && (
          <div className="px-4 py-2">
            <button
              onClick={handleOpenLogoutModal}
              className="w-full flex items-center gap-2 p-2 bg-red-500 text-white rounded-md justify-center"
            >
              Logout
            </button>
          </div>
        )}
      </div>

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

      <Modal
        title="Confirm Delete"
        open={deleteChatId !== null}
        onCancel={() => setDeleteChatId(null)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteChatId(null)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleConfirmDeleteChat}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this chat?</p>
      </Modal>

    </>
  );
};

export default SideBar;
