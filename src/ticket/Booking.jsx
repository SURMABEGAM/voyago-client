import { useState } from "react";
// import StripeWrapper from "../stripe/StripeWrapper";
// import CheckoutForm from "../stripe/CheckoutForm";

const Booking = () => {
  const ticketPrice = 1200;
  const [quantity, setQuantity] = useState(1);

  const totalPrice = ticketPrice * quantity;

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Bus Ticket Booking</h2>

      <p>Price per ticket: {ticketPrice}৳</p>

      <label className="block mt-3">Quantity</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 w-full"
      />

      <h3 className="mt-4 font-semibold">Total: {totalPrice}৳</h3>

      {/* <StripeWrapper>
        <CheckoutForm totalPrice={totalPrice} />
       </StripeWrapper> */}
    </div>
  );
};

export default Booking;
