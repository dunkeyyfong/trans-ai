import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import LanguageSelector from "../components/LanguageSelector";
import { Breadcrumb, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useDynamicTitle } from "../hooks/useDynamicTitle";
import { fetchYouTubeTitle } from "../utils/getTitleYoutube";

interface Chat {
  title: string;
  id: number;
  url?: string;
}

interface User {
  accessToken: string;
  id: number;
  email: string;
  role: string;
  verifyToken: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const accessToken = useRef<string>("")
  const currentUserId = useRef<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [searchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const { title, setTitle } = useDynamicTitle();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        accessToken.current = user.accessToken;
        currentUserId.current = user.id;
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);
  
  const API_URL = import.meta.env.VITE_API_URL;

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


  // 🔹 Cập nhật tiêu đề chat từ URL
  useEffect(() => {
    const fetchChatData = async () => {
      if (chatHistory.length === 0) return;
  
      const chatId = searchParams.get("id");
      if (chatId) {
        const chat = chatHistory.find((c) => c.id.toString() === chatId);
        if (chat) {
          setTitle(chat.title);
          setLink(chat.url || "");
        }
      }
    };
  
    fetchChatData();
  }, [searchParams, chatHistory]);
  
  // 🔹 Tạo cuộc trò chuyện mới
  const handleNewChat = async (newChatTitle: string) => {
    setLink("");
    setTitle(newChatTitle);

  
    const newChat: Chat = { title: newChatTitle, id: Date.now(), url: "" };
  
    try {
      const response = await fetch(`${API_URL}/api/create-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken.current}`
        },
        body: JSON.stringify({
          name: newChatTitle,
          id: currentUserId.current,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save chat history");
      }
  
      setChatHistory((prev) => {
        const updatedChats = [newChat, ...prev];
        localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
        return updatedChats;
      });
  
      navigate(`/home?id=${newChat.id}`);
    } catch (error) {
      console.error("Error saving chat to database:", error);
    }
  };
  

  // xóa chat
  const handleDeleteChat = (chatId: number) => {
    setIsPageLoading(true);

    setTimeout(() => {
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));

      navigate("/home");

      setIsPageLoading(false);
    }, 1500);
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

  // 🔹 Xử lý nhập URL video
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLink(url);
  
    if (isValidYouTubeUrl(url)) {
  
      const chatId = searchParams.get("id");
  
      if (chatId) {
        // 🔹 Nếu đã có chat hiện tại, chỉ cập nhật URL của nó, không thay đổi tiêu đề chat
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id.toString() === chatId ? { ...chat, url } : chat
          )
        );
      } else {

        const titleVideo = await fetchYouTubeTitle(url);

        // 🔹 Nếu chưa có chat, tạo một chat mới với tên mặc định "New Chat"
        const newChat: Chat = { title: titleVideo, id: Date.now(), url };

        await fetch(`${API_URL}/api/create-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken.current}`
          },
          body: JSON.stringify({ name: titleVideo, id: currentUserId.current }),
        })
  
        setChatHistory((prev) => {
          const updatedChats = [newChat, ...prev];
          localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
          return updatedChats;
        });
  
        navigate(`/home?id=${newChat.id}`);
      }
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleProcess = async () => {
    console.log("accessToken",accessToken);
    
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

    try {
      const response = await fetch(`${API_URL}/api/download`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken.current}`
        },
        body: JSON.stringify({ videoId }),
      });

      const data = await response.json()
      console.log(data)

    } catch (error) {
      console.log(error);
      
    }

    setTimeout(() => setIsProcessing(false), 2000);
  };

  // 🔹 Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    navigate("/login");
  };
  


  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar (Hiển thị trên laptop) */}
        <aside className="hidden md:block w-64 bg-white border-r">
          <SideBar chatHistory={chatHistory} onNewChat={handleNewChat} onRestoreChat={handleRestoreChat} onDeleteChat={handleDeleteChat} onLogout={handleLogout} />
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
          <SideBar chatHistory={chatHistory} onNewChat={handleNewChat} onRestoreChat={handleRestoreChat} onDeleteChat={handleDeleteChat} onLogout={handleLogout} />
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

         <div className="w-full max-w-6xl">
            {searchParams.get("id") && (
              <Breadcrumb className="mb-4 md:block hidden">
                <Breadcrumb.Item>
                  <span 
                    onClick={() => window.location.reload()} 
                    className="cursor-pointer hover:text-gray-600"
                  >
                    Home
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
              </Breadcrumb>
            )}

            {/* Tiêu đề video */}
            <div className="w-full max-w-6xl bg-white py-4 px-6 shadow-md rounded-md text-center">
              <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
            </div>
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
