import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import ManageProduct from "../Pages/Dashboard/ManageProduct";
import CreateRequest from "../Pages/Dashboard/CreateRequest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                element: <MainDashboard></MainDashboard>
            },
            {
                path: 'create-request',
                element: <CreateRequest></CreateRequest>
            },
            {
                path: 'manage-product',
                element: <ManageProduct />
            },
        ]
    }

]);

export default router;