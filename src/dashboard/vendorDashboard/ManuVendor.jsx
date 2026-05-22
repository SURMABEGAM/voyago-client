import React from "react";
import { NavLink } from "react-router";

const ManuVendor = () => {
  return (
    <ul className="space-y-3">
      <li>
        <NavLink to="/dashboar/vendor">Vendor Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-ticket">Add Ticket</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-tickets">My Added Tickets</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/requested-bookings">Requested Bookings</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/revenue">Revenue Overview</NavLink>
      </li>
    </ul>
  );
};

export default ManuVendor;
