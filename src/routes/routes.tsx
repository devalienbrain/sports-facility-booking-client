import Layout from "@/layout/Layout";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
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
    ],
  },
]);
export default router;
