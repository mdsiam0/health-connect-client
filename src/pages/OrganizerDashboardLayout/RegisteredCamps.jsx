import React, { useState, useMemo, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import CheckoutForm from "../../components/CheckoutForm";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Fetch participant registrations
const fetchRegistrations = async (email) => {
  const res = await axios.get(
    `https://mcms-server-three.vercel.app/registrations/participant/${email}`
  );
  return res.data;
};

const RegisteredCamps = () => {
  const { user } = useAuth();
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [feedbackCamp, setFeedbackCamp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const rowsPerPage = 10;

  const { data: registrations = [], isLoading, error, refetch } = useQuery({
    queryKey: ["registrations", user?.email],
    queryFn: () => fetchRegistrations(user.email),
    enabled: !!user?.email,
  });

  
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) =>
      reg.campName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, registrations]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRegistrations.length / rowsPerPage);
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRegistrations.slice(start, start + rowsPerPage);
  }, [currentPage, filteredRegistrations]);

  // Handle successful payment
  const handlePaymentSuccess = async (campId, transactionId, camp) => {
    try {
      await axios.post("https://mcms-server-three.vercel.app/payments", {
        transactionId,
        participantEmail: camp.participantEmail,
        participantName: camp.participantName,
        campId: camp._id,
        campName: camp.campName,
        amount: camp.campFees,
        date: new Date(),
      });

      await axios.patch(
        `https://mcms-server-three.vercel.app/registrations/${camp._id}`,
        { paymentStatus: "Paid", transactionId }
      );

      Swal.fire(
        "Success!",
        `Payment successful! Transaction ID: ${transactionId}`,
        "success"
      );
      setSelectedCamp(null);
      refetch();
    } catch (err) {
      console.error("Payment update failed:", err);
      Swal.fire("Error", "Failed to update payment info.", "error");
    }
  };

  const handleCancel = async (registrationId, paymentStatus) => {
    if (paymentStatus === "Paid") return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `https://mcms-server-three.vercel.app/registrations/${registrationId}`
        );
        Swal.fire("Cancelled!", "Your registration has been cancelled.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to cancel registration.", "error");
      }
    }
  };

  const openFeedbackModal = (camp) => {
    setFeedbackCamp(camp);
    setFeedbackText("");
  };

  const submitFeedback = async () => {
    if (!feedbackText.trim()) {
      Swal.fire("Error", "Feedback cannot be empty.", "error");
      return;
    }
    try {
      await axios.post("https://mcms-server-three.vercel.app/feedback", {
        campId: feedbackCamp.campId,
        participantEmail: feedbackCamp.participantEmail,
        participantName: feedbackCamp.participantName,
        feedback: feedbackText,
        date: new Date(),
      });

      Swal.fire("Thank you!", "Your feedback has been submitted.", "success");
      setFeedbackCamp(null);
      setFeedbackText("");
    } catch (err) {
      Swal.fire("Error", "Failed to submit feedback.", "error");
    }
  };

  if (isLoading) return <p>Loading your registrations...</p>;
  if (error) return <p className="text-red-500">Error fetching registrations.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Registered Camps</h2>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search by Camp Name..."
      />

      <div className="overflow-x-auto mt-2">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Participant Name</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Pay</th>
              <th>Feedback</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRegistrations.map((reg) => (
              <tr key={reg._id} className="hover:bg-gray-50">
                <td>{reg.campName}</td>
                <td>${reg.campFees}</td>
                <td>{reg.participantName}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded ${
                      reg.paymentStatus === "Paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {reg.paymentStatus || "Unpaid"}
                  </span>
                </td>
                <td>{reg.confirmationStatus || "Pending"}</td>
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
                <td>
                  {reg.paymentStatus === "Paid" ? (
                    <button
                      onClick={() => openFeedbackModal(reg)}
                      className="btn btn-info btn-sm"
                    >
                      Feedback
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleCancel(reg._id, reg.paymentStatus)}
                    className="btn btn-error btn-sm"
                    disabled={reg.paymentStatus === "Paid"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {filteredRegistrations.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Stripe Payment Modal */}
      {selectedCamp && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Pay for {selectedCamp.campName}
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                camp={selectedCamp}
                onSuccess={(campId, transactionId) =>
                  handlePaymentSuccess(campId, transactionId, selectedCamp)
                }
              />
            </Elements>
            <button
              onClick={() => setSelectedCamp(null)}
              className="btn btn-error btn-sm mt-3 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackCamp && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Feedback for {feedbackCamp.campName}
            </h3>
            <textarea
              className="w-full border p-2 rounded-md mb-3"
              rows={5}
              placeholder="Write your feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <button
              onClick={submitFeedback}
              className="btn btn-primary btn-sm w-full mb-2"
            >
              Submit Feedback
            </button>
            <button
              onClick={() => setFeedbackCamp(null)}
              className="btn btn-error btn-sm w-full"
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
