import Dashboard from "@/layout/DashboardLayout";
import Layout from "@/layout/Layout";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import BookingPage from "@/pages/DashboardPages/BookingPage";
import FacilityListingPage from "@/pages/DashboardPages/FacilityListing";
import ManageBookings from "@/pages/DashboardPages/ManageBooking";
import ManageFacilities from "@/pages/DashboardPages/ManageFacilities";
import ManageUsers from "@/pages/DashboardPages/ManageUsers";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import FacilityListing from "@/pages/FacilitiesList/FacilitiesList";
import FacilityBooking from "@/pages/FacilityBooking/FacilityBooking";
import Login from "@/pages/LoginPage";
import Register from "@/pages/RegisterPage";
import SportsHome from "@/pages/SportsHome";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "/facility-booking",
        element: <FacilityBooking />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "facilities",
        element: <ManageFacilities />,
      },
      {
        path: "bookings",
        element: <ManageBookings />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
    ],
  },
]);
export default router;
