import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Header = () => {
  // default image url (NO image)
  const defaultUrl = "http://localhost:8000/default-avatar.png";

  const { user } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);

  // Check the theme in local storage
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const { setIsOpen } = useOutletContext();

  // Toggle the theme based on the user's preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // formatting the date
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const formatDate = `${day} ${month}, ${year}`;

  return (
    <div className="flex justify-between h-13 items-center px-5 border-b border-gray-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="flex items-center space-x-1 font-semibold"
      >
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setIsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <span>{formatDate}</span>
        </div>
      </motion.div>
      <div className="flex items-center space-x-1 ">
        <motion.div
          className="cursor-pointer"
          onClick={() => setIsDarkMode(!isDarkMode)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9 rounded-md p-2 flex items-center justify-center
              duration-300 hover:bg-indigo-200 hover:text-indigo-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591
                1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9 rounded-md p-2 flex items-center justify-center
              duration-300 hover:bg-indigo-200 hover:text-indigo-600 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753
                9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </motion.div>

        {/* Notification Icon */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-9 rounded-md p-2 flex items-center justify-center
          duration-300 hover:bg-indigo-200 hover:text-indigo-600 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967
             0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </motion.svg>

        {/* Profile  */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="relative flex items-center gap-2 ml-2 hover:cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div
            className="flex items-center justify-center size-9 rounded-full
            overflow-hidden border border-gray-300"
          >
            {user?.profile_picture_url === defaultUrl ? (
              <span
                className="text-lg size-full font-semibold text-white capitalize
                bg-indigo-600 flex items-center justify-center"
              >
                {user?.name[0]}
              </span>
            ) : (
              <img
                src={user?.profile_picture_url}
                alt="Profile picture"
                className="size-full"
              />
            )}
          </div>
          {showDropdown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
          {showDropdown && <Dropdown />}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
