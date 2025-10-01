import React from "react";
import { Navigate } from "react-router";

import useAuth from "../hooks/useAuth";
import { useUserRole } from "../contexts/UserRoleProvider";

const PrivateOrganizerRoute = ({ children }) => {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();


  if (authLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

 
  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

 
  if (role !== "organizer") {
    return <Navigate to="/" replace />;
  }


  return children;
};

export default PrivateOrganizerRoute;
