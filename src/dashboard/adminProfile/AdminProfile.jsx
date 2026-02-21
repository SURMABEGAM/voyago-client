import React from "react";
import { Outlet } from "react-router";

const AdminProfile = () => {
  return (
    <div>
      <h1>AdminProfile</h1>
      <Outlet />
    </div>
  );
};

export default AdminProfile;
