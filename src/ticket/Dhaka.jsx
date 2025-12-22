import React, { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { AuthContext } from "../Context/Authcontext";
import AuthProvider from "../Pages/AuthProvider";

const Dhaka = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    fetch("/ticketDhaka.json")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error(err));
  }, []);

  const isBookable = (departureDate) => {
    if (!departureDate) return false;
    const today = new Date();
    const departure = new Date(departureDate);
    const diffDays = (departure - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  };
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const handleBook = (bus) => {
    if (!user) {
      return Swal.fire("Error", "Please login to book a ticket", "error");
    }
    const bookingData = {
      busId: bus.id,
      title: bus.title,
      price: bus.price,
      bookingDate: new Date(),
      status: "pending",
    };

    Swal.fire({
      title: "Proceed to Payment?",
      text: `Booking for ${bus.title} (BDT ${bus.price})`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Book Now",
    }).then((result) => {
      if (result.isConfirmed) {
        // Vul: bookingDat -> Thik: bookingData
        axiosSecure
          .post("/tickets", bookingData)
          .then((res) => {
            // console.log-e res.data hobe (axios default response object)
            console.log("after booking ticket", res.data);

            if (res.data.insertedId) {
              Swal.fire("Success!", "Your ticket has been booked.", "success");
            }
          })
          .catch((error) => {
            console.error("Error booking ticket:", error);
          });
      }
    });
  };

  return (
    <>
      {/* ================= ALL CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((bus) => (
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

export default Dhaka;
