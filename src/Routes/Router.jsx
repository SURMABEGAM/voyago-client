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

import TransactionHistory from "../dashboard/TransactionHistory";

import PrivateRoute from "./PrivateRoute";
import VendorProfile from "../dashboard/vendorDashboard/VendorProfile";
import ManuVendor from "../dashboard/vendorDashboard/ManuVendor";

import AddTicket from "../dashboard/vendorDashboard/AddTicket";
import MyAddedTickets from "../dashboard/vendorDashboard/MyAddedTickets";

import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";
import ManuAdmin from "../dashboard/adminProfile/ManuAdmin";
import AdminProfile from "../dashboard/adminProfile/AdminProfile";
import ManageTickets from "../dashboard/adminProfile/ManageTickets";
import ManageUsers from "../dashboard/adminProfile/ManageUsers";
import AdvertiseTickets from "../dashboard/adminProfile/AdvertiseTickets";
import BookedTickets from "../dashboard/BookedTickets";
import Success from "../ticket/Success";

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
            <AllTickets />
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
        path: "tickets/booking",
        Component: Booking,
      },
      {
        path: "tickets/success",
        Element: <Success />,
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
          { path: "booked-tickets", element: <BookedTickets /> },
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
            children: [
              { path: "manu-admin", element: <ManuAdmin /> },
              { path: "manage-tickets", element: <ManageTickets /> },
              { path: "manage-users", element: <ManageUsers /> },
              { path: "advertise", element: <AdvertiseTickets /> },
            ],
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
