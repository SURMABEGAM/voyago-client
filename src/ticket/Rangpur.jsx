import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const Rangpur = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure
      .get("/api/tickets")
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const isBookable = (departureDate) => {
    if (!departureDate) return false;
    const today = new Date();
    const departure = new Date(departureDate);
    const diffDays = (departure - today) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  };

  const handleBook = async (bus) => {
    try {
      if (!user?.email) {
        return Swal.fire("Login Required", "Please login first", "warning");
      }

      const res = await axiosSecure.post("/create-checkout-session", {
        ticketId: bus._id,
        email: user.email,
        price: bus.price,
        title: bus.title,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Payment failed", "error");
    }
  };
  return (
    <div className="p-10 mt-10">
      {" "}
      {/* Parent Div added */}
      {/* ================= ALL CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.slice(18, 24).map((bus) => (
          <div
            key={bus._id}
            className={`card bg-base-100 shadow-lg border ${
              bus.quantity === 0 ? "opacity-70" : ""
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
              <h2 className="card-title text-base">{bus.title}</h2>
              <p>
                From <b>{bus.from}</b> → <b>{bus.to}</b>
              </p>
              <p>💰 BDT {bus.price}</p>

              <div className="card-actions justify-end mt-4">
                {/* এই বাটনটি মডাল ওপেন করবে */}
                <button
                  onClick={() => setSelectedBus(bus)}
                  className="btn btn-primary btn-sm"
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
        <div className="modal modal-open">
          <div className="modal-box max-w-md relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setSelectedBus(null)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-2">{selectedBus.title}</h3>
            <img
              src={selectedBus.image}
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
              <b>Departure:</b> {selectedBus.departureDate}
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {selectedBus.perks?.map((perk, i) => (
                <span key={i} className="badge badge-outline badge-sm">
                  {perk}
                </span>
              ))}
            </div>

            <div className="modal-action">
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
      )}
    </div>
  );
};

export default Rangpur;
