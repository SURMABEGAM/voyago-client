import React, { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white p-6 rounded-lg max-w-md">
      <img src={user?.photoURL} className="w-24 h-24 rounded-full mx-auto" />

      <h2 className="text-xl font-semibold text-center text-orange-400 mt-3">
        {user?.displayName}
      </h2>

      <p className="text-center text-black">{user?.email}</p>
      <p className="text-center mt-2">
        Role: <span className="font-semibold text-black">User</span>
      </p>
    </div>
  );
};

export default UserProfile;
