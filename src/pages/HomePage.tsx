import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
// import Navbar from "../components/NavBar";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("result");
  const [subtitles, setSubtitles] = useState<{ id: number; time: string; text: string }[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  // Dữ liệu phụ đề (mô phỏng)
  const sampleSubtitles = [
    { id: 1, time: "00:00:01,000 --> 00:00:06,000", text: "a" },
    { id: 2, time: "00:00:06,000 --> 00:00:12,000", text: "b" },
    { id: 3, time: "00:00:12,000 --> 00:00:22,000", text: "c" },
    { id: 4, time: "00:00:22,000 --> 00:00:30,000", text: "d" }
  ];

  const handleProcess = () => {
    if (!link) {
      alert("Please enter a YouTube URL.");
      return;
    }
    setIsProcessing(true);

    // Mô phỏng quá trình xử lý
    setTimeout(() => {
      setSubtitles(sampleSubtitles);
      setIsProcessing(false);
      setActiveTab("result"); 
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main Layout */}
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white">
          <SideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            YouTube Transcription & Trans AI
          </h1>

          {/* Input Box for YouTube Link */}
          <div className="w-full max-w-2xl">
            <label className="text-gray-700 font-medium">Video URL</label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
          </div>

          {/* Start Processing Button */}
          <button
            onClick={handleProcess}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Start processing"}
          </button>

          {/* Tab Navigation */}
          <div className="mt-6 border-b flex space-x-6 text-gray-600 font-medium">
            <button
              className={`pb-2 border-b-2 transition ${
                activeTab === "progress" ? "border-indigo-600 text-indigo-600" : "border-transparent hover:border-indigo-400"
              }`}
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </button>
            <button
              className={`pb-2 border-b-2 transition ${
                activeTab === "result" ? "border-indigo-600 text-indigo-600" : "border-transparent hover:border-indigo-400"
              }`}
              onClick={() => setActiveTab("result")}
            >
              Result
            </button>
          </div>

          {/* Display content based on selected tab */}
          <div className="w-full max-w-2xl mt-4 bg-white p-4 rounded-lg shadow-lg">
            {isProcessing ? (
              <p className="text-center text-gray-600">Processing video...</p>
            ) : activeTab === "result" ? (
              subtitles.map((subtitle) => (
                <div key={subtitle.id} className="mb-4">
                  <p className="text-gray-500 text-sm">{subtitle.id}</p>
                  <p className="text-gray-600 text-sm font-mono">{subtitle.time}</p>
                  <p className="text-gray-800 text-lg">{subtitle.text}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Processing progress will appear here...</p>
            )}
          </div>

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
