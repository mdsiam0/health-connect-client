import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";


const ManageRegisteredCamps = () => {
    const axiosSecure = axios.create({
        baseURL: "http://localhost:5000",
    });

    const queryClient = useQueryClient();


    const { data: registrations = [], isLoading } = useQuery({
        queryKey: ["registrations"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/registrations");
            return data;
        },
    });


    const confirmMutation = useMutation({
        mutationFn: async (id) =>
            await axiosSecure.patch(`/registrations/${id}`, {
                confirmationStatus: "Confirmed",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["registrations"]);
            Swal.fire("Success!", "Payment confirmed successfully.", "success");
        },
    });


    const cancelMutation = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/registrations/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["registrations"]);
            Swal.fire("Deleted!", "Registration has been cancelled.", "success");
        },
    });


    const handleConfirm = (id) => {
        confirmMutation.mutate(id);
    };


    const handleCancel = (id, paymentStatus, confirmationStatus) => {
        if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") {
            Swal.fire("Blocked", "This registration cannot be cancelled.", "warning");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You are about to cancel this registration!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                cancelMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Registered Camps</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Participant</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg, index) => (
                            <tr key={reg._id}>
                                <td>{index + 1}</td>
                                <td>{reg.campName}</td>
                                <td>${reg.campFees}</td>
                                <td>{reg.participantName}</td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-white ${reg.paymentStatus === "Paid"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                            }`}
                                    >
                                        {reg.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    {reg.confirmationStatus === "Pending" ? (
                                        <button
                                            onClick={() => handleConfirm(reg._id)}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Pending
                                        </button>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full bg-green-600 text-white">
                                            Confirmed
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleCancel(reg._id, reg.paymentStatus, reg.confirmationStatus)
                                        }
                                        disabled={
                                            reg.paymentStatus === "Paid" &&
                                            reg.confirmationStatus === "Confirmed"
                                        }
                                        className={`btn btn-sm ${reg.paymentStatus === "Paid" &&
                                                reg.confirmationStatus === "Confirmed"
                                                ? "btn-disabled"
                                                : "btn-error"
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;
