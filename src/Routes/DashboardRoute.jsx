import React from "react";

const DashboardRoute = () => {
  return (
    <div>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="user" element={<UserDashboard />} />
        <Route path="vendor" element={<VendorDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </div>
  );
};

export default DashboardRoute;
