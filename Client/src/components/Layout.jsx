import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <div className="flex h-screen">
      <div
        className={`w-fit ${
          location.pathname === "/study-room" ? "w-20" : "xl:w-64"
        } `}
      >
        <Sidebar />
      </div>

      <main className="h-full w-full flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
