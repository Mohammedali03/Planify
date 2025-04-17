import React from "react";

const SecondaryButton = ({ children, onclick, loading = null }) => {
  return (
    <>
      <button
        disabled={loading}
        className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 h-9 
        font-semibold text-white shadow-xs hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 
      focus-visible:outline-indigo-600 duration-300 cursor-pointer"
        onClick={onclick}
      >
        {children}
      </button>
    </>
  );
};

export default SecondaryButton;
