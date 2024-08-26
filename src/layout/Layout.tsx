import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen">
        <h1>Hellooo mamuu</h1>
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
