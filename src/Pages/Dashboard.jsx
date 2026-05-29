import React from "react";
import { FaBars, FaUserShield, FaBus, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Drawer Wrapper */}
      <div className="drawer lg:drawer-open min-h-screen">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex flex-col flex-1">
          {/* Mobile Navbar */}
          <div className="w-full navbar bg-[#081028] text-white lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <FaBars className="text-xl" />
            </label>

            <h1 className="text-xl font-bold ml-2">Admin Dashboard</h1>
          </div>

          {/* Page Content */}
          <div className="p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-3xl p-6 shadow-xl">
                <div className="flex justify-center">
                  <img
                    src="https://i.ibb.co/6JQ5jQw/avatar.png"
                    alt="admin"
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold text-center mt-4">
                  Welcome Administrator
                </h2>

                <p className="text-center mt-3 text-sm leading-7">
                  Manage buses, users, bookings and revenue from one dashboard.
                </p>
              </div>

              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <FaBus className="text-4xl text-primary mb-4" />
                <h2 className="text-2xl font-bold">Manage Tickets</h2>
                <p className="mt-2 text-slate-500">
                  Control routes and tickets easily.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <FaUsers className="text-4xl text-primary mb-4" />
                <h2 className="text-2xl font-bold">Manage Users</h2>
                <p className="mt-2 text-slate-500">
                  Monitor passengers and vendors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <ul className="menu p-4 w-72 min-h-full bg-[#081028] text-white">
            <h2 className="text-3xl font-bold mb-10 mt-4 flex items-center gap-3">
              <FaUserShield />
              Dashboard
            </h2>

            <li>
              <a>Admin Profile</a>
            </li>
            <li>
              <a>Manage Tickets</a>
            </li>
            <li>
              <a>Manage Users</a>
            </li>
            <li>
              <a>Admin Payments</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
