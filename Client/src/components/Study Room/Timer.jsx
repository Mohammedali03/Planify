import { useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  StopIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { useTimer } from "../../hooks/useTimer";
import Pomodoro from "../Pomodoro";

const Timer = ({ setShowTimer }) => {
  const {
    time,
    isActive,
    showPomo,
    start,
    inputValue,
    setShowPomo,
    handleStart,
    handleReset,
    handleEnd,
    handleSave,
    formatTime,
    setInputValue,
  } = useTimer(20);

  useEffect(() => {
    const handleUnload = () => {
      setShowTimer(true);
      fetch(`http://localhost:8000/api/timer/end/${time}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ time }), // Send remaining time if needed
        keepalive: true, // Ensures the request is sent before the page unloads
      });
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [time]);

  const actions = [
    {
      id: 1,
      icon: isActive ? <PauseIcon /> : <PlayIcon />,
      callback: handleStart,
    },
    { id: 2, icon: <ArrowPathIcon />, callback: handleReset },
    { id: 3, icon: <StopIcon />, callback: handleEnd },
  ];

  return (
    <div className="feature timer z-90 absolute h-auto rounded-md flex-col items-stretch overflow-hidden">
      <div className="flex py-2 px-4 items-center justify-between border-b border-[#e9e9e9]">
        <span className="flex-0 text-sm text-[#4e4e4e] font-medium">
          Personal
        </span>
        {/* Hide button */}
        <button
          className="size-6 cursor-pointer "
          onClick={() => setShowTimer(false)}
        >
          <MinusIcon />
        </button>
      </div>
      <div className="flex items-center justify-between pt-4 px-4 pb-2 w-full">
        <span className="text-5xl font-semibold">{formatTime(time)}</span>
        <div className="flex gap-2 items-center">
          {actions.map(({ id, icon, callback }) => (
            <button
              key={id}
              onClick={callback}
              className={`cursor-pointer size-10 ${
                callback === handleEnd && !start && "hidden"
              } flex items-center justify-center p-2 rounded-md
             hover:bg-indigo-200 hover:text-indigo-600 duration-300`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
      <Pomodoro
        inputValue={inputValue}
        showPomo={showPomo}
        setInputValue={setInputValue}
        setShowPomo={setShowPomo}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Timer;
