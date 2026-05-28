import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { AuthContext } from "../Context/AuthContext";

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

  const isBookable = (departureDate) => {
    if (!departureDate) return false;
    const today = new Date();
    const departure = new Date(departureDate);
    const diffDays = (departure - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 15;
  };

  // Stripe Hosted Checkout
  const handlePayment = async (bus) => {
    try {
      const res = await axios.post(
        "https://voyago-server-theta.vercel.app/api/create-checkout-session",
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
    <>
      {/* ================= ALL CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {tickets.slice(0, 6).map((bus) => (
          <div
            key={bus.id}
            className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden ${
              bus.quantity === 0 && "opacity-60 grayscale"
            }`}
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={bus.image}
                alt={bus.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </figure>

            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-lg font-bold">{bus.title}</h2>
                {bus.approved && (
                  <span className="badge badge-success badge-sm text-white">
                    Verified
                  </span>
                )}
              </div>

              <div className="text-sm text-base-content/70 space-y-1 my-2">
                <p>
                  Route:{" "}
                  <span className="font-semibold text-base-content">
                    {bus.from} ➔ {bus.to}
                  </span>
                </p>
                <p className="text-primary font-bold text-lg">৳ {bus.price}</p>
              </div>

              <div className="flex flex-wrap gap-2 my-2">
                {bus.perks.map((perk, i) => (
                  <span key={i} className="badge badge-ghost badge-sm">
                    {perk}
                  </span>
                ))}
              </div>

              <div className="card-actions justify-between items-center mt-4">
                <span
                  className={`text-xs font-medium ${bus.quantity > 0 ? "text-green-600" : "text-red-500"}`}
                >
                  {bus.quantity > 0 ? `${bus.quantity} Seats Left` : "Sold Out"}
                </span>
                <button
                  className="btn btn-primary btn-sm px-6"
                  onClick={() => setSelectedBus(bus)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedBus && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box p-0 overflow-hidden">
            {/* Header Image */}
            <div className="relative h-48 w-full">
              <img
                src={selectedBus.image}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                {selectedBus.title}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">From</p>
                  <p className="font-semibold">{selectedBus.from}</p>
                </div>
                <div>
                  <p className="text-gray-400">To</p>
                  <p className="font-semibold">{selectedBus.to}</p>
                </div>
                <div>
                  <p className="text-gray-400">Departure</p>
                  <p className="font-semibold">{selectedBus.departureDate}</p>
                </div>
                <div>
                  <p className="text-gray-400">Time</p>
                  <p className="font-semibold">{selectedBus.departureTime}</p>
                </div>
              </div>

              <div className="divider my-0"></div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  ৳ {selectedBus.price}
                </span>
                <span className="badge badge-lg">
                  {selectedBus.quantity} Seats Available
                </span>
              </div>
            </div>

            <div className="modal-action px-6 pb-6 mt-0">
              <button
                className="btn btn-ghost"
                onClick={() => setSelectedBus(null)}
              >
                Close
              </button>

              {selectedBus.quantity > 0 &&
              isBookable(selectedBus.departureDate) ? (
                <button
                  className="btn btn-primary px-8"
                  onClick={() => handlePayment(selectedBus)}
                >
                  Book Now
                </button>
              ) : (
                <span className="text-red-500 font-semibold">
                  Booking Unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dhaka;
