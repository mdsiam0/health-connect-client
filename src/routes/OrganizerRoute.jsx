import React from "react";
import { Navigate, useLocation } from "react-router";


import { useUserRole } from "../contexts/UserRoleProvider";
import Loading from "../components/Loading";

const OrganizerRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading) {
    // Show loading while role is being fetched
    return <Loading />;
  }

  if (role !== "organizer") {
    // Redirect non-organizers to home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render children if user is organizer
  return children;
};

export default OrganizerRoute;
