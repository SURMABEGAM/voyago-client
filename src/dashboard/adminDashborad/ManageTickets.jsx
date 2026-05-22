import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await axios.get("http://localhost:5000/api/tickets");

    setTickets(res.data);
  };

  // useEffect(() => {
  //   fetchTickets();
  // }, []);

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
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="bg-gray-500">
            <th className="text-shadow-black">Title</th>
            <th className="text-shadow-black">Route</th>
            <th className="text-shadow-black">Price</th>
            <th className="text-shadow-black">Status</th>
            <th className="text-shadow-black">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td className="text-shadow-black">{ticket.title}</td>

              <td className="text-shadow-black">
                {ticket.from} → {ticket.to}
              </td>

              <td className="text-shadow-black">${ticket.price}</td>

              <td className="text-shadow-black">{ticket.verificationStatus}</td>

              <td className="flex gap-2">
                <button
                  onClick={() => handleStatus(ticket._id, "approved")}
                  className="btn btn-success btn-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleStatus(ticket._id, "rejected")}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTickets;
