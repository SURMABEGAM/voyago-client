import React, { useEffect, useState } from "react";
import {
  FaBus,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

import axios from "axios";

const MyAddedTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets")
      .then((res) => {
        setTickets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
          My Added Tickets
        </h1>

        <p className="text-slate-500 mt-2">Manage all your added tickets</p>
      </div>

      {/* Cards */}
      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Top */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {ticket.title}
                  </h2>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Available
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Route */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaMapMarkerAlt className="text-blue-600" />

                  <p>
                    {ticket.from} → {ticket.to}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaCalendarAlt className="text-indigo-600" />

                  <p>{ticket.date}</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaMoneyBillWave className="text-green-600" />

                  <p className="font-bold text-lg">৳ {ticket.price}</p>
                </div>

                {/* Bus Type */}
                <div className="flex items-center gap-3 text-slate-700">
                  <FaBus className="text-orange-500" />

                  <p>{ticket.busType}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold">
                    <FaEdit />
                    Update
                  </button>

                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold">
                    <FaTrashAlt />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-slate-700">
            No Tickets Found
          </h2>

          <p className="text-slate-500 mt-2">
            You have not added any ticket yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
