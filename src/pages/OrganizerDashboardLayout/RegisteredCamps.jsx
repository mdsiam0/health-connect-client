import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const fetchRegistrations = async (email) => {
  const res = await fetch(`http://localhost:5000/registrations/participant/${email}`);
  if (!res.ok) throw new Error("Failed to fetch registrations");
  return res.json();
};

const RegisteredCamps = () => {
  const { user } = useAuth();

  const { data: registrations = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["registrations", user?.email],
    queryFn: () => fetchRegistrations(user.email),
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const handlePay = (registrationId, amount) => {
    alert(`Redirect to payment for $${amount}. Registration ID: ${registrationId}`);
  };

  const handleFeedback = (registrationId) => {
    const feedback = prompt("Enter your feedback:");
    if (feedback) alert(`Feedback submitted for registration ${registrationId}: ${feedback}`);
  };

  const handleCancel = async (registrationId) => {
    if (window.confirm("Are you sure you want to cancel this registration?")) {
      try {
        const res = await fetch(`http://localhost:5000/registrations/${registrationId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          alert("Registration cancelled successfully");
          refetch();
        }
      } catch (err) {
        console.error(err);
        alert("Failed to cancel registration");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Registered Camps</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Camp Name</th>
            <th className="border px-4 py-2">Camp Fees</th>
            <th className="border px-4 py-2">Participant Name</th>
            <th className="border px-4 py-2">Payment Status</th>
            <th className="border px-4 py-2">Confirmation Status</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id}>
              <td className="border px-4 py-2">{reg.campName}</td>
              <td className="border px-4 py-2">${reg.campFees}</td>
              <td className="border px-4 py-2">{reg.participantName}</td>
              <td className="border px-4 py-2">
                {reg.paymentStatus === "paid" ? (
                  <span className="text-green-600 font-semibold">Paid</span>
                ) : (
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handlePay(reg._id, reg.campFees)}
                  >
                    Pay
                  </button>
                )}
              </td>
              <td className="border px-4 py-2 capitalize">{reg.confirmationStatus}</td>
              <td className="border px-4 py-2">
                {reg.paymentStatus === "paid" ? (
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleFeedback(reg._id)}
                  >
                    Feedback
                  </button>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  className={`px-2 py-1 rounded ${
                    reg.paymentStatus === "paid"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 text-white"
                  }`}
                  disabled={reg.paymentStatus === "paid"}
                  onClick={() => handleCancel(reg._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCamps;
