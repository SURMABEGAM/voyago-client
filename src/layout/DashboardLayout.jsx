import { NavLink, Outlet } from "react-router";
import { HiMenuAlt3 } from "react-icons/hi";

import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ManuAdmin from "../dashboard/adminDashborad/ManuAdmin";
import ManuVendor from "../dashboard/vendorDashboard/ManuVendor";
import ManuUser from "../dashboard/userDashborad/ManuUser";

const DashboardLayout = () => {
  const { user, role, roleLoading } = useContext(AuthContext);

  console.log("DashboardLayout - User:", user);
  console.log("DashboardLayout - Role:", role);

  return (
    <div className="flex min-h-screen mt-20">
      <aside className="w-64 bg-slate-900 text-white p-5">
        <div className="flex items-center gap-2 mb-8">
          <HiMenuAlt3 className="text-3xl text-blue-500" />
          <h2 className="text-xl font-bold">
            {role === "admin"
              ? "Admin Dashboard"
              : role === "vendor"
                ? "Vendor Dashboard"
                : "User Dashboard"}
          </h2>
        </div>

        {roleLoading ? (
          <p>Loading...</p>
        ) : role === "admin" ? (
          <ManuAdmin />
        ) : role === "vendor" ? (
          <ManuVendor />
        ) : (
          <ManuUser />
        )}
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
