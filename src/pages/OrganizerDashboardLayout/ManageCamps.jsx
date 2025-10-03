import React, { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Pagination from "../../components/Pagination";

const fetchOrganizerCamps = async (organizerEmail) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/organizer-camps/${encodeURIComponent(organizerEmail)}`
  );
  return Array.isArray(res.data) ? res.data : [];
};

const ManageCamps = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["organizer-camps", user?.email],
    queryFn: () => fetchOrganizerCamps(user?.email || ""),
    enabled: !!user?.email,
  });

 
  const totalPages = Math.ceil(camps.length / rowsPerPage);
  const paginatedCamps = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return camps.slice(start, start + rowsPerPage);
  }, [currentPage, camps]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/delete-camp/${id}`);
        toast.success("Camp deleted successfully");
        queryClient.invalidateQueries(["organizer-camps", user?.email]);
        queryClient.invalidateQueries(["all-camps"]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete camp");
      }
    }
  };

  const handleEdit = async (camp) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Camp",
      html: `
        <div class="grid gap-2 sm:grid-cols-2">
          <input id="swal-name" class="swal2-input" placeholder="Camp Name" value="${camp.name || ""}" />
          <input id="swal-image" class="swal2-input" placeholder="Image URL" value="${camp.image || ""}" />
          <input id="swal-fees" type="number" class="swal2-input" placeholder="Fees" value="${camp.fees || 0}" />
          <input id="swal-date" type="datetime-local" class="swal2-input" value="${camp.date ? new Date(camp.date).toISOString().slice(0,16) : ""}" />
          <input id="swal-location" class="swal2-input" placeholder="Location" value="${camp.location || ""}" />
          <input id="swal-professional" class="swal2-input" placeholder="Healthcare Professional" value="${camp.professional || ""}" />
          <textarea id="swal-description" class="swal2-textarea col-span-2" placeholder="Description">${camp.description || ""}</textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      width: "600px",
      customClass: { popup: 'max-w-full' },
      preConfirm: () => ({
        name: document.getElementById("swal-name").value,
        image: document.getElementById("swal-image").value,
        fees: Number(document.getElementById("swal-fees").value) || 0,
        date: document.getElementById("swal-date").value,
        location: document.getElementById("swal-location").value,
        professional: document.getElementById("swal-professional").value,
        description: document.getElementById("swal-description").value,
      }),
    });

    if (formValues) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/update-camp/${camp._id}`, formValues);
        toast.success("Camp updated successfully!");
        queryClient.invalidateQueries(["organizer-camps", user?.email]);
        queryClient.invalidateQueries(["all-camps"]);
      } catch (err) {
        console.error(err);
        toast.error("Update failed");
      }
    }
  };

  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <h3 className="text-xl mb-4 font-semibold">Manage Camps</h3>
      {camps.length === 0 ? (
        <p className="text-gray-600">No camps created yet. Add one from Add Camp.</p>
      ) : (
        <>
          <table className="table w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-100">
                <th>Camp</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Professional</th>
                <th>Participants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCamps.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm opacity-70">{c.fees ? `$${c.fees}` : "Free"}</div>
                  </td>
                  <td>{c.date ? new Date(c.date).toLocaleString() : "TBD"}</td>
                  <td>{c.location}</td>
                  <td>{c.professional}</td>
                  <td>{c.participants || 0}</td>
                  <td className="flex flex-wrap gap-2">
                    <button onClick={() => handleEdit(c)} className="btn btn-sm btn-outline">Edit</button>
                    <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default ManageCamps;
