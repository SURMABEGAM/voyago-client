import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { AuthContext } from "../Context/Authcontext";

const Chittagong = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get("/api/tickets")
      .then((res) => {
        setTickets(res.data);
        console.log("Fetched tickets:", res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const isBookable = (departureDate) => {
    if (!departureDate) return false;
    const today = new Date();
    const departure = new Date(departureDate);
    const diffDays = (departure - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 15;
  };

  const handleBook = (bus) => {
    Swal.fire({
      title: "Proceed to Booking?",
      text: `Booking for ${bus.title} (BDT ${bus.price})`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/booking", {
          state: { bus },
        });
      }
    });
  };

  return (
    <>
      {/* ================= ALL CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {tickets.slice(5, 12).map((bus) => (
          <div
            key={bus.id}
            className={`card bg-base-100 shadow-lg ${
              bus.quantity === 0 && "opacity-70"
            }`}
          >
            <figure className="h-40">
              <img
                src={bus.image}
                alt={bus.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body p-4">
              <h2 className="card-title text-base">
                {bus.title}
                {bus.approved && (
                  <span className="badge badge-success badge-sm">Approved</span>
                )}
              </h2>

              <p className="text-sm">
                From <b>{bus.from}</b> → <b>{bus.to}</b>
              </p>

              <p>💰 BDT {bus.price}</p>
              <p>🪑 Seats: {bus.quantity}</p>

              <div className="flex flex-wrap gap-1">
                {bus.perks.map((perk, i) => (
                  <span key={i} className="badge badge-outline badge-sm">
                    {perk}
                  </span>
                ))}
              </div>

              <p className="text-xs">
                🕒 {bus.departureDate} at {bus.departureTime}
              </p>

              <div className="card-actions justify-between mt-2">
                {bus.quantity === 0 && (
                  <span className="badge badge-error">Sold Out</span>
                )}

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedBus(bus)}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedBus && (
        <>
          <input type="checkbox" className="modal-toggle" checked readOnly />

          <div className="modal modal-open">
            <div className="modal-box max-w-md">
              <h3 className="font-bold text-lg mb-2">{selectedBus.title}</h3>

              <img
                src={selectedBus.image}
                alt={selectedBus.title}
                className="w-full h-40 object-cover rounded mb-3"
              />

              <p>
                <b>From:</b> {selectedBus.from}
              </p>
              <p>
                <b>To:</b> {selectedBus.to}
              </p>
              <p>
                <b>Price:</b> BDT {selectedBus.price}
              </p>
              <p>
                <b>Seats:</b> {selectedBus.quantity}
              </p>
              <p>
                <b>Departure:</b> {selectedBus.departureDate} at{" "}
                {selectedBus.departureTime}
              </p>

              <div className="flex flex-wrap gap-1 mt-2">
                {selectedBus.perks.map((perk, i) => (
                  <span key={i} className="badge badge-outline badge-sm">
                    {perk}
                  </span>
                ))}
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedBus(null)}
                >
                  Close
                </button>

                {selectedBus.quantity > 0 &&
                isBookable(selectedBus.departureDate) ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleBook(selectedBus)}
                  >
                    Book Now
                  </button>
                ) : (
                  <span className="text-error font-semibold">
                    Booking Not Available
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chittagong;
