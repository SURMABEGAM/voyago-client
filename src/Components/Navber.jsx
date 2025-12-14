import React from "react";
import { Link } from "react-router";

const Navber = () => {
  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow">
      <div className="container mx-auto">
        {/* Logo */}
        <div className="flex-1">
          <Link className="text-2xl font-bold text-primary">Voyago</Link>
        </div>

        {/* Menu */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 hidden md:flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tickets">All Tickets</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navber;
