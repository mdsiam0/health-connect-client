import React from "react";
import { Navigate, useLocation } from "react-router";
import { useUserRole } from "../contexts/UserRoleProvider";
import Loading from "../components/Loading";

const OrganizerRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading) return <Loading />;

  if (role !== "organizer") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default OrganizerRoute;
