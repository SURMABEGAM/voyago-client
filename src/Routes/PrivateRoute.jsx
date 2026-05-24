import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/Authcontext";
import Loading from "../loder/Loading";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("PrivateRoute - user:", user);
  console.log("PrivateRoute - loading:", loading);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;
