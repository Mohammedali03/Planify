import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundImages from "./BackgroundImages";

const Backgrounds = ({ setBackground }) => {
  function handleVideos() {}
  function handleFavourites() {}
  function handleImages() {}

  const options = [
    { id: 1, name: "Videos", click: handleVideos },
    { id: 2, name: "Images", click: handleImages, default: true },
    { id: 3, name: "Favorites", click: handleFavourites },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        transition={{ duration: 0.3 }}
        className="backgrounds bg-white absolute top-16 right-2 z-10
        size-fit rounded-t-lg rounded-tr-lg"
      >
        <div className="flex items-center text-[#4e4e4e] text-sm pt-1 gap-3 font-semibold">
          {options.map((option) => {
            return (
              <button
                key={option.id}
                onClick={option.click}
                className={`cursor-pointer px-4 py-2 ${
                  option.default && "border-b-2 border-indigo-500"
                }`}
              >
                {option.name}
              </button>
            );
          })}
        </div>
        <BackgroundImages setBackground={setBackground} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Backgrounds;
