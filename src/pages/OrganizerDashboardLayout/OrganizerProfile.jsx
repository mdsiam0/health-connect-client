import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const OrganizerProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

 
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(user.email)}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  const handleUpdate = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Update Profile",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${profile?.name || ""}" />
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${profile?.email || ""}" disabled />
        <input id="swal-phone" class="swal2-input" placeholder="Phone" value="${profile?.phone || ""}" />
        <input id="swal-pic" class="swal2-input" placeholder="Profile Image URL" value="${profile?.profilePic || ""}" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          email: document.getElementById("swal-email").value,
          phone: document.getElementById("swal-phone").value,
          profilePic: document.getElementById("swal-pic").value,
        };
      },
    });

    if (formValues) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(user.email)}`,
          formValues
        );
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries(["profile", user?.email]); // 🔄 Refetch updated profile
      } catch (err) {
        console.error(err);
        toast.error("Failed to update profile.");
      }
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-center">
      <img
        src={profile?.profilePic || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold">{profile?.name || "No Name"}</h2>
      <p className="text-gray-600">{profile?.email}</p>
      <p className="text-gray-600">{profile?.phone || "No phone added"}</p>

      <button
        onClick={handleUpdate}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Update
      </button>
    </div>
  );
};

export default OrganizerProfile;
