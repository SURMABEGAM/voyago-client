import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { useLocation } from "react-router";

const Booking = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);

  const bus = state?.bus;

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: bus._id,
          email: user.email,
        }),
      });

      const data = await res.json();

      // 🔥 Stripe Hosted Page redirect
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  if (!bus) return <p>No booking data found</p>;

  return (
    <div className="max-w-md mx-auto  text-amber-600 mt-10 p-5 border rounded">
      <h1 className="text-2xl font-bold mb-5">Booking Summary</h1>
      <h2 className="text-xl font-bold mb-4">{bus.title}</h2>

      <p>From: {bus.from}</p>
      <p>To: {bus.to}</p>
      <p>Price: BDT {bus.price}</p>

      <button onClick={handleCheckout} className="btn btn-primary w-full mt-5">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Booking;
