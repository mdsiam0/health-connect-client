import React from "react";
import { Navigate } from "react-router";
import { useUserRole } from "../contexts/UserRoleProvider";
import Loading from "../components/Loading";

const ParticipantRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <Loading />;

  if (role !== "participant") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ParticipantRoute;
