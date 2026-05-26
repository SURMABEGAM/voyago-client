import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tickets");

      setTickets(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatus = async (id, status) => {
    await axios.patch(`http://localhost:5000/api/tickets/status/${id}`, {
      status,
    });

    Swal.fire({
      icon: "success",
      title: `Ticket ${status}`,
    });

    fetchTickets();
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-100">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6">
        Manage Tickets
      </h1>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-x-auto">
        <table className="min-w-[800px] w-full">
          {/* Head */}
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Route</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-b hover:bg-slate-50 transition"
              >
                {/* Title */}
                <td className="py-4 px-6 font-semibold text-slate-800">
                  {ticket.title}
                </td>

                {/* Route */}
                <td className="py-4 px-6 text-slate-600">
                  {ticket.from} → {ticket.to}
                </td>

                {/* Price */}
                <td className="py-4 px-6 font-bold text-green-600">
                  ৳ {ticket.price}
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      ticket.verificationStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : ticket.verificationStatus === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ticket.verificationStatus || "pending"}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatus(ticket._id, "approved")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatus(ticket._id, "rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
