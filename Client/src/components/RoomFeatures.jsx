import React from "react";
import { useState } from "react";
import Timer from "./Timer";

const RoomFeatures = () => {
  const [showTimer, setShowTimer] = useState(false);
  return (
    <div className="w-fit p-[6px] rounded-md flex flex-col items-center gap-[10px] ml-2 bg-[#fcfcfc]">
      <div
        className={`flex items-center flex-col rounded-md px-3 py-[6px] hover:cursor-pointer
       hover:bg-indigo-200 hover:text-indigo-600 duration-300 
       ${showTimer ? " text-indigo-600" : "bg-white text-black"}`}
        onClick={() => setShowTimer(!showTimer)}
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
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="text-xs hover:text-indigo-600">Timer</span>
      </div>
      {showTimer && <Timer setShowTimer={setShowTimer} />}
    </div>
  );
};

export default RoomFeatures;
