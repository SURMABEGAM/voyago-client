import React from "react";
import { NavLink } from "react-router";

const ManuAdmin = () => {
  return (
    <ul className="space-y-3 ">
      <li>
        <NavLink to="/dashboard/admin-profile">Admin Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/admin-profile/manage-tickets">
          Manage Tickets
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/advertise">Advertise Tickets</NavLink>
      </li>
    </ul>
  );
};

export default ManuAdmin;
