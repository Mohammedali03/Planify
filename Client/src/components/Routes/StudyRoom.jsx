import React, { useState, useRef, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import lights from "../../images/lights.avif";
import { motion } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/24/outline";
const RoomOptions = React.lazy(() => import("../Study Room/RoomOptions"));
const RoomFeatures = React.lazy(() => import("../Study Room/RoomFeatures"));

const StudyRoom = () => {
  const ref = useRef(null);
  const [isFull, setIsFull] = useState(false);
  const [background, setBackground] = useState(lights);

  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [showSounds, setShowSounds] = useState(false);

  // Retrieve data from outlet context
  const { setIsOpen } = useOutletContext();

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen();
      setIsFull(true);
    } else {
      document.exitFullscreen();
    }
  }, []);

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

  const handleBackgrounds = useCallback(() => {
    if (showSounds) setShowSounds(false);
    setShowBackgrounds((prev) => !prev);
  }, [showSounds]);

  const handleSounds = useCallback(() => {
    if (showBackgrounds) setShowBackgrounds(false);
    setShowSounds((prev) => !prev);
  }, [showBackgrounds]);

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
          <button
            className="flex items-center flex-col rounded p-[6px] hover:cursor-pointer
             hover:bg-indigo-200 hover:text-indigo-600  duration-300"
            onClick={() => setIsOpen(true)}
          >
            <Bars3Icon className="size-6" />
          </button>
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
