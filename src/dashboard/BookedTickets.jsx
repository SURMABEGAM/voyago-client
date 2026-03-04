import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Authcontext";

const BookedTickets = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-bookings/${user.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [user]);
  return (
    <div className="max-w-3xl mx-auto  text-amber-600 mt-10">
      <h2 className="text-xl font-bold mb-5">My Payments</h2>

      {bookings.map((b) => (
        <div key={b._id} className="border p-3 mb-3 text-amber-600 rounded">
          <p>Transaction: {b.transactionId}</p>
          <p>Amount: {b.amount} BDT</p>
          <p>Status: {b.status}</p>
          <p>Date: {new Date(b.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default BookedTickets;
