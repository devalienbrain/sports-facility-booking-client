import Layout from "@/layout/Layout";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
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
    ],
  },
]);
export default router;
