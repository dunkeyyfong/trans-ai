import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import LanguageSelector from "../components/LanguageSelector";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("YouTube Subtitle Processor");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<{ title: string; url: string }[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const isValidYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+$/;
    return regex.test(url);
  };

  const fetchYouTubeTitle = async (url: string) => {
    try {
      const response = await fetch(`https://noembed.com/embed?url=${url}`);
      const data = await response.json();
      if (data.title) {
        setVideoTitle(data.title);
        // Lưu vào lịch sử chat nếu chưa tồn tại
        setChatHistory((prev) => {
          const exists = prev.some((chat) => chat.url === url);
          return exists ? prev : [{ title: data.title, url }, ...prev];
        });
      } else {
        setVideoTitle("Unknown Video");
      }
    } catch (error) {
      console.error("Error fetching video title:", error);
      setVideoTitle("Error Fetching Title");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLink(url);

    if (isValidYouTubeUrl(url)) {
      fetchYouTubeTitle(url);
    }
  };

  const handleRestoreChat = (url: string) => {
    setLink(url);
    fetchYouTubeTitle(url); // Cập nhật tiêu đề khi nhấn vào lịch sử
  };

  const handleProcess = () => {
    if (!link || !isValidYouTubeUrl(link)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
    setIsProcessing(true);

    // Xử lý dữ liệu thực tế
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r">
          {/* Lịch sử chat */}
          <SideBar chatHistory={chatHistory} onRestoreChat={handleRestoreChat} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center p-6">
          {/* Header */}
          <div className="w-full max-w-6xl bg-white py-4 px-6 shadow-md rounded-md">
            <h1 className="text-2xl font-semibold text-gray-800">{videoTitle}</h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full max-w-6xl mt-6">
            {/* Video URL Input */}
            <div className="w-full md:w-3/4">
              <label className="block text-gray-700 font-medium mb-2">Video URL</label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={link}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Language Selector */}
            <div className="w-full md:w-1/4 mt-4 md:mt-0">
              <LanguageSelector />
            </div>
          </div>

          {/* Processing Button */}
          <button
            onClick={handleProcess}
            className={`mt-4 px-6 py-3 rounded-md shadow-md font-medium transition duration-300 ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Start Processing"}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
