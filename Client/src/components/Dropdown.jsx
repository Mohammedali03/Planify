import React from "react";
import { useAuth } from "./AuthProvider";
import { motion } from "framer-motion";

const Dropdown = ({ setShowProfile }) => {
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
            duration-300 hover:bg-indigo-200 hover:text-indigo-600 border-b border-[#eee]"
            onClick={() => setShowProfile(true)}
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>

            <button className="block px-4 py-2 text-sm cursor-pointer">
              Edit Profile
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
