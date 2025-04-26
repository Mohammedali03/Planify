import { useState, useEffect, useCallback } from "react";
import {
  startTimer,
  pauseTimer,
  endTimer,
  deleteTimer,
} from "../components/TimeServices";
import { useLocation } from "react-router-dom";

export const useTimer = ({ initialMinutes = 20 }) => {
  const initialSeconds = initialMinutes * 60;

  const [time, setTime] = useState(initialSeconds); // Initial time in seconds (20 minutes)
  const [isActive, setIsActive] = useState(false);
  const [start, setStart] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPomo, setShowPomo] = useState(false);
  const [lastDuration, setLastDuration] = useState(20 * 60);
  const [inputValue, setInputValue] = useState(20);

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

  const handleStart = useCallback(async () => {
    if (time <= 1200 && time >= 12000) return;

    try {
      if (isActive) {
        await pauseTimer(time);
        setIsActive(false);
      } else {
        await startTimer(time);
        setStart(true);
        setIsActive(true);
        setHasStarted(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isActive, time]);

  const handleReset = useCallback(async () => {
    if (!hasStarted) return;

    try {
      await deleteTimer();
      setIsActive(false);
      setTime(lastDuration);
      setStart(false);
      setHasStarted(false);
    } catch (e) {
      console.error(e);
    }
  }, [hasStarted, lastDuration]);

  const handleSave = useCallback(async () => {
    if (hasStarted) {
      endTimer(time);
    }

    const numericValue = parseInt(inputValue, 10);

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

    setLastDuration(clampedValue * 60);
    setTime(clampedValue * 60);
    setShowPomo(false);
    setIsActive(false);
    setStart(false);
  }, [hasStarted, time]);

  const handleEnd = useCallback(async () => {
    if (!hasStarted) return;

    try {
      await endTimer(time);
      setIsActive(false);
      setTime(lastDuration);
      setHasStarted(false);
    } catch (error) {
      console.error(error);
    }
  }, [hasStarted, lastDuration, time]);

  // Convert time to MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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
        sendRequest();
      }
    };
  }, [location.pathname, hasStarted]);

  // Send end request when timer ends
  useEffect(() => {
    if (time === 0) {
      endTimer(time);
    }
  }, [time]);

  return {
    time,
    isActive,
    hasStarted,
    showPomo,
    start,
    inputValue,
    setShowPomo,
    handleStart,
    handleReset,
    handleEnd,
    handleSave,
    setTime,
    formatTime,
    setInputValue,
  };
};
