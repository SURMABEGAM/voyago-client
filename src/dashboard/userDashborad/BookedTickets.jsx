import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Authcontext";

const BookedTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/booking/${user.email}`)
        .then((res) => setTickets(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6  text-amber-700 text-center">
        🎫 My Booked Tickets
      </h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-800">No tickets booked yet 😔</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl  text-amber-700 font-semibold">
                {ticket.title}
              </h2>
              <p className="text-shadow-black">💰 Price: ৳ {ticket.price}</p>
              <p className="text-shadow-black">
                📅 Date: {new Date(ticket.date).toLocaleString()}
              </p>
              <p className="text-shadow-black">
                📌 Status:{" "}
                <span className="text-green-600 font-semibold">
                  {ticket.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTickets;
