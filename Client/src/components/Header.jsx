import React from "react";
import avatar from "../images/avatar.jpeg";
import fire from "../images/svg-fire-flame-design2630.logowik.com.webp";
import arrow from "../images/arrow-down.webp";

const Header = () => {
  return (
    <div className="flex justify-between h-13 items-center px-5 border-b  border-gray-300">
      <div className="flex items-center space-x-1">
        <img src={fire} alt="streak fire" className="size-6" />
        <span className="text-sm">
          streak <span className="font-bold">2</span>
        </span>
      </div>
      <div className="flex items-center space-x-5 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>

        <div className="flex items-center hover:cursor-pointer">
          <img
            src={avatar}
            alt="avatar"
            className="size-8 rounded-full"
            loading="lazy"
          />
          <img src={arrow} alt="arrow-down" loading="lazy" className="size-6" />
        </div>
      </div>
    </div>
  );
};

export default Header;
