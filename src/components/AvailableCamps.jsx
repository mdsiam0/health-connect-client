import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router"; 

const fetchAllCamps = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error fetching camps:", error);
    return [];
  }
};

const AvailableCamps = () => {
  const { data: campsData, isLoading, isError } = useQuery({
    queryKey: ["all-camps"],
    queryFn: fetchAllCamps,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [gridCols, setGridCols] = useState(3); 

  const camps = Array.isArray(campsData) ? campsData : [];

  // ✅ filter + sort camps
  const filteredAndSortedCamps = useMemo(() => {
    let result = [...camps];

    // Filter by search term (name, location, professional)
    if (searchTerm.trim()) {
      result = result.filter((camp) =>
        [camp.name, camp.location, camp.professional]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    switch (sortOption) {
      case "participants":
        result.sort((a, b) => (b.participants || 0) - (a.participants || 0));
        break;
      case "fees":
        result.sort((a, b) => (a.fees || 0) - (b.fees || 0));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [camps, searchTerm, sortOption]);

  if (isLoading) return <p className="text-center py-10">Loading camps...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load camps.</p>;

  return (
    <section className="max-w-[1500px] mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Available Camps</h2>

      {/* Controls: Search + Sort + Layout toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, location, or professional..."
          className="w-full md:w-1/2 border rounded px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-4">
          {/* Sort */}
          <select
            className="border rounded px-3 py-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="participants">Most Registered</option>
            <option value="fees">Camp Fees</option>
            <option value="name">Alphabetical</option>
          </select>

          {/* Layout toggle */}
          <button
            onClick={() => setGridCols(gridCols === 3 ? 2 : 3)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {gridCols === 3 ? "2-Column View" : "3-Column View"}
          </button>
        </div>
      </div>

      {filteredAndSortedCamps.length === 0 ? (
        <p className="text-center text-gray-500">No camps found.</p>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridCols} gap-6`}
        >
          {filteredAndSortedCamps.map((camp) => (
            <div key={camp._id} className="bg-base-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
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
                <Link
                  to={`/camp-details/${camp._id}`}
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableCamps;
