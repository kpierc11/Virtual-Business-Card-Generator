import { Outlet, useNavigate } from "react-router";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashboardLayout() {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn) {
    return (
      <>
        <div className="drawer lg:drawer-open">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle inline"
          />
          <div className="drawer-content">
            {/* Navbar */}
            <Nav></Nav>
            {/* Page content here */}
            <div className="p-4">
              <Outlet />
            </div>
          </div>

          <div className="drawer-side is-drawer-close:overflow-visible">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
              <Sidebar></Sidebar>
            </div>
          </div>
        </div>
      </>
    );
  }
}
