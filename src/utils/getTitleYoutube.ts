

export const fetchYouTubeTitle = async (url: string) => {
    try {
      const response = await fetch(`https://noembed.com/embed?url=${url}`);
      const data = await response.json();
      if (data.title) {
        return data.title;
      } else {
        return "Unknown Video";
      }
    } catch (error) {
      console.error("Error fetching video title:", error);
      return "Error Fetching Title";
    }
  };