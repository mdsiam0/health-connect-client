// src/pages/OrganizerDashboardLayout/AddCamp.jsx
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth"; // adjust path if yours is elsewhere

const AddCamp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      // Attach organizer info
      const payload = {
        ...formData,
        fees: Number(formData.fees) || 0,
        participants: 0,
        organizerEmail: user?.email || "unknown@org.com",
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/camps`, payload);
      toast.success("Camp added successfully");
      reset();
      // Optionally navigate to manage-camps
      navigate("/dashboard/manage-camps");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add camp");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add A Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name", { required: "Camp name required" })} placeholder="Camp Name" className="w-full input" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input {...register("image")} placeholder="Image URL" className="w-full input" />
        <input {...register("fees")} type="number" placeholder="Camp Fees (0 if free)" className="w-full input" />
        <input {...register("date")} type="datetime-local" className="w-full input" />
        <input {...register("location")} placeholder="Location" className="w-full input" />
        <input {...register("professional")} placeholder="Healthcare Professional Name" className="w-full input" />
        <textarea {...register("description")} placeholder="Description" className="w-full textarea" rows={4} />

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">Add Camp</button>
          <button type="button" onClick={() => reset()} className="btn btn-ghost">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
