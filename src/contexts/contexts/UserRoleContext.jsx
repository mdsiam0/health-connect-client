import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";


const UserRoleContext = createContext(null);

const fetchUserByEmail = async (email) => {
  const res = await fetch(`https://mcms-server-three.vercel.app/users/${email}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const UserRoleProvider = ({ children }) => {
  const { user: firebaseUser, loading: authLoading } = useAuth();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["userRole", firebaseUser?.email],
    queryFn: () => fetchUserByEmail(firebaseUser.email),
    enabled: !!firebaseUser, // fetch only if firebaseUser exists
    staleTime: 1000 * 60 * 5,
  });

  return (
    <UserRoleContext.Provider
      value={{
        role: user?.role || null,
        user,
        isLoading: authLoading || isLoading,
        isError,
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
