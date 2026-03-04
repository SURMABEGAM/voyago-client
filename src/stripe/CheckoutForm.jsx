import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// ✅ useNavigate, not Navigate

const CheckoutForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // ✅ initialize navigate
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      },
    );

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      navigate("/tickets/success"); // ✅ use navigate here
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <CardElement className="border p-3" />

      <button
        className="btn btn-primary w-full mt-4"
        disabled={!stripe || loading}
      >
        Pay {totalPrice}৳
      </button>
    </form>
  );
};

export default CheckoutForm;
