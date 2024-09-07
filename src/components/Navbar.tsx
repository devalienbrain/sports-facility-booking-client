import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust path as necessary
import logo from "/resources/logo.png";

const Navbar = () => {
  // Access the user from Redux store
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/about-us">
                  <p>About</p>
                </Link>
              </li>
              <li>
                <a>Facilities</a>
                <ul className="p-2">
                  <li>
                    <Link to="/facilities-list">
                      <p>Facilities list</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/facility-booking">
                      <p>Facility booking</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/contact-us">
                  <p>Contact</p>
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-7" />
              <p className="font-bold text-2xl">Sportly</p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/about-us">
                <p>About</p>
              </Link>
            </li>
            <li>
              <details>
                <summary>Facilities</summary>
                <ul className="p-2 z-10">
                  <li>
                    <Link to="/facilities-list">
                      <p>Facilities list</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/facility-booking">
                      <p>Facility booking</p>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/contact-us">
                <p>Contact</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          {user.user ? (
            <Link to="/dashboard">
              <button className="flex items-center gap-1 border border-slate-600 rounded-3xl py-2 px-4 ">
                My Dashboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="hover:text-slate-400">Login</button>
              </Link>
              <Link to="/register">
                <button className="border border-slate-700 hover:bg-slate-700 py-2 px-4 rounded-3xl">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
