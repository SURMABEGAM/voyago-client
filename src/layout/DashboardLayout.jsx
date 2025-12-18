import { NavLink, Outlet } from "react-router";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaMoneyCheckAlt, FaTicketAlt, FaUserCircle } from "react-icons/fa";
const DashboardLayout = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
     ${
       isActive
         ? "bg-blue-600 text-white shadow-lg"
         : "text-gray-300 hover:bg-slate-800 hover:text-white"
     }`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5">
        {/* Title */}
        <div className="flex items-center gap-2 mb-8">
          <HiMenuAlt3 className="text-3xl text-blue-500" />
          <h2 className="text-xl font-bold">User Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink to="profile" className={linkClass}>
            <FaUserCircle className="text-xl" />
            <span>User Profile</span>
          </NavLink>

          <NavLink to="booked-tickets" className={linkClass}>
            <FaTicketAlt className="text-xl" />
            <span>My Booked Tickets</span>
          </NavLink>

          <NavLink to="transactions" className={linkClass}>
            <FaMoneyCheckAlt className="text-xl" />
            <span>Transaction History</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
