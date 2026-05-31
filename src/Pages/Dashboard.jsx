import React, { useContext } from "react";
import { FaBars, FaUserShield } from "react-icons/fa";
import { Outlet } from "react-router";
import { AuthContext } from "../Context/AuthContext"; // আপনার পাথের সাথে মিলিয়ে নিন
import ManuAdmin from "../dashboard/adminDashborad/ManuAdmin";
import ManuVendor from "../dashboard/vendorDashboard/ManuVendor";
import ManuUser from "../dashboard/userDashborad/ManuUser";

const Dashboard = () => {
  const { role, roleLoading } = useContext(AuthContext);

  if (roleLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {role === "admin" ? (
        <ManuAdmin />
      ) : role === "vendor" ? (
        <ManuVendor />
      ) : (
        <ManuUser />
      )}
    </div>
  );
};

export default Dashboard;
