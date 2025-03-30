import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import LanguageSelector from "../components/LanguageSelector";
import { Breadcrumb, Button, Drawer, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useDynamicTitle } from "../hooks/useDynamicTitle";
import { fetchYouTubeTitle, processVideo } from "../utils/api-client";
import { useChatHistory } from "../hooks/useChatHistory";

interface User {
  accessToken: string;
  id: number;
  email: string;
  role: string;
  verifyToken: string;
  name?: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const accessToken = useRef<string>("")
  const currentUserId = useRef<number>(0);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const { title, setTitle } = useDynamicTitle();
  const [activeTab, setActiveTab] = useState('progress')
  const [progressOutput, setProgressOutput] = useState('')
  const [resultTranscript, setResultTranscript] = useState('')
  
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        accessToken.current = user.accessToken;
        currentUserId.current = user.id;
        setUserEmail(user.email);
        setUserName(user.name || "")
        console.log(user)
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    } else {
      navigate('/login')
    }
  }, []);
  
  const { chatHistory, setChatHistory, fetchChatHistory } = useChatHistory(currentUserId.current, accessToken.current);
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Load chat history từ localStorage khi component mount
  useEffect(() => {
    setIsPageLoading(true);

    setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
  
  }, [])

    // Tự động tắt Drawer nếu đang mở trên desktop
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setDrawerOpen(false);
        }
      };
    
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  // 🔹 Tạo cuộc trò chuyện mới
  const handleNewChat = async (newChatTitle: string) => {
    setLink("");
    setTitle(newChatTitle);
  
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

      const data = await response.json()

      const newChat = { title: newChatTitle, id: data.id, url: "" };
  
      setChatHistory((prev) => {
        const updatedChats = [newChat, ...prev];
        return updatedChats;
      });
  
      navigate(`/home?id=${newChat.id}`);
    } catch (error) {
      console.error("Error saving chat to database:", error);
    }
  };
  

  // xóa chat
  const handleDeleteChat = async (chatId: number) => {
    try {
      const response = await fetch(`${API_URL}/api/delete-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken.current}`
        },
        body: JSON.stringify({
          idHistory: chatId,
          id: currentUserId.current,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save chat history");
      }

      const data = await response.json()

      message.success(data)

      await fetchChatHistory()
      
      await navigate('/home')

      await window.location.reload()

    } catch (error) {
      console.log(error)
    }
  };
  

  // 🔹 Khôi phục cuộc trò chuyện cũ
  const handleRestoreChat = async (chatId: number) => {
    navigate(`/home?id=${chatId}`);

    const response = await fetch(`${API_URL}/api/get-data-history?id=${encodeURIComponent(currentUserId.current)}&idHistory=${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken.current}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch history data");
    }

    const data = await response.json();
    
    setTitle(data.data.title)
    setLink(data.data.message[0]?.url || '');
    setResultTranscript(data.data.message[0]?.content || '');
    setActiveTab('result');
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

        const response = await fetch(`${API_URL}/api/create-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken.current}`
          },
          body: JSON.stringify({ name: titleVideo, id: currentUserId.current }),
        })
  
        const data = await response.json()

        const newChat = { title: titleVideo, id: data.id, url: "" };
  
        setChatHistory((prev) => {
          const updatedChats = [newChat, ...prev];
          return updatedChats;
        });
  
        navigate(`/home?id=${newChat.id}`);

        setTitle(titleVideo)
      }
    }
  };

  const handleDownloadSrt = () => {
    // Nếu không có transcript, dùng chuỗi rỗng
    const content = resultTranscript || "";
  
    // Tạo và tải file
    const blob = new Blob([content], { type: 'text/srt' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title || 'transcript'}.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleProcess = async () => {
    
    if (!link || !isValidYouTubeUrl(link)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
    
    setIsProcessing(true);

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

    if (typeof videoId === 'string') {

      setResultTranscript('')
      setIsProcessing(true)

      await fetch(`${API_URL}/api/update-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken.current}`
        },
        body: JSON.stringify({
          id: currentUserId.current,
          idHistory: searchParams.get("id"),
          url: link,
          content: ""
        })
      });

      const transcriptInJapanese = await processVideo(videoId, (message: string) => {
        setProgressOutput(prev => prev + message)
      }, accessToken.current, API_URL)

      if (transcriptInJapanese) {
        setResultTranscript(transcriptInJapanese);
  
        setActiveTab('result');

        await fetch(`${API_URL}/api/update-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken.current}`
          },
          body: JSON.stringify({
            id: currentUserId.current,
            idHistory: searchParams.get("id"),
            url: link,
            content: resultTranscript
          })
        });
      }
      setIsProcessing(false)
    } else {
      alert('Invalid URL')
    }
  };

  // 🔹 Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user")
    navigate("/login");
  };


  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar (Hiển thị trên laptop) */}
        <aside className="hidden md:block w-64 bg-white border-r">
          <SideBar chatHistory={chatHistory} onNewChat={handleNewChat} onRestoreChat={handleRestoreChat} onDeleteChat={handleDeleteChat} onLogout={handleLogout} userEmail={userEmail} userName={userName}/>
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
          <SideBar chatHistory={chatHistory} onNewChat={handleNewChat} onRestoreChat={handleRestoreChat} onDeleteChat={handleDeleteChat} onLogout={handleLogout} userEmail={userEmail} userName={userName}/>
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
                    onClick={() => {
                      navigate('/home')
                      window.location.reload()
                    }} 
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

          <div className="w-full max-w-6xl mt-6">
            <div className="flex border-b border-gray-300 mb-4">
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-all ${
                  activeTab === 'progress'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-indigo-500'
                }`}
              >
                Progress
              </button>
              <button
                onClick={() => setActiveTab('result')}
                className={`ml-4 px-4 py-2 font-medium text-sm border-b-2 transition-all ${
                  activeTab === 'result'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-indigo-500'
                }`}
              >
                Result
              </button>
            </div>

            <div className="bg-white rounded-md shadow-sm p-4 min-h-[200px] max-h-[400px] overflow-auto">
              {activeTab === 'progress' && (
                <pre className="whitespace-pre-wrap text-gray-800 text-base">{progressOutput}</pre>
              )}
              {activeTab === 'result' && (
              <>
                <div className="flex justify-end items-end mb-2">
                  <Button
                    onClick={handleDownloadSrt}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Download SRT
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap text-gray-800 text-base">{resultTranscript}</pre>
              </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
