// src/hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const fetchUserRole = async (email) => {
  const res = await fetch(`https://mcms-server-three.vercel.app/users/role/${email}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user role");
  }
  return res.json();
};

const useUserRole = () => {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: () => fetchUserRole(user.email),
    enabled: !!user?.email, // only run if email exists
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return {
    role: data?.role || null,
    isLoading,
    isError,
  };
};

export default useUserRole;
