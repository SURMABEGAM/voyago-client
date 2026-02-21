import React from "react";
import { Outlet } from "react-router";

const DashboardRoute = () => {
  return (
    <div>
      <h1 className="text-8xl">DashboardRoute</h1>
      <Outlet />
    </div>
  );
};

export default DashboardRoute;
