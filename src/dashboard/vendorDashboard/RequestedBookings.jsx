import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBus,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import axios from "axios";

const RequestedBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/requested-bookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
          Requested Bookings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all customer booking requests
        </p>
      </div>

      {/* Booking Cards */}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Top */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {booking.title}
                  </h2>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Customer */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaUser className="text-indigo-600" />

                  <p>{booking.customerName}</p>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaMapMarkerAlt className="text-blue-600" />

                  <p>
                    {booking.from} → {booking.to}
                  </p>
                </div>

                {/* Bus */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaBus className="text-orange-500" />

                  <p>{booking.busType}</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaMoneyBillWave className="text-green-600" />

                  <p className="font-bold text-lg">৳ {booking.price}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition">
                    <FaCheckCircle />
                    Approve
                  </button>

                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition">
                    <FaTimesCircle />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
            alt="empty"
            className="w-28 mx-auto mb-5"
          />

          <h2 className="text-2xl font-bold text-slate-700">
            No Booking Requests
          </h2>

          <p className="text-slate-500 mt-2">
            No customer booking requests found.
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestedBookings;
