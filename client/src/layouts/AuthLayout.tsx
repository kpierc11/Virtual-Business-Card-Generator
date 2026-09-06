import { Navigate, Outlet } from "react-router";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function AuthLayout() {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <>
      <div className="max-lg:collapse bg-base-200 lg:mb-10 shadow-sm w-full rounded-md">
        <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
        <label
          htmlFor="navbar-1-toggle"
          className="fixed inset-0 hidden max-lg:peer-checked:block"
        ></label>
        <div className="collapse-title navbar">
          <div className="navbar-start">
            <label
              htmlFor="navbar-1-toggle"
              className="btn btn-ghost lg:hidden"
            >
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
            </label>
            <button className="btn btn-ghost text-xl">VBC Generator</button>
          </div>
          <div className="navbar-center hidden lg:flex mr-auto">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="collapse-content lg:hidden z-1">
          <ul className="menu">
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center mb-20 mt-20">
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  );
}
