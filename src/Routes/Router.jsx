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
import VendorProfile from "../dashboard/VendorProfile/VendorProfile";
import AddTicket from "../dashboard/VendorProfile/AddTicket";
import MyAddedTickets from "../dashboard/VendorProfile/MyAddedTickets";
import RevenueOverview from "../dashboard/VendorProfile/RevenueOverview";
import RequestedBookings from "../dashboard/VendorProfile/RequestedBookings";
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
          { path: "my-bookings", element: <MyBookedTickets /> },
          { path: "transactions", element: <TransactionHistory /> },

          // ===== VENDOR =====
          {
            path: "vendor-profile",
            element: (
              <VendorRoute>
                <VendorProfile />
              </VendorRoute>
            ),
          },
          {
            path: "add-ticket",
            element: (
              <VendorRoute>
                <AddTicket />
              </VendorRoute>
            ),
          },
          {
            path: "my-tickets",
            element: (
              <VendorRoute>
                <MyAddedTickets />
              </VendorRoute>
            ),
          },
          {
            path: "requested-bookings",
            element: (
              <VendorRoute>
                <RequestedBookings />
              </VendorRoute>
            ),
          },
          {
            path: "revenue",
            element: (
              <VendorRoute>
                <RevenueOverview />
              </VendorRoute>
            ),
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
