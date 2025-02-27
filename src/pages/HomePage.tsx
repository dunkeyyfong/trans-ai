import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import LanguageSelector from "../components/LanguageSelector";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

interface Chat {
  title: string;
  id: number;
  url?: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [selectedChatTitle, setSelectedChatTitle] = useState<string>("YouTube Subtitle Processor");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [searchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");


  // 🔹 Load chat history từ localStorage khi component mount
  useEffect(() => {
    setIsPageLoading(true);

    setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
  
  }, [])

  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats));
    }
  }, []);

  // 🔹 Lưu chat history vào localStorage mỗi khi chatHistory thay đổi
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // 🔹 Cập nhật tiêu đề chat từ URL
  useEffect(() => {
    const chatId = searchParams.get("id");
    if (chatId && chatHistory.length > 0) {
      const chat = chatHistory.find((c) => c.id.toString() === chatId);
      if (chat) setSelectedChatTitle(chat.title);
    }
  }, [searchParams, chatHistory]);

  // 🔹 Tạo cuộc trò chuyện mới
  const handleNewChat = (newChatTitle: string) => {
    const newId = Date.now(); // ID duy nhất dựa trên timestamp
    const newChat: Chat = { title: newChatTitle, id: newId };

    setChatHistory((prev) => [newChat, ...prev]);
    navigate(`/home?id=${newId}`);
  };

  // 🔹 Khôi phục cuộc trò chuyện cũ
  const handleRestoreChat = (chatId: number) => {
    setIsPageLoading(true);
  
    setTimeout(() => {
      navigate(`/home?id=${chatId}`);
      setIsPageLoading(false);
    }, 1500);
  };

  // 🔹 Xác thực link YouTube
  const isValidYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]+/;
    return regex.test(url);
  };

  // 🔹 Lấy tiêu đề video YouTube
  const fetchYouTubeTitle = async (url: string) => {
    try {
      const response = await fetch(`https://noembed.com/embed?url=${url}`);
      const data = await response.json();
      if (data.title) {
        setSelectedChatTitle(data.title);

        setChatHistory((prev) => {
          const exists = prev.some((chat) => chat.url === url);
          return exists ? prev : [{ title: data.title, id: Date.now(), url }, ...prev];
        });
      } else {
        setSelectedChatTitle("Unknown Video");
      }
    } catch (error) {
      console.error("Error fetching video title:", error);
      setSelectedChatTitle("Error Fetching Title");
    }
  };

  // 🔹 Xử lý nhập URL video
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLink(url);

    if (isValidYouTubeUrl(url)) {
      fetchYouTubeTitle(url);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleProcess = () => {
    if (!link || !isValidYouTubeUrl(link)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
    
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);

    const urlObj = new URL(link);
    const params = new URLSearchParams(urlObj.search);
    const videoId = params.get("v") || urlObj.pathname.split("/").pop();
  
    if (!videoId) {
      alert("Invalid YouTube URL.");
      return;
    }
  
    const data = {
      video_id: videoId,
      lang: selectedLanguage,
    };
  
    console.log(data);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  // 🔹 Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Xóa token đăng nhập (nếu có)
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };
  


  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar (Hiển thị trên laptop) */}
        <aside className="hidden md:block w-64 bg-white border-r">
          <SideBar chatHistory={chatHistory} onNewChat={handleNewChat} onRestoreChat={handleRestoreChat} onLogout={handleLogout} />
        </aside>

        {/* Drawer (Hiển thị trên mobile) */}
        <Drawer
          title={
            <div className="w-full flex justify-between items-center">
              <span className="font-semibold text-2xl">Chat History</span>
              <Button
                type="text"
                onClick={() => setDrawerOpen(false)}
                icon={<span className="text-xl">✖</span>}
                className="text-gray-200 hover:text-gray-800"
              />
            </div>
          }
          placement="left"
          closable={false}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          width={280}
          className="md:hidden"
        >
          <SideBar chatHistory={chatHistory} onNewChat={handleNewChat} onRestoreChat={handleRestoreChat} onLogout={handleLogout} />
        </Drawer>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center p-6 relative">
          {/* Màn hình loading cho phần main */}
          {isPageLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-50">
              <h1 className="text-3xl font-semibold text-gray-800 animate-pulse">Loading...</h1>
            </div>
          )}

          {/* Header */}
          <div className="w-full flex items-center justify-center">
            {/* Nút mở Drawer trên mobile */}
            <div>
              <Button
                icon={<MenuOutlined style={{ fontSize: "15px" }} />}
                className="md:hidden p-4 mr-4 border border-gray-300 rounded-lg shadow-sm"
                onClick={() => setDrawerOpen(true)}
              />
            </div>

            {/* Tiêu đề video */}
            <div className="w-full max-w-6xl bg-white py-4 px-6 shadow-md rounded-md text-center">
              <h1 className="text-2xl font-semibold text-gray-800">{selectedChatTitle}</h1>
            </div>
          </div>

          {/* Nhập URL video */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full max-w-6xl mt-6">
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
            <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <LanguageSelector onLanguageChange={handleLanguageChange} />
            </div>
          </div>

          {/* Nút xử lý */}
          <button
            onClick={handleProcess}
            className={`mt-4 px-6 py-3 rounded-md shadow-md font-medium transition duration-300 ${
              isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Start Processing"}
          </button>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
