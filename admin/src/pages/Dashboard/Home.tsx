import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
const accessToken = new URLSearchParams(window.location.search).get('accessToken');

export default function Home() {
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(decodedToken));
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="*" replace />;
  }

  const decodedToken = jwtDecode(accessToken);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(decodedToken));
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
  }, [accessToken]);

  // if (decodedToken?.role !== 'ADMIN') {
  //   return <Navigate to="/not-found" replace />;
  // }

  return (
    <>
      <PageMeta
        title="Kotoba - Admin"
        description="Bảng điều khiển quản trị Kotoba"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12">
          <RecentOrders token={accessToken}/>
        </div>
      </div>
    </>
  );
}
