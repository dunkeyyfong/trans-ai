import React from "react";
import {
  FileTextOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  AudioOutlined,
  FileOutlined,
} from "@ant-design/icons";

const FileIcon: React.FC<{ fileName: string }> = ({ fileName }) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return <FilePdfOutlined className="text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <FileImageOutlined className="text-blue-500" />;
    case "mp3":
    case "wav":
      return <AudioOutlined className="text-green-500" />;
    case "txt":
    case "srt":
    case "doc":
    case "docx":
      return <FileTextOutlined className="text-gray-600" />;
    default:
      return <FileOutlined className="text-gray-500" />;
  }
};

export default FileIcon;
