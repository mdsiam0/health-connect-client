import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";


const UserRoleContext = createContext(null);


const fetchUserByEmail = async (email) => {
  const res = await fetch(`http://localhost:5000/users/${email}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};


export const UserRoleProvider = ({ children }) => {
  const { user: firebaseUser } = useAuth();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", firebaseUser?.email],
    queryFn: () => fetchUserByEmail(firebaseUser.email),
    enabled: !!firebaseUser,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <UserRoleContext.Provider value={{ role: user?.role, user, isLoading }}>
      {children}
    </UserRoleContext.Provider>
  );
};


export const useUserRole = () => useContext(UserRoleContext);

