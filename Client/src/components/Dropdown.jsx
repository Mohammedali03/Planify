import React from "react";
import { useAuth } from "./AuthProvider";
import { motion } from "framer-motion";

const Dropdown = () => {
  const { logout } = useAuth();

  return (
    <motion.div
      className="absolute inline-block text-left"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="origin-top-right absolute top-[18px] -right-13 mt-2 w-56 rounded-md 
        shadow-lg bg-whites border border-gray-100 bg-white"
      >
        <div
          className="overflow-hidden rounded-md "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div
            className="flex items-center px-4 py-2 cursor-pointer font-medium
          duration-300 hover:bg-indigo-200 hover:text-indigo-600 "
          >
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <button className="block px-4 py-2 text-sm cursor-pointer">
              Profile
            </button>
          </div>
          <div
            className="flex items-center  text-red-600 px-4 py-2 font-medium
            cursor-pointer duration-300 hover:bg-red-200"
            onClick={logout}
          >
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <button className="block px-4 py-2 text-sm cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dropdown;
