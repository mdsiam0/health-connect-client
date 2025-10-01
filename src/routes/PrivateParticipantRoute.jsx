import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUserRole } from "../contexts/UserRoleContext";

const PrivateParticipantRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role !== "participant") return <Navigate to="/" replace />;

  return children;
};

export default PrivateParticipantRoute;
