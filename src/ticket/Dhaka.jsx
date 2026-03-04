import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router";

const Dhaka = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch tickets from backend
  useEffect(() => {
    axiosSecure
      .get("/api/tickets")
      .then((res) => setTickets(res.data.slice(0, 6))) // Only first 6 tickets
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
    if (!user) {
      return Swal.fire("Error", "Please login to book a ticket", "error");
    }

    const bookingData = {
      busId: bus._id,
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
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/api/booking", bookingData) // backend bookings route
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire("Success!", "Your ticket has been booked.", "success");

              navigate("/tickets/booking", { state: { bus } }); // Pass bus data to booking page
              setSelectedBus(null); // close modal after booking
            }
          })
          .catch((error) => console.error("Error booking ticket:", error));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your booking was not completed", "info");
        navigate("/");
      }
    });
  };

  return (
    <div className="p-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((bus) => (
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

      {/* Modal */}
      {selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => setSelectedBus(null)}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedBus.title}</h2>
            <p>
              From: {selectedBus.from} → To: {selectedBus.to}
            </p>
            <p>Price: BDT {selectedBus.price}</p>
            <p>
              Departure:{" "}
              {selectedBus.departureDate
                ? new Date(selectedBus.departureDate).toLocaleString()
                : "N/A"}
            </p>
            <button
              className="btn btn-primary mt-4 w-full"
              disabled={!isBookable(selectedBus.departureDate)}
              onClick={() => handleBook(selectedBus)}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dhaka;
