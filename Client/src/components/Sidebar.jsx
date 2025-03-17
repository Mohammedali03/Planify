import React from "react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  TrophyIcon,
  Cog8ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const links = [
  { name: "Dashboard", link: "/dashboard", icon: HomeIcon },
  { name: "Study Room", link: "/study-room", icon: AcademicCapIcon },
  { name: "Study Goals", link: "/study-goals", icon: CheckCircleIcon },
  { name: "Leaderboard", link: "/leaderboard", icon: TrophyIcon },
];

const Sidebar = ({ setIsOpen }) => {
  const location = useLocation();

  return (
    <div
      className="flex flex-col p-3 bg-white dark:bg-[#222222]
      dark:text-white w-full h-full
      border-r border-gray-200 dark:border-gray-800"
    >
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-center w-full">
            <Logo />
            {/* Show XMarkIcon only on mobile or when sidebar is open on /study-room */}
            <XMarkIcon
              className={`size-6 cursor-pointer ${
                location.pathname === "/study-room" ? "block" : "lg:hidden"
              }`}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex flex-col items-center lg:items-start mt-8 gap-3">
            {links.map(({ link, name, icon: Icon }) => {
              return (
                <Link
                  key={name}
                  to={link}
                  className={`${
                    location.pathname === link
                      ? "bg-indigo-500 text-white hover:bg-indigo-400"
                      : "hover:bg-indigo-200 hover:text-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white"
                  } flex items-center w-full gap-3 p-3 hover:cursor-pointer
                  
                  rounded-md duration-300 transition-all`}
                  onClick={() => setIsOpen(false)} // Close sidebar on link click
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium">{name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          to="/settings"
          className="flex gap-3 p-3 
           text-red-600 hover:cursor-pointer hover:bg-red-600 hover:text-white 
            rounded-md duration-300 transition-all mt-auto"
          onClick={() => setIsOpen(false)} // Also close sidebar on settings click
        >
          <Cog8ToothIcon className="size-6" />
          <span className={`font-medium`}>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
