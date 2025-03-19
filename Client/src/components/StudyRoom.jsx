import React, { useState, useRef, useEffect } from "react";
import RoomOptions from "./RoomOptions";
import { useOutletContext } from "react-router-dom";
import RoomFeatures from "./RoomFeatures";

const StudyRoom = () => {
  const ref = useRef(null);
  const [isFull, setIsFull] = useState(false);

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

  function handleBackgrounds() {
    alert("not created yet");
  }
  function handleSounds() {
    alert("not created yet");
  }

  return (
    <div
      ref={ref}
      className="study-room overflow-hidden relative bg-cover bg-center h-screen 
      bg-[url('./images/pexels-juanpphotoandvideo-877971.jpg')]"
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
        />
      </div>
      <RoomFeatures ref={ref} />
    </div>
  );
};

export default StudyRoom;
