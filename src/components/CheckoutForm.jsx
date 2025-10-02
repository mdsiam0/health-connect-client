import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CheckoutForm = ({ camp, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      
      const { data } = await axios.post("https://mcms-server-three.vercel.app/create-payment-intent", {
        amount: camp.campFees,
        participantEmail: camp.participantEmail,
        campId: camp._id,
      });

      const clientSecret = data.clientSecret;

      
      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (error) {
        Swal.fire("Error", error.message, "error");
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        
        await axios.post("https://mcms-server-three.vercel.app/payments", {
          transactionId: paymentIntent.id,
          participantEmail: camp.participantEmail,
          campId: camp._id,
          campName: camp.campName,
          amount: camp.campFees,
          date: new Date(),
        });

        
        await axios.patch(`https://mcms-server-three.vercel.app/registrations/${camp._id}`, {
          paymentStatus: "Paid",
          transactionId: paymentIntent.id,
        });

        
        onSuccess(camp._id, paymentIntent.id);
      }
    } catch (err) {
      console.error("Payment failed:", err);
      Swal.fire("Error", "Payment failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 rounded-md mb-3" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary btn-sm w-full"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
