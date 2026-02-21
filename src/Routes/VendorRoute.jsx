import React, { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { Navigate } from "react-router";

const VendorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("VendorRoute - user:", user);
  // console.log("VendorRoute - role:", role);
  console.log("VendorRoute - loading:", loading);
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
