import { Link, redirect, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Sidebar() {

  const {onLogout} = useContext(AuthContext);

  return (
    <ul className="menu w-full grow">
      {/* List item */}
      <Link to="/dashboard">
        <li>
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Dashboard"
          >
            {/* Home icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-6"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span className="is-drawer-close:hidden">Dashboard</span>
          </button>
        </li>
      </Link>
      {/* List item */}
      <Link to="/cards">
        <li>
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Virtual Cards"
          >
            {/* Settings icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="my-1.5 inline-block size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>

            <span className="is-drawer-close:hidden">Virtual Cards</span>
          </button>
        </li>
      </Link>
      <li className="mt-auto">
        <button
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Account"
        >
          {/* Account icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="my-1.5 inline-block size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <span className="is-drawer-close:hidden">Account</span>
        </button>
      </li>
      <li>
        <button
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Logout"
          onClick={onLogout}
        >
          {/* Logout icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="my-1.5 inline-block size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>

          <span className="is-drawer-close:hidden">Logout</span>
        </button>
      </li>
    </ul>
  );
}
