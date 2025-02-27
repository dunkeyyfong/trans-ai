import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import LanguageSelector from "../components/LanguageSelector";

interface Chat {
  title: string;
  id: number;
  url?: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("YouTube Subtitle Processor");
  const [selectedChatTitle, setSelectedChatTitle] = useState<string>("YouTube Subtitle Processor");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [searchParams] = useSearchParams();

  // 🔹 Load chat history từ localStorage khi component mount
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
    navigate(`/home?id=${chatId}`);
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
        setVideoTitle(data.title);

        setChatHistory((prev) => {
          const exists = prev.some((chat) => chat.url === url);
          return exists ? prev : [{ title: data.title, id: Date.now(), url }, ...prev];
        });
      } else {
        setVideoTitle("Unknown Video");
      }
    } catch (error) {
      console.error("Error fetching video title:", error);
      setVideoTitle("Error Fetching Title");
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

  // 🔹 Xử lý quá trình xử lý phụ đề
  const handleProcess = () => {
    if (!link || !isValidYouTubeUrl(link)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  // 🔹 Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Xóa token đăng nhập (nếu có)
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r">
          <SideBar 
            chatHistory={chatHistory} 
            onNewChat={handleNewChat} 
            onRestoreChat={handleRestoreChat} 
            onLogout={handleLogout} // ✅ Thêm prop này
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center p-6">
          <div className="w-full max-w-6xl bg-white py-4 px-6 shadow-md rounded-md">
            <h1 className="text-2xl font-semibold text-gray-800">{selectedChatTitle}</h1>
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
              <LanguageSelector />
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
