import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const fetchRegistrations = async (email) => {
  const res = await fetch(`http://localhost:5000/registrations/participant/${email}`);
  if (!res.ok) throw new Error("Failed to fetch registrations");
  return res.json();
};

const RegisteredCamps = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: registrations = [], isLoading, isError, error } = useQuery({
    queryKey: ["registrations", user?.email],
    queryFn: () => fetchRegistrations(user.email),
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const handlePay = async (regId, amount) => {
    Swal.fire({
      title: "Proceed to Payment?",
      text: `Registration ID: ${regId}\nAmount: $${amount}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire("Success!", "Payment successful", "success");
        
        queryClient.invalidateQueries(["registrations", user.email]);
      }
    });
  };

  const handleCancel = async (regId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/registrations/${regId}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire("Cancelled!", "Registration cancelled successfully", "success");
            queryClient.invalidateQueries(["registrations", user.email]);
          } else {
            Swal.fire("Error", "Failed to cancel registration", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to cancel registration", "error");
        }
      }
    });
  };

  const handleFeedback = (regId) => {
    Swal.fire({
      title: "Provide Feedback",
      input: "textarea",
      inputLabel: "Your feedback",
      inputPlaceholder: "Type your feedback here...",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
       
        Swal.fire("Thank you!", "Feedback submitted successfully", "success");
      }
    });
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
            <th className="border px-4 py-2">Payment Info</th>
            <th className="border px-4 py-2">Confirmation Status</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => {
            const paymentStatus = reg.paymentStatus ? reg.paymentStatus.toLowerCase() : "unpaid";

            return (
              <tr key={reg._id}>
                <td className="border px-4 py-2">{reg.campName}</td>
                <td className="border px-4 py-2">{reg.campFees}</td>
                <td className="border px-4 py-2">{reg.participantName}</td>

               
                <td className="border px-4 py-2">
                  {paymentStatus === "paid" ? (
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

              
                <td className="border px-4 py-2">
                  <span
                    className={
                      paymentStatus === "paid"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {reg.paymentStatus}
                  </span>
                </td>

                
                <td className="border px-4 py-2">{reg.confirmationStatus}</td>

                <td className="border px-4 py-2">
                  {paymentStatus === "paid" ? (
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
                  {paymentStatus === "unpaid" ? (
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleCancel(reg._id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCamps;
