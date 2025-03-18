import React, { useEffect, useState } from "react";

const Timer = ({ setShowTimer }) => {
  const [time, setTime] = useState(30 * 60); // Initial time in seconds (30 minutes)
  const [isActive, setIsActive] = useState(false);
  const [start, setStart] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [showPomo, setShowPomo] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // Convert time to MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setStart(true);
    setIsActive(!isActive);
  };

  const handleReset = () => {
    // Stop the timer
    setIsActive(false);

    // Reset the timer to 30 minutes
    setTime(30 * 60);
  };

  const handleSave = () => {
    // Convert inputValue to a number
    const numericValue = parseInt(inputValue, 10);

    // Validate if the value is between 20 and 200
    let clampedValue = numericValue;
    if (numericValue < 20) {
      clampedValue = 20;
    } else if (numericValue > 200) {
      clampedValue = 200;
    }

    // Update the input value state if it was clamped
    if (clampedValue !== numericValue) {
      setInputValue(clampedValue.toString());
    }

    // Update timer value
    setTime(clampedValue * 60);

    // Hide the Pomodoro input
    setShowPomo(false);

    // Stop timer after setting new duration
    setIsActive(false);

    // Reset the start state
    setStart(false);
  };

  const handleEnd = () => {
    console.log("session ended");
  };

  const actions = [
    {
      icon: isActive ? (
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          />
        </svg>
      ) : (
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      ),
      callback: handleStart,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25
    0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
      callback: handleReset,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${!start && "hidden"} size-6`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
          />
        </svg>
      ),
      callback: handleEnd,
    },
  ];

  return (
    <div className="timer flex z-90 absolute h-auto rounded-md flex-col items-stretch overflow-hidden">
      <div className="flex py-2 px-4 items-center justify-between border-b border-[#e9e9e9]">
        <span className="flex-0 text-sm text-[#4e4e4e] font-medium">
          Personal
        </span>
        {/* Hide button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={() => setShowTimer(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </div>
      <div className="flex items-center justify-between pt-4 px-4 pb-2 w-full">
        <span className="text-5xl font-semibold">{formatTime(time)}</span>
        <div className="flex gap-2 items-center">
          {actions.map(({ icon, callback }) => (
            <button
              key={icon}
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
      {/* Pomo */}
      <div className="flex py-2 px-4 items-center justify-between">
        <label htmlFor="pomo" className="text-[#4e4e4e] font-medium">
          Pomodoro (Minutes)
        </label>
        <button
          className="cursor-pointer size-10 flex items-center justify-center p-2 rounded-md
             hover:bg-indigo-200 hover:text-indigo-600 duration-300"
          onClick={() => setShowPomo(!showPomo)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0
     3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${showPomo ? "flex" : "hidden"}  flex-col gap-2 py-2 px-4`}
      >
        <input
          type="number"
          id="pomo"
          min={20}
          max={200}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-[#e9e9e9] rounded-md p-2
           focus-within:border-indigo-600 focus-within:ring focus-within:ring-indigo-600
          focus:outline-none"
        />
        <button
          className="py-2 my-2 block bg-indigo-600 rounded-md cursor-pointer
           text-white hover:bg-indigo-400
        duration-300 font-medium"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Timer;
