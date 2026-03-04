import React, { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading, role } = useContext(AuthContext);
  console.log("AdminRoute role:", role);
  // console.log("AdminRoute user:", user);
  // console.log("AdminRoute loading:", loading);
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
