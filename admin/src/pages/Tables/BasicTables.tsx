import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Kotoba - Admin"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="All Users">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
