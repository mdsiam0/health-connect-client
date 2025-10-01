import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AvailableCamps from "../components/AvailableCamps";
import OrganizerDashboardLayout from "../pages/OrganizerDashboardLayout/OrganizerDashboardLayout";
import OrganizerProfile from "../pages/OrganizerDashboardLayout/OrganizerProfile";
import AddCamp from "../pages/OrganizerDashboardLayout/AddCamp";
import ManageCamps from "../pages/OrganizerDashboardLayout/ManageCamps";
import RegisteredCamps from "../pages/OrganizerDashboardLayout/RegisteredCamps";
import Analytics from "../pages/OrganizerDashboardLayout/Analytics";
import PaymentHistory from "../pages/OrganizerDashboardLayout/PaymentHistory";
import ManageRegisteredCamps from "../pages/OrganizerDashboardLayout/ManageRegisteredCamps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "available-camps", element: <AvailableCamps /> },
      {
        path: "/dashboard",
        element: <OrganizerDashboardLayout />,
        children: [
          { index: true, element: <OrganizerProfile /> },
          { path: "profile", element: <OrganizerProfile /> },
          { path: "analytics", element: <Analytics /> },
          
          { path: "add-camp", element: <AddCamp /> },
          { path: "manage-camps", element: <ManageCamps /> },
          { path: "registered-camps", element: <RegisteredCamps /> },
          { path: "manage-registered-camps", element: <ManageRegisteredCamps /> },
          { path: "payment-history", element: <PaymentHistory /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
