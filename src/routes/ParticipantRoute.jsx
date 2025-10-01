import React from "react";
import { Navigate, Outlet } from "react-router";
import { useUserRole } from "../contexts/UserRoleProvider";
import Loading from "../components/Loading";

const ParticipantRoute = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <Loading />; 

  if (role !== "participant") {
   
    return <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default ParticipantRoute;
