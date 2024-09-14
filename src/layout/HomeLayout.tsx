import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <Outlet />
      </div>
    </>
  );
};
export default HomeLayout;
