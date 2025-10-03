import React, { useState, useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Pagination from "../../components/Pagination";


const fetchPayments = async (email) => {
  const res = await axios.get(
    `https://mcms-server-three.vercel.app/payments/participant/${email}`
  );
  return res.data;
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: () => fetchPayments(user.email),
    enabled: !!user?.email,
  });

  const totalPages = Math.ceil(payments.length / rowsPerPage);

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return payments.slice(start, start + rowsPerPage);
  }, [currentPage, payments]);

  if (isLoading) return <p>Loading payment history...</p>;
  if (error) return <p className="text-red-500">Error fetching payment history.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Fees</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Confirmation Status</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.length > 0 ? (
              paginatedPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{payment.campName}</td>
                  <td className="px-4 py-2">${payment.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        payment.paymentStatus === "Paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {payment.paymentStatus || "Unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        payment.confirmationStatus === "Confirmed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {payment.confirmationStatus || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 break-all">{payment.transactionId}</td>
                  <td className="px-4 py-2">
                    {payment.date ? new Date(payment.date).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PaymentHistory;
