import Dashboard from "@/layout/DashboardLayout";
import Layout from "@/layout/Layout";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import AddFacility from "@/pages/DashboardPages/AddFacility";
import AdminRegister from "@/pages/DashboardPages/AdminRegister";
import BookingPage from "@/pages/DashboardPages/BookingPage";
import DashbordHomeUser from "@/pages/DashboardPages/DashbordHomeUser";
import ManageBookings from "@/pages/DashboardPages/ManageBooking";
import ManageFacilities from "@/pages/DashboardPages/ManageFacilities";
import ManageUsers from "@/pages/DashboardPages/ManageUsers";
import UpdateFacility from "@/pages/DashboardPages/UpdateFacility";
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
        // path: "dashboard",
        index: true,
        element: <DashbordHomeUser />,
      },
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
        path: "bookAFacility",
        element: <BookingPage />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "register",
        element: <AdminRegister />,
      },
    ],
  },
]);
export default router;
