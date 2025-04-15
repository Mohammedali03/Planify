import React, { useState, useRef, useEffect } from "react";
import RoomOptions from "../Study Room/RoomOptions";
import { useOutletContext } from "react-router-dom";
import RoomFeatures from "../Study Room/RoomFeatures";
import lights from "../../images/lights.avif";
import { motion } from "framer-motion";

const StudyRoom = () => {
  const ref = useRef(null);
  const [isFull, setIsFull] = useState(false);
  const [background, setBackground] = useState(lights);

  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [showSounds, setShowSounds] = useState(false);

  // Retrieve data from outlet context
  const { setIsOpen } = useOutletContext();

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen();
      setIsFull(true);
    } else {
      document.exitFullscreen();
    }
  }

  useEffect(() => {
    function handleFullScreen() {
      setIsFull(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", handleFullScreen);

    return () => removeEventListener("fullscreenchange", handleFullScreen);
  }, []);

  useEffect(() => {
    document.title = "Study Room - Planify";
  }, []);

  function handleBackgrounds() {
    if (showSounds) {
      setShowSounds(false);
    }
    setShowBackgrounds(!showBackgrounds);
  }

  function handleSounds() {
    if (showBackgrounds) {
      setShowBackgrounds(false);
    }
    setShowSounds(!showSounds);
  }

  return (
    <motion.div
      ref={ref}
      className="study-room overflow-hidden relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${background})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between p-2">
        <div className="relative p-[6px] bg-white gap-4 rounded text-black">
          <div
            className="flex items-center flex-col rounded p-[6px] hover:cursor-pointer
             hover:bg-indigo-200 hover:text-indigo-600  duration-300"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
        <RoomOptions
          isFull={isFull}
          toggleFullScreen={toggleFullScreen}
          handleBackgrounds={handleBackgrounds}
          handleSounds={handleSounds}
          showBackgrounds={showBackgrounds}
          setBackground={setBackground}
          showSounds={showSounds}
          setShowSounds={setShowSounds}
        />
      </div>
      <RoomFeatures ref={ref} />
    </motion.div>
  );
};

export default StudyRoom;
