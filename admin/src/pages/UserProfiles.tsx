import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";

import PageMeta from "../components/common/PageMeta";
import { useState, useEffect } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  
}

export default function UserProfiles() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const queryUser = new URLSearchParams(window.location.search).get("user");

    if (queryUser) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(queryUser));
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageMeta
        title="Kotoba - Admin"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle="Edit Information" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          User Information
        </h3>
        <div className="space-y-6">
          <UserMetaCard name={userData!.name} role={userData!.role} />
          <UserInfoCard
            name={userData!.name}
            email={userData!.email}
            role={userData!.role}
            idUser={userData!.id}
            createdAt={userData!.createdAt}
          />
          {/* <UserAddressCard /> */}
        </div>
      </div>
    </>
  );
}
