import React, { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { Navigate } from "react-router";

const VendorRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading || role === null) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
