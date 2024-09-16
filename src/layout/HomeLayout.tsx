import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white">
        <Outlet />
      </div>
    </>
  );
};
export default HomeLayout;
