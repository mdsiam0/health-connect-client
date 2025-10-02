import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Swal from "sweetalert2";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const fetchRegistrations = async (email) => {
  const res = await axios.get(`http://localhost:5000/registrations/participant/${email}`);
  return res.data;
};

const RegisteredCamps = () => {
  const { user } = useAuth();
  const [selectedCamp, setSelectedCamp] = useState(null);

  // ✅ React Query for fetching camps
  const { data: registrations = [], isLoading, error, refetch } = useQuery({
    queryKey: ["registrations", user?.email],
    queryFn: () => fetchRegistrations(user.email),
    enabled: !!user?.email, // only fetch if email exists
  });

  const handlePaymentSuccess = (campId, transactionId) => {
    Swal.fire("Success!", `Payment successful! Transaction ID: ${transactionId}`, "success");
    setSelectedCamp(null);
    refetch();
  };

  if (isLoading) return <p>Loading your camps...</p>;
  if (error) return <p className="text-red-500">Error fetching camps.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Registered Camps</h2>
      <table className="table w-full border">
        <thead>
          <tr>
            <th>Camp</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id}>
              <td>{reg.campName}</td>
              <td>${reg.campFees}</td>
              <td>{reg.paymentStatus || "Unpaid"}</td>
              <td>
                {reg.paymentStatus === "Paid" ? (
                  <button className="btn btn-success btn-sm" disabled>
                    Paid
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedCamp(reg)}
                    className="btn btn-primary btn-sm"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCamp && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h3 className="text-lg font-semibold mb-4">
              Pay for {selectedCamp.campName}
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm camp={selectedCamp} onSuccess={handlePaymentSuccess} />
            </Elements>
            <button
              onClick={() => setSelectedCamp(null)}
              className="btn btn-error btn-sm mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;
