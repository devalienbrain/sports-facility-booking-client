import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "@/layout/HomeLayout";
import SportsHome from "@/pages/SportsHome";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import FacilityListing from "@/pages/FacilitiesList/FacilitiesList";
import FacilityBooking from "@/pages/FacilityBooking/FacilityBooking";
import Login from "@/pages/LoginPage";
import Register from "@/pages/RegisterPage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import DashboardLayout from "@/layout/DashboardLayout";
import DashbordUserProfile from "@/pages/DashboardPages/DashbordUserProfile";
import ManageUsers from "@/pages/DashboardPages/AdminDashboardPages/ManageUsers";
import ManageFacilities from "@/pages/DashboardPages/AdminDashboardPages/ManageFacilities";
import ManageBookings from "@/pages/DashboardPages/AdminDashboardPages/ManageBooking";
import AddFacility from "@/pages/DashboardPages/AdminDashboardPages/AddFacility";
import UpdateFacility from "@/pages/DashboardPages/AdminDashboardPages/UpdateFacility";
import AdminRegister from "@/pages/DashboardPages/AdminDashboardPages/AdminRegister";
import BookingPage from "@/pages/DashboardPages/UserDashboardPages/BookingPage";
import BookingByUser from "@/pages/DashboardPages/UserDashboardPages/BookingByUser";
import CheckoutForPayment from "@/pages/DashboardPages/UserDashboardPages/CheckoutForPayment";
import FacilityDetails from "@/pages/FacilityDetails/FacilityDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SportsHome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/facilities-list",
        element: <FacilityListing />,
      },
      {
        path: "/api/facility/:id",
        element: <FacilityDetails />,
      },
      {
        path: "/facility-booking/:id",
        element: <FacilityBooking />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashbordUserProfile />,
      },
      // Admin dashboard pages
      {
        path: "facilities",
        element: <ManageFacilities />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "addFacility",
        element: <AddFacility />,
      },
      {
        path: "updateFacility/:id",
        element: <UpdateFacility />,
      },
      {
        path: "bookings",
        element: <ManageBookings />,
      },

      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "register",
        element: <AdminRegister />,
      },
      // User dashboard pages
      {
        path: "bookAFacility",
        element: <BookingPage />,
      },
      {
        path: "userBookings",
        element: <BookingByUser />,
      },
      {
        path: "checkoutForPayment",
        element: <CheckoutForPayment />,
      },
    ],
  },
]);
export default router;
