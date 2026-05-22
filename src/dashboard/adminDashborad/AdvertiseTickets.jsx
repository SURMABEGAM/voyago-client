import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await axios.get("http://localhost:5000/api/approved-tickets");

    setTickets(res.data);
  };

  const handleAdvertise = async (ticket) => {
    const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

    if (!ticket.isAdvertised && advertisedCount >= 6) {
      return Swal.fire({
        icon: "error",
        title: "Maximum 6 advertisements allowed",
      });
    }

    await axios.patch(
      `http://localhost:5000/api/tickets/advertise/${ticket._id}`,
    );

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
            <th className="text-shadow-black">Advertise</th>
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

              <td className="text-shadow-black">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={ticket.isAdvertised}
                  onChange={() => handleAdvertise(ticket)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseTickets;
