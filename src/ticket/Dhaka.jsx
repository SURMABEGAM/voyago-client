import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { AuthContext } from "../Context/Authcontext";

const Dhaka = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const axiosSecure = UseAxiosSecure();

  const { user } = useContext(AuthContext);

  // Fetch tickets
  useEffect(() => {
    axiosSecure
      .get("/api/tickets")
      .then((res) => setTickets(res.data.slice(0, 6)))
      .catch((err) => console.log(err));
  }, []);

  // Stripe Hosted Checkout
  const handlePayment = async (bus) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          ticketId: bus._id,
          email: user.email,
        },
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);

      Swal.fire("Error", "Payment failed", "error");
    }
  };

  return (
    <div className="p-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((bus) => (
          <div key={bus._id} className="card bg-base-100 shadow-lg">
            <figure className="h-40">
              <img
                src={bus.image}
                alt={bus.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{bus.title}</h2>

              <p>
                {bus.from} → {bus.to}
              </p>

              <p>BDT {bus.price}</p>

              <button
                onClick={() => setSelectedBus(bus)}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBus && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 relative">
            <button
              className="absolute right-3 top-2 text-red-500"
              onClick={() => setSelectedBus(null)}
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-3">{selectedBus.title}</h2>

            <p>
              {selectedBus.from} → {selectedBus.to}
            </p>

            <p>Price: BDT {selectedBus.price}</p>

            <button
              className="btn btn-primary mt-5 w-full"
              onClick={() => handlePayment(selectedBus)}
            >
              Pay with Stripe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dhaka;
