import React, { useState } from "react";
import { motion } from "framer-motion";
import BackgroundImages from "./BackgroundImages";
import BackgroundVideos from "./BackgroundVideos";

const Backgrounds = ({ setBackground }) => {
  const [options, setOptions] = useState([
    {
      id: 1,
      name: "Images",
      selected: true,
      component: <BackgroundImages setBackground={setBackground} />,
    },
    {
      id: 2,
      name: "Videos",
      selected: false,
      component: <BackgroundVideos setBackground={setBackground} />,
    },
  ]);

  const handleSelection = (id) => {
    const updatedOptions = options.map((option) => ({
      ...option,
      selected: option.id === id ? true : false,
    }));

    setOptions(updatedOptions);
  };

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
      transition={{ duration: 0.3 }}
      className=" bg-white absolute top-16 right-2 z-10
      size-fit rounded-lg"
    >
      <div className="flex items-center text-[#4e4e4e] text-sm pt-1 gap-3 font-semibold">
        {options.map((option) => {
          return (
            <button
              key={option.id}
              onClick={() => handleSelection(option.id)}
              className={`cursor-pointer px-4 py-2 ${
                option.selected && "border-b-2 border-indigo-500"
              }`}
            >
              {option.name}
            </button>
          );
        })}
      </div>
      {options.map((option) => {
        return (
          <div className="backgrounds" key={option.id}>
            {option.selected && option.component}
          </div>
        );
      })}
    </motion.div>
  );
};

export default Backgrounds;
