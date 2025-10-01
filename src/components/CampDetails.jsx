import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";


const fetchCamp = async (campId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps/${campId}`);
  return res.data;
};

const CampDetails = () => {
  const { campId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    phone: "",
    gender: "",
    emergencyContact: "",
  });

 
  const { data: camp, isLoading, isError } = useQuery({
    queryKey: ["camp", campId],
    queryFn: () => fetchCamp(campId),
  });

 
  const joinCampMutation = useMutation({
    mutationFn: async () => {
      if (!camp) throw new Error("Camp not loaded yet");
      if (!user) throw new Error("User must be logged in");

      const registration = {
        campId,
        campName: camp.name,
        campFees: camp.fees,
        location: camp.location,
        professional: camp.professional,
        participantName: user.displayName || user.name,
        participantEmail: user.email,
        ...formData,
        paymentStatus: "Unpaid",
        confirmationStatus: "Pending",
      };

    
      await axios.post(
        `${import.meta.env.VITE_API_URL}/registrations`,
        registration,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-camp/${campId}`,
        { participants: camp.participants + 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      return { ...camp, participants: camp.participants + 1 };
    },
    onSuccess: (updatedCamp) => {
      Swal.fire("Success", "You have joined the camp!", "success");
      queryClient.setQueryData(["camp", campId], updatedCamp); 
      setIsModalOpen(false);
    },
    onError: (err) => {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to join the camp", "error");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoinCamp = (e) => {
    e.preventDefault();
    joinCampMutation.mutate();
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load camp.</p>;
  if (!camp) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{camp.name}</h1>
      <img src={camp.image} alt={camp.name} className="w-full h-120 object-cover mb-4" />
      <p><strong>Fees:</strong> ${camp.fees}</p>
      <p><strong>Date & Time:</strong> {camp.date ? new Date(camp.date).toLocaleString() : "TBD"}</p>
      <p><strong>Location:</strong> {camp.location}</p>
      <p><strong>Healthcare Professional:</strong> {camp.professional}</p>
      <p><strong>Participants:</strong> {camp.participants}</p>
      <p className="my-4">{camp.description}</p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Join Camp
      </button>

      
      {isModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Join Camp</h2>
            <form onSubmit={handleJoinCamp} className="flex flex-col gap-3">
              <input type="text" value={camp.name} readOnly className="border p-2 rounded bg-gray-100" />
              <input type="text" value={camp.fees} readOnly className="border p-2 rounded bg-gray-100" />
              <input type="text" value={camp.location} readOnly className="border p-2 rounded bg-gray-100" />
              <input type="text" value={camp.professional} readOnly className="border p-2 rounded bg-gray-100" />
              <input type="text" value={user.displayName || user.name} readOnly className="border p-2 rounded bg-gray-100" />
              <input type="email" value={user.email} readOnly className="border p-2 rounded bg-gray-100" />
              <input type="number" name="age" placeholder="Age" required onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="phone" placeholder="Phone Number" required onChange={handleChange} className="border p-2 rounded" />
              <select name="gender" required onChange={handleChange} className="border p-2 rounded">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="emergencyContact" placeholder="Emergency Contact" required onChange={handleChange} className="border p-2 rounded" />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
