import React, { useState } from "react";
import Sidebar from "./Routes/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Force sidebar to behave like mobile on /study-room
  const isMobileView = location.pathname === "/study-room";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`absolute ${
          isOpen ? "left-0 z-10" : "-left-64"
        } transition-all duration-300 ${
          isMobileView && !isOpen
            ? "lg:absolute lg:-left-64"
            : "lg:relative lg:left-0"
        } h-full w-64`}
      >
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>

      {/* Main Content */}
      <main className="h-full w-full flex-1 overflow-y-auto">
        <Outlet context={{ setIsOpen }} />
      </main>
    </div>
  );
};

export default Layout;
