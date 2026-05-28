import { useContext } from "react";

import { HiMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router";
import logo from "../assets/logo1.png";
import { AuthContext } from "../Context/AuthContext";
const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);

  const handleLogout = () => {
    signOutUser();
  };
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-orange-400 font-semibold border-b-2 border-orange-400 "
      : "hover:text-blue-900";

  const cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Rangpur",
  ];
  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
        <span className="loading loading-spinner loading-sm ml-auto mr-4"></span>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden border border-orange-400"
          >
            <HiMenuAlt3 className="text-2xl text-blue-900" />
          </label>

          {/* Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow border border-orange-400"
          >
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>

            <li>
              <details>
                <summary className=" font-semibold">All Tickets</summary>

                <ul>
                  {cities.map((city, index) => (
                    <li key={index}>
                      <NavLink
                        to={`/tickets/${city.toLowerCase()}`}
                        className={navLinkClass}
                      >
                        {city}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            {user && (
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
            )}

            {!user?.photoURL ? (
              <>
                <li>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={navLinkClass}>
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" className="w-9 h-9 rounded-full" />
        </NavLink>
      </div>

      {/* CENTER (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* Home */}
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>

          {/* All Tickets with Cities Submenu */}
          <li>
            <details>
              <summary className="">All Tickets</summary>

              <ul className="p-2 w-44 bg-base-100 border border-orange-400">
                {cities.map((city, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/tickets/${city.toLowerCase()}`}
                      className={navLinkClass}
                    >
                      {city}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          {/* Dashboard (only if user) */}
          {user && (
            <li>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end hidden lg:flex">
        {!user?.photoURL ? (
          <>
            <NavLink
              className="btn btn-outline btn-sm border-orange-400 text-orange-400"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="btn btn-sm ml-2 bg-blue-900 text-white hover:bg-orange-400"
              to="/register"
            >
              Register
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar border border-orange-400"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="user"
                  className="object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40 border border-orange-400"
            >
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
