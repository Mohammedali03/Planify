import React, { useState, useRef, useEffect } from "react";
import RoomOptions from "./RoomOptions";

const StudyRoom = () => {
  const ref = useRef(null);
  const [isFull, setIsFull] = useState(false);

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
      className="study-room relative bg-cover bg-center h-screen bg-[url('./images/pexels-juanpphotoandvideo-877971.jpg')]"
    >
      <div className="absolute w-full h-full bg-black opacity-30"></div>
      <RoomOptions
        isFull={isFull}
        toggleFullScreen={toggleFullScreen}
        handleBackgrounds={handleBackgrounds}
        handleSounds={handleSounds}
      />
    </div>
  );
};

export default StudyRoom;
