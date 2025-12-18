import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import CreateRequest from "../Pages/Dashboard/DonorPages/CreateRequest";
import AllUsers from "../Pages/Dashboard/AdminPages/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequests from "../Pages/Dashboard/DonorPages/MyRequests";
import Funding from "../Pages/Funding";
import PaymentSuccess from "../Pages/PaymentSuccess";
import SearchRequest from "../Pages/SearchRequest";
import DonationRequests from "../Pages/DonationRequests";
import DonationDetails from "../Pages/DonationDetails";
import EditRequest from "../Pages/Dashboard/DonorPages/EditRequest";
import Profile from "../Pages/Dashboard/Profile";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<ErrorPage></ErrorPage>,
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
            },
            {
                path: '/search',
                element: <SearchRequest></SearchRequest>
            },
            {
                path: '/pending-requests',
                element: <DonationRequests></DonationRequests>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
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
            },
            {
                path: 'edit-my-request/:id',
                element: <EditRequest></EditRequest>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            }

        ]
    }

]);

export default router;