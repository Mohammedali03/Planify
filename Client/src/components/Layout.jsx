import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`absolute ${
          isOpen ? "left-0 z-10" : "-left-64"
        } transition-all duration-300 lg:relative lg:left-0 h-full w-64`}
      >
        <Sidebar setIsOpen={setIsOpen} />
      </div>

      <main className="h-full w-full flex-1 overflow-y-auto">
        <Outlet context={{ setIsOpen }} />
      </main>
    </div>
  );
};

export default Layout;
