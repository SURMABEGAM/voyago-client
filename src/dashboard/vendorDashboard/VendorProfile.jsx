import React, { useContext } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import { useLoaderData } from "react-router";

const VendorProfile = () => {
  const { user } = useContext(AuthContext);
  const vendorData = useLoaderData();

  const isOnline = vendorData?.status === "online";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 p-4 md:p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-3">
        {/* Left Side */}
        <div className="bg-gradient-to-b from-orange-500 to-amber-500 text-white p-8 flex flex-col items-center justify-center relative">
          {/* Status Badge */}
          <span
            className={`absolute top-5 right-5 text-xs px-3 py-1 rounded-full font-semibold shadow text-white ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>

          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Vendor"
            className="w-36 h-36 rounded-full border-4 border-white shadow-2xl object-cover"
          />

          <h2 className="text-3xl font-bold mt-5 text-center">
            {user?.displayName || "Vendor Name"}
          </h2>

          <p className="mt-2 text-orange-100 text-center">
            Professional Ticket Vendor
          </p>

          <div className="mt-6 bg-white/20 px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
            ⭐ Verified Vendor
          </div>

          {/* Join Date */}
          <div className="mt-8 text-center">
            <p className="text-sm text-orange-100">Member Since</p>
            <h3 className="font-semibold">January 2025</h3>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-2 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-100 p-3 rounded-xl">
              <FaUserTie className="text-orange-500 text-2xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Vendor Profile
              </h1>

              <p className="text-gray-500">Manage your vendor information</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Email */}
            <div className="bg-orange-50 hover:shadow-lg transition p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-orange-500 text-xl" />

                <div>
                  <p className="text-gray-500 text-sm">Email</p>

                  <h3 className="font-semibold text-gray-800 break-all">
                    {user?.email}
                  </h3>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-orange-50 hover:shadow-lg transition p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-500 text-xl" />

                <div>
                  <p className="text-gray-500 text-sm">Phone</p>

                  <h3 className="font-semibold text-gray-800">
                    +880 1234-567890
                  </h3>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-orange-50 hover:shadow-lg transition p-5 rounded-2xl sm:col-span-2">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-orange-500 text-xl" />

                <div>
                  <p className="text-gray-500 text-sm">Location</p>

                  <h3 className="font-semibold text-gray-800">
                    Dhaka, Bangladesh
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-5 text-center shadow-lg hover:scale-105 transition">
              <h2 className="text-3xl font-bold">120+</h2>
              <p className="text-sm mt-1">Tickets Added</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-5 text-center shadow-lg hover:scale-105 transition">
              <h2 className="text-3xl font-bold">95%</h2>
              <p className="text-sm mt-1">Success Rate</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-5 text-center shadow-lg hover:scale-105 transition">
              <h2 className="text-3xl font-bold">4.9★</h2>
              <p className="text-sm mt-1">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
