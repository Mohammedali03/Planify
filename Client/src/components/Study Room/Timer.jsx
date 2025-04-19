import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SecondaryButton from "../ui/SecondaryButton";
import Input from "../ui/Input";
import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  StopIcon,
  MinusIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";

const Timer = ({ setShowTimer }) => {
  const [time, setTime] = useState(20 * 60); // Initial time in seconds (20 minutes)
  const [isActive, setIsActive] = useState(false);
  const [start, setStart] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [inputValue, setInputValue] = useState(20);
  const [showPomo, setShowPomo] = useState(false);
  const [lastDuration, setLastDuration] = useState(20 * 60);

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

  const location = useLocation();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        await fetch(`http://localhost:8000/api/timer/end/${time}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(time),
          keepalive: true,
        });
      } catch (error) {
        console.error("Error sending route change request:", error);
      }
    };

    return () => {
      if (hasStarted) {
        // This runs when the component unmounts (user navigates away)
        sendRequest();
      }
    };
  }, [location.pathname, hasStarted]);

  // Send end request when timer ends
  useEffect(() => {
    if (time === 0) {
      handleEndRequest();
    }
  }, [time]);

  // Sending an end request if the window closes or page reloads
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

  // Convert time to MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Start the timer
  const handleStart = async () => {
    // If timer is bigger than 200 minutes and less than 20 minutes leave
    if (time <= 1200 && time >= 12000) {
      return;
    }

    // If timer is running allow pause to work
    if (isActive) {
      try {
        await axios.post(
          `http://localhost:8000/api/timer/pause/${time}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsActive(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post(
          "http://localhost:8000/api/timer/start",
          {
            duration: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Timer starts
        setStart(true);
        setIsActive(true);

        // Set has started so the reset button can work
        setHasStarted(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleReset = async () => {
    // If timer has not started yet then leave the function
    if (!hasStarted) {
      return;
    }

    // Send request to cancel current timer
    try {
      await axios.delete("http://localhost:8000/api/timer/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Stop the timer
      setIsActive(false);

      setTime(lastDuration);

      // Hide the end button
      setStart(false);
      setHasStarted(false);
    } catch (e) {
      console.error("Error resetting timer", e);
    }
  };

  const handleEndRequest = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/timer/end/${time}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (hasStarted) {
      handleEndRequest();
    }

    // Convert inputValue to a number
    const numericValue = parseInt(inputValue, 10);

    // Validate if the value is between 20 and 200
    let clampedValue = numericValue;
    if (numericValue < 20) {
      clampedValue = 20;
      setLastDuration(20);
    } else if (numericValue > 200) {
      clampedValue = 200;
      setLastDuration(200);
    }

    // Update the input value state if it was clamped
    if (clampedValue !== numericValue) {
      setInputValue(clampedValue.toString());
    }

    // Save last duration if user wants to reset
    setLastDuration(clampedValue * 60);

    // Update timer value
    setTime(clampedValue * 60);

    // Hide the Pomodoro input
    setShowPomo(false);

    // Stop timer after setting new duration
    setIsActive(false);

    // Reset the start state
    setStart(false);
  };

  const handleEnd = async () => {
    if (!hasStarted) return;

    try {
      await axios.post(
        `http://localhost:8000/api/timer/end/${time}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsActive(false);
      setTime(lastDuration);
      setHasStarted(false);
    } catch (error) {
      console.error(error);
    }
  };

  const actions = [
    {
      id: 1,
      icon: isActive ? <PauseIcon /> : <PlayIcon />,
      callback: handleStart,
    },
    {
      id: 2,
      icon: <ArrowPathIcon />,
      callback: handleReset,
    },
    {
      id: 3,
      icon: <StopIcon />,
      callback: handleEnd,
    },
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
          <AdjustmentsVerticalIcon />
        </button>
      </div>
      <div
        className={`${showPomo ? "flex" : "hidden"}  flex-col gap-3 py-2 px-4`}
      >
        <Input
          type="number"
          id="pomo"
          min={20}
          max={200}
          step={5}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SecondaryButton onClick={handleSave}>Save</SecondaryButton>
      </div>
    </div>
  );
};

export default Timer;
