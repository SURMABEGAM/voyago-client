import { createBrowserRouter } from "react-router";
import Root from "./Root";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute.jsx";
import Error from "../error/Error";
import Home from "../Pages/Home";
import Login from "../user/Login";
import Register from "../user/Register";
import AllTickets from "../Pages/AllTickets";

import PrivateRoute from "./PrivateRoute";
import TransactionHistory from "../dashboard/userDashborad/TransactionHistory";
import UserProfile from "../dashboard/userDashborad/UserProfile";
import BookedTickets from "../dashboard/userDashborad/BookedTickets";

import AdminProfile from "../dashboard/adminDashborad/AdminProfile";
import ManageUsers from "../dashboard/adminDashborad/ManageUsers";
import ManageTickets from "../dashboard/adminDashborad/ManageTickets";
import AdminPayments from "../dashboard/adminDashborad/AdminPayments.jsx";

import VendorProfile from "../dashboard/vendorDashboard/VendorProfile.jsx";

import ManuVendor from "../dashboard/vendorDashboard/ManuVendor.jsx";
import AddTicket from "../dashboard/vendorDashboard/AddTicket.jsx";
import MyAddedTickets from "../dashboard/vendorDashboard/MyAddedTickets.jsx";
import RequestedBookings from "../dashboard/vendorDashboard/RequestedBookings.jsx";
import RevenueOverview from "../dashboard/vendorDashboard/RevenueOverview.jsx";
import Success from "../stripe/Success.jsx";
import Cancel from "../stripe/Cancel.jsx";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard";
import ManuAdmin from "../dashboard/adminDashborad/ManuAdmin";
import SearchResults from "../home/SearchResults.jsx";
import ContactForm from "../home/Contact.jsx";
import CityTickets from "../ticket/CityTickets.jsx";

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
        path: "search",
        Component: SearchResults,
      },
      {
        path: "contact",
        Component: ContactForm,
      },
      {
        path: "tickets",
        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "tickets/:cityName",
        element: (
          <PrivateRoute>
            <CityTickets />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // 1. Common Dashboard Home
          { index: true, element: <Dashboard /> },

          // 2. User Routes
          { path: "profile", element: <UserProfile /> },
          { path: "bookings", element: <BookedTickets /> },
          { path: "history", element: <TransactionHistory /> },

          // 3. Admin Routes (adminDashborad folder থেকে)
          { path: "admin-profile", element: <AdminProfile /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-tickets", element: <ManageTickets /> },
          { path: "admin-payments", element: <AdminPayments /> },
          { path: "manu-admin", element: <ManuAdmin /> },

          {
            path: "vendor-dashboard",
            children: [
              { path: "vendor-profile", element: <VendorProfile /> },
              { path: "manu-vendor", element: <ManuVendor /> },
              { path: "add-ticket", element: <AddTicket /> },
              { path: "my-tickets", element: <MyAddedTickets /> },
              { path: "requested-bookings", element: <RequestedBookings /> },
              { path: "revenue", element: <RevenueOverview /> },
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

      {
        path: "/stripe/success",
        element: <Success />,
      },
      {
        path: "/stripe/cancel",
        element: <Cancel />,
      },
    ],
  },
]);
