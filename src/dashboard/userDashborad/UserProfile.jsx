import React, { useContext } from "react";
import { AuthContext } from "../../Context/Authcontext";
import Loader from "../../components/Loader";

const UserProfile = () => {
  const { user, role, loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-100 p-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 max-w-md w-full border border-orange-100 hover:scale-[1.02] transition duration-300">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-28 h-28 rounded-full border-4 border-orange-400 shadow-lg object-cover"
            />

            {/* Online Dot */}
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold text-orange-500">
            {user?.displayName}
          </h2>

          <p className="text-gray-600 mt-1 break-all">{user?.email}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-100 my-5"></div>

        {/* Role Section */}
        <div className="flex items-center justify-between bg-orange-50 px-4 py-3 rounded-xl">
          <span className="text-gray-700 font-medium">👤 User Role</span>

          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
            {role}
          </span>
        </div>

        {/* Extra Info */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-amber-50 rounded-xl p-3 shadow-sm">
            <h3 className="text-lg font-bold text-orange-500">12</h3>
            <p className="text-sm text-gray-600">Bookings</p>
          </div>

          <div className="bg-amber-50 rounded-xl p-3 shadow-sm">
            <h3 className="text-lg font-bold text-orange-500">৳ 25K</h3>
            <p className="text-sm text-gray-600">Spent</p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
