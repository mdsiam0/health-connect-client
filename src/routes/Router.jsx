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
import OrganizerRoute from "./OrganizerRoute";
import ParticipantRoute from "./ParticipantRoute";
import CampDetails from "../components/CampDetails";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "available-camps", element: <AvailableCamps /> },
      { path: "camp-details/:campId", element: <CampDetails /> },
      {
        path: "dashboard",
        element: <OrganizerDashboardLayout />,
        children: [
          { index: true, element: <OrganizerProfile /> },
          { path: "profile", element: <OrganizerProfile /> },
          {
            path: "analytics",
            element: (
              <ParticipantRoute>
                <Analytics />
              </ParticipantRoute>
            ),
          },
          {
            path: "registered-camps",
            element: (
              <ParticipantRoute>
                <RegisteredCamps />
              </ParticipantRoute>
            ),
          },
          {
            path: "payment-history",
            element: (
              <ParticipantRoute>
                <PaymentHistory />
              </ParticipantRoute>
            ),
          },
          {
            path: "add-camp",
            element: (
              <OrganizerRoute>
                <AddCamp />
              </OrganizerRoute>
            ),
          },
          {
            path: "manage-camps",
            element: (
              <OrganizerRoute>
                <ManageCamps />
              </OrganizerRoute>
            ),
          },
          {
            path: "manage-registered-camps",
            element: (
              <OrganizerRoute>
                <ManageRegisteredCamps />
              </OrganizerRoute>
            ),
          },
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
  {
    path: "*", 
    element: <NotFound></NotFound>
  },
]);
