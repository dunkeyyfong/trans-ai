import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";

interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lastLogin: string;
  statusMessage?: string;
  accountType: string; // 🔥 Replaced verifyToken with accountType
}

const dummyUsers: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    name: "Admin User",
    role: "Admin",
    createdAt: "2025-02-10",
    updatedAt: "2025-02-15",
    isActive: true,
    lastLogin: "2025-02-15T10:30:00Z",
    statusMessage: "Managing the system",
    accountType: "Premium",
  },
  {
    id: 2,
    username: "user1",
    email: "user1@example.com",
    name: "User One",
    role: "User",
    createdAt: "2025-02-12",
    updatedAt: "2025-02-16",
    isActive: false,
    lastLogin: "2025-02-14T15:45:00Z",
    statusMessage: "On vacation",
    accountType: "Standard",
  },
  {
    id: 3,
    username: "user2",
    email: "user2@example.com",
    name: "User Two",
    role: "User",
    createdAt: "2025-02-14",
    updatedAt: "2025-02-16",
    isActive: true,
    lastLogin: "2025-02-16T08:20:00Z",
    statusMessage: "Working on a project",
    accountType: "Guest",
  },
];

const AdminPage = () => {
  const [users] = useState<User[]>(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-12 flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold">User Management</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-3 pl-12 border rounded-lg text-lg bg-white text-gray-900"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* User Table */}
        <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl p-8">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-left">
                <th className="p-4">ID</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created At</th>
                <th className="p-4">Updated At</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">Status Message</th>
                <th className="p-4">Account Type</th> {/* 🔥 Changed column name */}
                <th className="p-4 text-center">Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50`}>
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.name || "N/A"}</td>
                  <td className="p-4">
                    <span className={`px-4 py-1 text-white rounded-full ${user.role === "Admin" ? "bg-red-500" : "bg-green-500"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(user.lastLogin).toLocaleString()}</td>
                  <td className="p-4">{user.statusMessage || "No status"}</td>
                  <td className="p-4">{user.accountType}</td> {/* 🔥 Updated field */}
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-white ${user.isActive ? "bg-green-500" : "bg-red-500"}`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
