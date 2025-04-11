import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import LanguageSelector from "../components/LanguageSelector";
import { Breadcrumb, Button, Drawer, notification } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  // PaperClipOutlined,
} from "@ant-design/icons";
import { useDynamicTitle } from "../hooks/useDynamicTitle";
import { fetchYouTubeTitle, processVideo } from "../utils/api-client";
import { useChatHistory } from "../hooks/useChatHistory";
// import FileIcon from "../components/FileIcon";
import ReactMarkdown from "react-markdown";

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
  const accessToken = useRef<string>("");
  const currentUserId = useRef<number>(0);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const { title, setTitle } = useDynamicTitle();
  const [activeTab, setActiveTab] = useState("progress");
  const [progressOutput, setProgressOutput] = useState("");
  const [resultTranscript, setResultTranscript] = useState("");
  // const [showAttachModal, setShowAttachModal] = useState(false);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        accessToken.current = user.accessToken;
        currentUserId.current = user.id;
        setUserEmail(user.email);
        setUserName(user.name || "");
        console.log(user);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    } else {
      navigate("/login");
    }
  }, []);

  const { chatHistory, setChatHistory, fetchChatHistory } = useChatHistory(
    currentUserId.current,
    accessToken.current
  );
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Load chat history từ localStorage khi component mount
  useEffect(() => {
    setIsPageLoading(true);

    setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
  }, []);

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
          Authorization: `Bearer ${accessToken.current}`,
        },
        body: JSON.stringify({
          name: newChatTitle,
          id: currentUserId.current,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save chat history");
      }

      const data = await response.json();

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
          Authorization: `Bearer ${accessToken.current}`,
        },
        body: JSON.stringify({
          idHistory: chatId,
          id: currentUserId.current,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save chat history");
      }

      const data = await response.json();

      notification.success({
        message: "Delete success ",
        description:
          typeof data === "string" ? data : data.message || "Success",
      });

      setChatHistory([]);
      localStorage.removeItem("chatHistory");
      await fetchChatHistory()
      navigate("/home", { replace: true });
      setLink("");
      setTitle("YouTube Subtitle Processor");
      setResultTranscript("");
      setActiveTab("progress");
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Khôi phục cuộc trò chuyện cũ
  const handleRestoreChat = async (chatId: number) => {
    navigate(`/home?id=${chatId}`);

    const response = await fetch(
      `${API_URL}/api/get-data-history?id=${encodeURIComponent(
        currentUserId.current
      )}&idHistory=${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.current}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch history data");
    }

    const data = await response.json();

    setTitle(data.data.title);

    const latestMessage = data.data.message?.[data.data.message.length - 1];

    if (latestMessage) {
      setLink(latestMessage.url || "");
      setResultTranscript(latestMessage.message || "");
      setActiveTab("result");
    } else {
      setLink("");
      setResultTranscript("");
      notification.warning({
        message: "No data found",
        description: "This chat does not contain any content yet.",
      });
    }
  };

  // 🔹 Xác thực link YouTube
  const isValidYouTubeUrl = (url: string) => {
    const regex =
      /^(https?:\/\/)?((www|m)\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]+/;
    return regex.test(url);
  };

  // 🔹 Xử lý nhập URL video
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLink(url);
    // setSelectedFile(null);

    if (isValidYouTubeUrl(url)) {
      const chatId = searchParams.get("id");

      if (chatId) {
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
            Authorization: `Bearer ${accessToken.current}`,
          },
          body: JSON.stringify({ name: titleVideo, id: currentUserId.current }),
        });

        const data = await response.json();

        const newChat = { title: titleVideo, id: data.id, url: "" };

        setChatHistory((prev) => {
          const updatedChats = [newChat, ...prev];
          return updatedChats;
        });

        navigate(`/home?id=${newChat.id}`);

        setTitle(titleVideo);
      }
    }
  };

  const handleDownloadSrt = () => {
    // Nếu không có transcript, dùng chuỗi rỗng
    const content = resultTranscript || "";

    // Tạo và tải file
    const blob = new Blob([content], { type: "text/srt" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "transcript"}.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  // const handleFileSelected = (file: File) => {
  //   if (file) {
  //     // Cập nhật URL
  //     const newSearchParams = new URLSearchParams(searchParams);
  //     newSearchParams.set("file", file.name);
  //     navigate(`/home?${newSearchParams.toString()}`, { replace: true });

  //     setSelectedFile(file);
  //     setShowAttachModal(false);
  //   }
  // };

  const handleProcess = async () => {
    if (!link || !isValidYouTubeUrl(link)) {
      notification.warning({
        message: "Invalid URL",
        description: "Please enter a valid YouTube link.",
      });
      return;
    }

    setResultTranscript("");
    setIsProcessingVideo(true);
    setIsSummarizing(false);

    const urlObj = new URL(link);
    const params = new URLSearchParams(urlObj.search);
    const videoId = params.get("v") || urlObj.pathname.split("/").pop();

    if (!videoId) {
      notification.error({
        message: "URL error",
        description: "YouTube links are invalid.",
      });
      return;
    }

    if (typeof videoId === "string") {
      await fetch(`${API_URL}/api/update-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.current}`,
        },
        body: JSON.stringify({
          id: currentUserId.current,
          idHistory: searchParams.get("id"),
          url: link,
          content: "",
        }),
      });

      const transcriptInJapanese = await processVideo(
        videoId,
        (message: string) => {
          setProgressOutput((prev) => prev + message);
        },
        accessToken.current,
        API_URL,
        selectedLanguage
      );

      if (transcriptInJapanese) {
        setResultTranscript(transcriptInJapanese);
        setActiveTab("result");

        await fetch(`${API_URL}/api/update-history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.current}`,
          },
          body: JSON.stringify({
            id: currentUserId.current,
            idHistory: searchParams.get("id"),
            url: link,
            content: transcriptInJapanese,
          }),
        });
      }
      setIsProcessingVideo(false);
    } else {
      notification.error({
        message: "URL error",
        description: "Video pathway is invalid.",
      });
      setIsProcessingVideo(false);
    }
  };

  const handleSummarize = async () => {
    if (isProcessingVideo) return;

    if (!link || !isValidYouTubeUrl(link)) {
      notification.warning({
        message: "Invalid URL",
        description: "Please enter a valid YouTube link.",
      });
      return;
    }

    setResultTranscript("");
    setIsSummarizing(true);
    setIsProcessingVideo(false);

    try {
      const urlObj = new URL(link);
      const params = new URLSearchParams(urlObj.search);
      const videoId = params.get("v") || urlObj.pathname.split("/").pop();

      if (!videoId) {
        notification.error({
          message: "URL error",
          description: "YouTube link is invalid or missing video ID.",
        });
        return;
      }

      const response = await fetch(
        `${API_URL}/api/summary?videoUrl=${videoId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.current}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to summarize content");
      }

      const data = await response.json();
      const summary = data.summary || "";

      setResultTranscript(summary);
      setActiveTab("result");

      if (!summary.trim()) {
        notification.warning({
          message: "Empty Summary",
          description: "The summarized content is empty. Nothing to save.",
        });
        return;
      }

      const historyId = searchParams.get("id");

      if (!historyId) {
        notification.error({
          message: "Missing Chat ID",
          description: "Cannot save summary without a valid chat ID.",
        });
        return;
      }

      await fetch(`${API_URL}/api/update-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.current}`,
        },
        body: JSON.stringify({
          id: currentUserId.current,
          idHistory: historyId,
          url: link,
          content: summary,
        }),
      });
    } catch (error) {
      console.error("Error during summarization:", error);
      notification.error({
        message: "Summary Failed",
        description: "Unable to summarize the video content. Please try again.",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  // 🔹 Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar (Hiển thị trên laptop) */}
        <aside className="hidden md:block w-64 bg-white border-r">
          <SideBar
            chatHistory={chatHistory}
            onNewChat={handleNewChat}
            onRestoreChat={handleRestoreChat}
            onDeleteChat={handleDeleteChat}
            onLogout={handleLogout}
            userEmail={userEmail}
            userName={userName}
          />
        </aside>

        {/* Drawer (Hiển thị trên mobile) */}
        <Drawer
          title={
            <div className="w-full flex justify-between items-center">
              <span className="font-semibold text-2xl">Chat History</span>
              <Button
                type="text"
                onClick={() => setDrawerOpen(false)}
                icon={<CloseOutlined className="text-xl" />}
                className="text-gray-500 hover:text-black"
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
          <SideBar
            chatHistory={chatHistory}
            onNewChat={handleNewChat}
            onRestoreChat={handleRestoreChat}
            onDeleteChat={handleDeleteChat}
            onLogout={handleLogout}
            userEmail={userEmail}
            userName={userName}
          />
        </Drawer>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center p-6 relative">
          {/* Màn hình loading cho phần main */}
          {isPageLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex items-center justify-center z-50">
              <h1 className="text-3xl font-semibold text-gray-800 animate-pulse">
                Loading...
              </h1>
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
                        navigate("/home");
                        window.location.reload();
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
                <h1 className="text-2xl font-semibold text-gray-800">
                  {title}
                </h1>
              </div>
            </div>
          </div>

          {/* Nhập URL video */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full max-w-6xl mt-6">
            <div className="w-full md:w-3/4">
              <label className="block text-gray-700 font-medium mb-2">
                Video URL
              </label>
              <div className="flex flex-wrap items-center gap-2 bg-white rounded-md shadow-md px-3 py-2 border focus-within:ring-2 focus-within:ring-blue-500">
                {/* <button
                  onClick={() => setShowAttachModal(true)}
                  className="text-gray-600 hover:text-blue-600"
                  title="Attach file"
                >
                  <PaperClipOutlined className="text-xl transform rotate-[135deg]" />
                </button> */}

                {/* {selectedFile && (
                  <div className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm font-medium gap-1">
                    <FileIcon fileName={selectedFile.name} />
                    <span className="truncate max-w-[150px]">
                      {selectedFile.name}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                      }}
                      className="ml-1 hover:text-red-500"
                      title="Remove file"
                    >
                      <CloseOutlined className="text-xs" />
                    </button>
                  </div>
                )} */}

                {/* {showAttachModal && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl w-full max-w-md shadow-2xl relative">
                      <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
                        onClick={() => setShowAttachModal(false)}
                        aria-label="Close"
                      >
                        <CloseOutlined />
                      </button>

                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                          Attach File
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Drag and drop or select a file to upload
                        </p>
                      </div>

                      <label
                        htmlFor="file-upload"
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-40 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-all duration-200"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const files = e.dataTransfer.files;
                          if (files.length > 0) {
                            handleFileSelected(files[0]);
                          }
                        }}
                      >
                        <div className="text-center">
                          <p className="font-medium">Drag your file here</p>
                          <p className="text-sm mt-1">or click to select</p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              handleFileSelected(files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                )} */}

                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={link}
                  onChange={handleInputChange}
                  // disabled={!!selectedFile}
                  className="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="w-full md:w-1/4 mt-4 md:mt-0">
              <LanguageSelector onLanguageChange={handleLanguageChange} />
            </div>
          </div>

          {/* Nút xử lý */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleProcess}
              className={`px-6 py-3 rounded-md shadow-md font-medium transition duration-300 ${
                isProcessingVideo || isSummarizing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={isProcessingVideo || isSummarizing}
            >
              {isProcessingVideo ? "Translating..." : "Translate"}
            </button>

            <button
              onClick={handleSummarize}
              className={`px-6 py-3 rounded-md shadow-md font-medium transition duration-300 ${
                isProcessingVideo || isSummarizing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              disabled={isProcessingVideo || isSummarizing}
            >
              {isSummarizing ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {/* Khung xử lý */}
          <div className="w-full max-w-6xl mt-6 ">
            <div className="flex border-b border-gray-300 mb-4 justify-between">
              <div>
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-all ${
                    activeTab === "progress"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-blue-500"
                  }`}
                >
                  Progress
                </button>
                <button
                  onClick={() => setActiveTab("result")}
                  className={`ml-4 px-4 py-2 font-medium text-sm border-b-2 transition-all ${
                    activeTab === "result"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-blue-500"
                  }`}
                >
                  Result
                </button>
              </div>
              <div className="sticky bottom-0 right-0 z-10">
                <Button
                  onClick={handleDownloadSrt}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Download SRT
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm p-4 min-h-[200px] max-h-[400px] overflow-auto relative">
              {activeTab === "progress" && (
                <pre className="whitespace-pre-wrap text-gray-800 text-base">
                  {progressOutput}
                </pre>
              )}
              {activeTab === "result" && (
                <>
                  <div className="whitespace-pre-wrap text-gray-800 text-base pr-24 pb-5">
                    <ReactMarkdown>{resultTranscript}</ReactMarkdown>
                  </div>
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
