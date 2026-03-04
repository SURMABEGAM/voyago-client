import React from "react";
import { Outlet } from "react-router";

const AdminProfile = () => {
  //const { user, role, loading } = useContext(AuthContext);
  // if (loading) {
  ///   return <p>Loading...</p>;
  // }
  return (
    <div className="text-lime-600 mt-20 text-center">
      <h1>AdminProfile</h1>
      <Outlet />
    </div>
  );
};

export default AdminProfile;
