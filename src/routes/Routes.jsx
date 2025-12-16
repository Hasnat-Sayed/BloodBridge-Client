import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import CreateRequest from "../Pages/Dashboard/CreateRequest";
import AllUsers from "../Pages/Dashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequests from "../Pages/Dashboard/MyRequests";
import Funding from "../Pages/Funding";
import PaymentSuccess from "../Pages/PaymentSuccess";

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
            {
                path: '/funding',
                element: <PrivateRoute><Funding></Funding></PrivateRoute>
            },
            {
                path: '/payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: '/payment-cancelled',
                element: <PaymentSuccess></PaymentSuccess>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
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
                path: 'all-users',
                element: <AllUsers />
            },
            {
                path: 'my-requests',
                element: <MyRequests></MyRequests>
            }

        ]
    }

]);

export default router;