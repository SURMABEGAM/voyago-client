import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const location = useLocation();

  const bus = location.state?.bus || {};

  const totalPrice = bus.price || 0;

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post("http://localhost:5000/create-payment-intent", {
          totalPrice,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.log(err));
    }
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      },
    );

    if (error) {
      console.log(error.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      navigate("/stripe/success");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 border p-5 rounded">
      <h2 className="text-2xl font-bold mb-4">Pay BDT {totalPrice}</h2>

      <form onSubmit={handleSubmit}>
        <CardElement className="border p-3 rounded" />

        <button
          className="btn btn-primary w-full mt-4"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
