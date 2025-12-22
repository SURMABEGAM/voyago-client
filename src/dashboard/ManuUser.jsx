import React from "react";
import { NavLink } from "react-router";

const ManuUser = () => {
  return (
    <ul className="space-y-3">
      <li>
        <NavLink to="/dashboard/user-profile">User Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-bookings">My Booked Tickets</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/transactions">Transaction History</NavLink>
      </li>
    </ul>
  );
};

export default ManuUser;
