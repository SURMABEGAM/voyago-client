import { NavLink } from "react-router";
import {
  HiOutlineUserCircle,
  HiOutlineTicket,
  HiOutlineClock,
} from "react-icons/hi";

const ManuUser = () => {
  return (
    <ul className="space-y-3">
      {/* User Profile */}
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-gray-300"
            }`
          }
        >
          <HiOutlineUserCircle className="text-xl" />
          <span>My Profile</span>
        </NavLink>
      </li>

      {/* Booked Tickets */}
      <li>
        <NavLink
          to="/dashboard/bookings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-gray-300"
            }`
          }
        >
          <HiOutlineTicket className="text-xl" />
          <span>My Bookings</span>
        </NavLink>
      </li>

      {/* Transaction History */}
      <li>
        <NavLink
          to="/dashboard/history"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-gray-300"
            }`
          }
        >
          <HiOutlineClock className="text-xl" />
          <span>Payment History</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default ManuUser;
