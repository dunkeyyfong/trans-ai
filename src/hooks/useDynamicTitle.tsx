import { useState, useEffect } from "react";
    
export const useDynamicTitle = () => {
  const [title, setTitle] = useState("YouTube Subtitle Processor");

  useEffect(() => {
    document.title = title;
  }, [title]);

  return { title, setTitle };
}
    




