import React from "react";
import { Outlet } from "react-router";

const VendorProfile = () => {
  return (
    <div>
      <h1 className="text-8xl"> VendorProfile</h1>
      <Outlet />
    </div>
  );
};

export default VendorProfile;
