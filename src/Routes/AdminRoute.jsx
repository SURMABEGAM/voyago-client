import React, { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("AdminRoute user:", user);
  console.log("AdminRoute loading:", loading);
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
