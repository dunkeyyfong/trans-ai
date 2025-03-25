import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
const accessToken = new URLSearchParams(window.location.search).get('accessToken');

export default function BasicTables() {

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(decodedToken));
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="*" replace />;
  }

  const decodedToken = jwtDecode(accessToken);

  return (
    <>
      <PageMeta
        title="Kotoba - Admin"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="All Users">
          <BasicTableOne token={accessToken} />
        </ComponentCard>
      </div>
    </>
  );
}
