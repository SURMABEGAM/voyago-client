import { Outlet, NavLink } from "react-router";
import { FaBars, FaUserShield, FaBus, FaUsers, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  // Example Role
  const role = "admin";
  // admin | vendor | user

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex flex-col">
          {/* MOBILE NAVBAR */}
          <div className="navbar bg-[#081028] text-white lg:hidden">
            <div className="flex-none">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost"
              >
                <FaBars className="text-xl" />
              </label>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold">Dashboard</h2>
            </div>

            {/* Profile Dropdown */}
            <div className="flex-none dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <FaUserShield className="text-2xl" />
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white text-black rounded-box w-52"
              >
                <li>
                  <a>User Dashboard</a>
                </li>

                <li>
                  <a>Vendor Dashboard</a>
                </li>

                <li>
                  <a>Admin Dashboard</a>
                </li>
              </ul>
            </div>
          </div>

          {/* PAGE CONTENT */}
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side z-50">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <ul className="menu p-4 w-72 min-h-full bg-[#081028] text-white">
            {/* LOGO */}
            <h2 className="text-3xl font-bold mb-10 mt-4 flex items-center gap-3">
              <FaUserShield />
              Dashboard
            </h2>

            {/* COMMON */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white rounded-lg"
                    : "hover:bg-slate-700 rounded-lg"
                }
              >
                <FaHome />
                Home
              </NavLink>
            </li>

            {/* ADMIN MENU */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/admin-profile"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "hover:bg-slate-700 rounded-lg"
                    }
                  >
                    Admin Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-tickets"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "hover:bg-slate-700 rounded-lg"
                    }
                  >
                    <FaBus />
                    Manage Tickets
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white rounded-lg"
                        : "hover:bg-slate-700 rounded-lg"
                    }
                  >
                    <FaUsers />
                    Manage Users
                  </NavLink>
                </li>
              </>
            )}

            {/* VENDOR MENU */}
            {role === "vendor" && (
              <>
                <li>
                  <NavLink to="/dashboard/vendor-profile">
                    Vendor Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/add-bus">Add Bus</NavLink>
                </li>
              </>
            )}

            {/* USER MENU */}
            {role === "user" && (
              <>
                <li>
                  <NavLink to="/dashboard/my-profile">My Profile</NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/my-bookings">My Bookings</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
