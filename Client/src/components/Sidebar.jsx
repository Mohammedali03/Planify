import React from "react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  TrophyIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";

const links = [
  { name: "Dashboard", link: "/dashboard", icon: HomeIcon },
  { name: "Study Room", link: "/study-room", icon: AcademicCapIcon },
  { name: "Study Goals", link: "/study-goals", icon: CheckCircleIcon },
  { name: "Leaderboard", link: "/leaderboard", icon: TrophyIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      className={` py-4 md:p-4 bg-white dark:bg-[#222222]
      dark:text-white w-fit ${
        location.pathname === "/study-room" ? "w-fit px-2" : "lg:w-full px-2"
      } h-full
      border-r border-gray-200 dark:border-gray-800 flex flex-col`}
    >
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div>
            <Logo />
          </div>
          <div className="flex flex-col items-center lg:items-start mt-8 gap-3">
            {links.map(({ link, name, icon: Icon }) => {
              return (
                <Link
                  key={name}
                  to={link}
                  className={`${
                    location.pathname === link ? "bg-indigo-400 text-white" : ""
                  } flex items-center gap-3 p-3 hover:cursor-pointer
                  hover:text-white hover:bg-indigo-500
                  rounded-md duration-300 transition-all`}
                >
                  <Icon className="w-fit h-6" />
                  <span
                    className={`${
                      location.pathname === "/study-room" ? "hidden" : "inline"
                    } font-medium`}
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div
          className="flex gap-3 p-3 
           text-red-600 hover:cursor-pointer hover:bg-red-600 hover:text-white 
            rounded-md duration-300 transition-all mt-auto"
        >
          <Cog8ToothIcon className="w-fit h-6" />
          <Link
            className={`${
              location.pathname === "/study-room" ? "hidden" : "inline"
            } font-medium`}
            to="/settings"
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
