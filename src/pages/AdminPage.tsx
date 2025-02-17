import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button, Dropdown, MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons"
import AdminSidebar from "../components/AdminSidebar";

interface User {
  id: number;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

const AdminPage = () => {

  const [users, setUsers] = useState([

  ])

  useEffect(() => {
    try {
      const fetchDataUser = async () => {
        const response = await fetch("http://localhost:8085/api/get-all-user")

        const result = await response.json()

        setUsers(result.data);
      }

      fetchDataUser()
    } catch (e) {
      console.log(e)
    }
  },[]);

  // const [searchTerm, setSearchTerm] = useState("");

  // // const filteredUsers = users.filter((user : User) =>
  // //   user.username.toLowerCase().includes(searchTerm.toLowerCase())
  // // );

  const getMenuItems = (user: User): MenuProps["items"] => [

    {
      key: "2",
      label: <a href={`/edit-user/${user.id}`}>Change Password</a>,
    },
    {
      key: "3",
      label: <a href={`/delete-user/${user.id}`} style={{ color: "red" }}>Delete User</a>,
    },
  ];

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
              // onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created At</th>
                <th className="p-4">Updated At</th>
                <th className="p-4 text-center">Active</th>
                <th className="p-4 text-center">Actions</th> {/* New Column */}
              </tr>
            </thead>
            <tbody>
              {users.map((user : User, index) => (
                <tr key={user.id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50`}>
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name || "N/A"}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-4 py-1 text-white rounded-full ${user.role === "Admin" ? "bg-red-500" : "bg-green-500"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-white ${user.isActive ? "bg-green-500" : "bg-red-500"}`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  {/* New Dropdown Menu */}
                  <td className="p-4 text-center">
                    <Dropdown menu={{ items: getMenuItems(user) }} placement="bottomRight">
                      <Button icon={<SettingOutlined />}></Button>
                    </Dropdown>
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
