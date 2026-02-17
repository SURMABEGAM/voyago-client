import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Error from "../error/Error";
import Home from "../Pages/Home";
import Login from "../user/Login";
import Register from "../user/Register";
import AllTickets from "../Pages/AllTickets";
import Dhaka from "../ticket/Dhaka";
import Chittagong from "../ticket/Chittagong";
import Sylhet from "../ticket/Sylhet";
import Rajshahi from "../ticket/Rajshahi";
import Khulna from "../ticket/Khulna";
import Rangpur from "../ticket/Rangpur";
import Booking from "../ticket/Booking";
import UserProfile from "../dashboard/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import MyBookedTickets from "../dashboard/MyBookedTickets";
import TransactionHistory from "../dashboard/TransactionHistory";

import PrivateRoute from "./PrivateRoute";
import VendorProfile from "../dashboard/vendorDashboard/VendorProfile";
import ManuVendor from "../dashboard/vendorDashboard/ManuVendor";

import AddTicket from "../dashboard/vendorDashboard/AddTicket";
import MyAddedTickets from "../dashboard/vendorDashboard/MyAddedTickets";

import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../dashboard/adminProfile/AdminProfile";
import ManageTickets from "../dashboard/adminProfile/ManageTickets";
import ManageUsers from "../dashboard/adminProfile/ManageUsers";
import AdvertiseTickets from "../dashboard/adminProfile/AdvertiseTickets";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "tickets",
        Element: (
          <PrivateRoute>
            <AllTickets />,
          </PrivateRoute>
        ),
      },
      {
        path: "privateroute",
        Component: PrivateRoute,
      },
      {
        path: "tickets/dhaka",
        Component: Dhaka,
      },
      {
        path: "tickets/chittagong",
        Component: Chittagong,
      },
      {
        path: "tickets/sylhet",
        Component: Sylhet,
      },
      {
        path: "tickets/rajshahi",
        Component: Rajshahi,
      },
      {
        path: "tickets/khulna",
        Component: Khulna,
      },
      {
        path: "tickets/rangpur",
        Component: Rangpur,
      },
      {
        path: "/booking",
        Component: Booking,
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // ===== USER =====
          { path: "user-profile", element: <UserProfile /> },
          { path: "booked-tickets", element: <MyBookedTickets /> },
          { path: "transactions", element: <TransactionHistory /> },

          // ===== VENDOR =====
          {
            path: "vendor-profile",
            element: (
              <VendorRoute>
                <VendorProfile />
              </VendorRoute>
            ),
            children: [
              { path: "manu-vendor", element: <ManuVendor /> },
              { path: "add-ticket", element: <AddTicket /> },
              { path: "my-tickets", element: <MyAddedTickets /> },
            ],
          },

          // ===== ADMIN =====
          {
            path: "admin-profile",
            element: (
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            ),
          },
          {
            path: "manage-tickets",
            element: (
              <AdminRoute>
                <ManageTickets />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "advertise",
            element: (
              <AdminRoute>
                <AdvertiseTickets />
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
