import { useState, useEffect } from "react";

interface Chat {
    title: string;
    id: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useChatHistory = ( userId:number, accessToken:string ) => {
    const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  
    // Hàm để fetch chat history
    const fetchChatHistory = async () => {
        if (!userId || !accessToken) return;
      try {
        const response = await fetch(`${API_URL}/api/get-history?id=${encodeURIComponent(userId)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch history data");
        }
  
        const data = await response.json();
        setChatHistory(data.data);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };
  
    // Fetch lần đầu khi mount
    useEffect(() => {
      fetchChatHistory();
      console.log("user id ",userId)
    }, [userId, accessToken]); // Chỉ chạy một lần khi mount
  
    return { chatHistory, setChatHistory, fetchChatHistory }; // Trả về cả state và hàm cập nhật
  };