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

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    const chatId = searchParams.get("id");
    if (chatId && chatHistory.length > 0) {
      const chat = chatHistory.find((c) => c.id.toString() === chatId);
      if (chat) setSelectedChatTitle(chat.title);
    }
  }, [searchParams, chatHistory]);

  const handleNewChat = (newChatTitle: string) => {
    const lastId = parseInt(localStorage.getItem("lastChatId") || "0", 10);
    const newId = lastId + 1;

    const newChat: Chat = {
      title: newChatTitle,
      id: newId,
    };

    const updatedChats = [newChat, ...chatHistory];
    setChatHistory(updatedChats);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
    localStorage.setItem("lastChatId", newId.toString());

    navigate(`/home?id=${newId}`);
  };

  const handleRestoreChat = (chatId: number) => {
    navigate(`/home?id=${chatId}`);
  };

  const isValidYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]+/;
    return regex.test(url);
  };

  const fetchYouTubeTitle = async (url: string) => {
    try {
      const response = await fetch(`https://noembed.com/embed?url=${url}`);
      const data = await response.json();
      if (data.title) {
        setVideoTitle(data.title);
        setChatHistory((prev) => {
          const exists = prev.some((chat) => chat.url === url);
          return exists ? prev : [{ title: data.title, id: prev.length + 1, url }, ...prev];
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

  const handleProcess = () => {
    if (!link || !isValidYouTubeUrl(link)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 bg-gray-100">
        <aside className="w-64 bg-white border-r">
          <SideBar chatHistory={chatHistory} onNewChat={handleNewChat} onRestoreChat={handleRestoreChat} />
        </aside>

        <main className="flex-1 flex flex-col items-center p-6">
          <div className="w-full max-w-6xl bg-white py-4 px-6 shadow-md rounded-md">
            <h1 className="text-2xl font-semibold text-gray-800">{selectedChatTitle}</h1>
          </div>

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

          <button
            onClick={handleProcess}
            className={`mt-4 px-6 py-3 rounded-md shadow-md font-medium transition duration-300 ${
              isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Start Processing"}
          </button>

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
