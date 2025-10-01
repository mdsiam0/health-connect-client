import React from "react";
import { Outlet, NavLink } from "react-router";

const ParticipantDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      
      <aside className="w-64 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-6">Participant Dashboard</h2>
        <ul className="menu">
          <li>
            <NavLink to="/participant-dashboard/analytics">📊 Analytics</NavLink>
          </li>
          <li>
            <NavLink to="/participant-dashboard/profile">👤 Profile</NavLink>
          </li>
          <li>
            <NavLink to="/participant-dashboard/registered-camps">📅 Registered Camps</NavLink>
          </li>
          <li>
            <NavLink to="/participant-dashboard/payment-history">💳 Payment History</NavLink>
          </li>
        </ul>
      </aside>

      
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ParticipantDashboardLayout;
