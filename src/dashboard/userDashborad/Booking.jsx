import { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("user"))?.email;

    axios
      .get(`http://localhost:5000/bookings/${email}`)
      .then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-3 rounded">
          <p>
            <b>{b.title}</b>
          </p>
          <p>৳{b.price}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
