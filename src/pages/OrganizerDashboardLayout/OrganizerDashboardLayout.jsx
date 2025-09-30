import React from "react";
import { NavLink, Outlet } from "react-router";

const OrganizerDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Organizer Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="add-camp">Add Camp</NavLink>
          <NavLink to="manage-camps">Manage Camps</NavLink>
          <NavLink to="registered-camps">Registered Camps</NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizerDashboardLayout;
