import React, { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { Modal, Input, Button } from "antd";

interface Chat {
  title: string;
  id: number;
}


interface SideBarProps {
  chatHistory: Chat[];
  onNewChat: (newChatTitle: string) => void;
  onRestoreChat: (chatId: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({ chatHistory, onNewChat, onRestoreChat }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState("");

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

  return (
    <div className="w-64 bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <FaBars className="text-gray-600 cursor-pointer text-xl" />
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={handleOpenModal}
          className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md mb-4"
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
                className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition"
                onClick={() => onRestoreChat(chat.id)}
              >
                {chat.title}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent chats</p>
          )}
        </ul>
      </div>

      {/* Ant Design Modal */}
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
    </div>
  );
};

export default SideBar;
