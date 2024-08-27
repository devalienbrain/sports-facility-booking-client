import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
