import React from 'react'
import { FaBars, FaPlus} from "react-icons/fa";

const SideBar = () => {
  return (
    <div>
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b">
          <h1 className="text-lg font-semibold">ChatGPT</h1>
          <FaBars className="text-gray-600 cursor-pointer" />
        </div>

        {/* Navigation */}
        <div className="p-4 flex-1">
          <button className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md mb-4">
            <FaPlus /> New Chat
          </button>

          <h2 className="text-gray-500 text-sm mb-2">Today</h2>
          <ul className="space-y-2">
            <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">React Router cấu hình</li>
            <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">Prisma Client Binary Error</li>
            <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">Gọi API xác thực email</li>
          </ul>
        </div>

        {/* Projects */}
        <div className="p-4 border-t">
          <h2 className="text-gray-500 text-sm mb-2">Projects</h2>
          <ul>
            <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">Strands</li>
          </ul>
        </div>
      </div>
  )
}

export default SideBar
