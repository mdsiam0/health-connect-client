import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const fetchPopularCamps = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps?sort=participants&limit=6`);
   
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error fetching camps:", error);
    return [];
  }
};

const PopularCamps = () => {
  const { data: campsData, isLoading, isError } = useQuery({
    queryKey: ["popular-camps"],
    queryFn: fetchPopularCamps,
  });


  const camps = Array.isArray(campsData) ? campsData : [];

  if (isLoading) return <p className="text-center py-10">Loading camps...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load camps.</p>;

  return (
    <section className="max-w-[1500px] mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Popular Camps</h2>

      {camps.length === 0 ? (
        <p className="text-center text-gray-500">No camps available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp) => (
            <div key={camp._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={camp.image || "https://via.placeholder.com/400x200.png?text=Camp+Image"}
                alt={camp.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{camp.name}</h3>
                <p className="text-gray-600 mb-1">Fee: ${camp.fees || "0"}</p>
                <p className="text-gray-600 mb-1">
                  Date & Time: {camp.date ? new Date(camp.date).toLocaleString() : "TBD"}
                </p>
                <p className="text-gray-600 mb-1">Location: {camp.location || "Unknown"}</p>
                <p className="text-gray-600 mb-1">
                  Healthcare Professional: {camp.professional || "TBD"}
                </p>
                <p className="text-gray-600 mb-3">Participants: {camp.participants || 0}</p>
                
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link
          to="/available-camps"
          className=" btn btn-primary"
        >
          See All Camps
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
