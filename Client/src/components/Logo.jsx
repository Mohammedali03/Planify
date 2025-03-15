import React from "react";
import { useLocation } from "react-router-dom";

const Logo = () => {
  const location = useLocation();
  return (
    <div
      className={`flex items-center text-2xl
       font-bold text-transparent
     bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600`}
    >
      Planify
    </div>
  );
};

export default Logo;
