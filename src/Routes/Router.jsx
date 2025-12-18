import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Error from "../error/Error";
import Home from "../Pages/Home";

import Dashboard from "../Pages/Dashboard";
import Login from "../user/Login";
import Register from "../user/Register";

import AllTickets from "../Pages/AllTickets";
import Dhaka from "../ticket/Dhaka";
import Chittagong from "../ticket/Chittagong";
import Sylhet from "../ticket/Sylhet";
import Rajshahi from "../ticket/Rajshahi";
import Khulna from "../ticket/Khulna";
import Rangpur from "../ticket/Rangpur";
import UserProfile from "../dashboard/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import MyBookedTickets from "../dashboard/MyBookedTickets";
import TransactionHistory from "../dashboard/TransactionHistory";

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
        Component: AllTickets,
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
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
          { path: "profile", Component: UserProfile },
          { path: "booked-tickets", Component: MyBookedTickets },
          { path: "transactions", Component: TransactionHistory },
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
