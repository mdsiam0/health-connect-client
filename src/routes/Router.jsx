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


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'available-camps',
                Component: AvailableCamps,
            },
            {
                path: "/dashboard",
                Component: OrganizerDashboardLayout,
                children: [
                    {
                        index: true, 
                        Component: OrganizerProfile, 
                    },
                    { path: "profile", Component: OrganizerProfile },
                    { path: "add-camp", Component: AddCamp },
                    { path: "manage-camps", Component: ManageCamps },
                    { path: "registered-camps", Component: RegisteredCamps },
                ],
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    },
]);