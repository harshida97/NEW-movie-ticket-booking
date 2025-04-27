import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import OwnerLayout from "../layouts/OwnerLayout"
import RegisterLayout from "../layouts/RegisterLayout"

import Login from "../components/Login";
import Register from "../components/Register";
import TheaterList from "../components/TheaterList"

import UserHome from "../pages/user/UserHome";
import BookingForm from "../pages/user/BookingForm";
import ReviewsList from "../pages/user/ReviewList"

import AdminHome from "../pages/admin/AdminHome";

import OwnerHome from "../pages/owner/OwnerHome";
import AddShow from "../pages/owner/AddShow";
import RegisterTheater from "../pages/owner/RegisterTheater";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentFailed from "../pages/user/PaymentFailed";
import UsersDetails from "../pages/admin/UsersDetails";


export const router = createBrowserRouter([
    {
        path:"/register",
        element:<RegisterLayout />,
        errorElement: <h1>Error Page</h1>,
        children: [
            {
                path:"",
                element:<Register/>
            },
        ]
    },
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "",
                element: <Login/>,
            },
            {
                path: "login",
                element: <Login/>,

            },
            {
                path:"userhome",
                element: <UserHome />  
            },
            {

                path:"bookings/:showId",
                element: <BookingForm />

            },
            {
                path : "payment/success",
                 element : <PaymentSuccess />
            },
            {
                path : "payment/failed",
                element : <PaymentFailed />
            },
            {
                path : "reviews/:movieId",
                 element : <ReviewsList />
            }
           
            
              
            
            ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "login",
                element: <Login role="admin" />,
            },
            {
                path:"adminhome",
                element: <AdminHome/>
            },
            
            {
                path: "theaters",
                element: <TheaterList role="admin" />
            },
            {
                path :"userslist",
                element : <UsersDetails/>
            }
              
              

        ]

    },
    {
        path: "/owner",
        element: <OwnerLayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "login",
                element: <Login role="owner" />,
            },
            {
                path:"ownerhome",
                element:<OwnerHome/>

            },
                        
            {
                path:"addshows",
                element: <AddShow />
            },
            {
                path:"addtheater",
                element: <RegisterTheater />
            },
            {
                path: "theaters",
                element: <TheaterList role="owner" />
            },
            
              
            

        ]

    }
    

]);