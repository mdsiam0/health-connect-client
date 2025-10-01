import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { UserRoleProvider } from "./contexts/UserRoleProvider.jsx";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <UserRoleProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <RouterProvider router={router} />
        </UserRoleProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
