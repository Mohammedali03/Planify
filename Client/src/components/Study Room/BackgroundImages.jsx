import React, { useEffect, useState } from "react";
import { motion, spring } from "framer-motion";
import axios from "axios";
import lights from "../../images/lights.avif";

const BackgroundImages = ({ setBackground }) => {
  const [Pictures, setPictures] = useState([]);

  // const images = [
  //   { id: 1, image: mountain, alt: "Mountain" },
  //   { id: 2, image: lake, alt: "Lake" },
  //   { id: 3, image: donwtown, alt: "Downtown" },
  //   { id: 4, image: bridge, alt: "Bridge" },
  //   { id: 5, image: love, alt: "Love" },
  //   { id: 6, image: ice, alt: "Ice" },
  //   { id: 7, image: trees, alt: "Trees" },
  //   { id: 8, image: river, alt: "River" },
  //   { id: 9, image: lights, alt: "Lights" },
  // ];

  // Fetch Available images
  // useEffect(() => {
  //   const fetchPictures = async () => {
  //     try {
  //       const response = await axios.get("http//:localhost:8000/api/images", {
  //         headers: {
  //           Authorization: `Bearer, ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setPictures(response.data);
  //     } catch (e) {
  //       console.error("an error has occured", e);
  //     }
  //   };

  //   fetchPictures();
  // }, []);

  return (
    <div className="p-4 overflow-y-scroll h-[400px]">
      {/* <h2 className="font-semibold text-lg mb-2">Featured Images</h2>
      <ul className="grid grid-cols-2 gap-3 flex-wrap">
        {images.map((image) => {
          return (
            <div key={image.id} className="relative">
              <motion.div className="relative hover:scale-[1.03] duration-500">
                <motion.img
                  src={image.image}
                  loading="lazy"
                  alt={image.alt}
                  className="h-20 w-36 rounded-md cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 1, type: spring }}
                  onClick={() => setBackground(image.image)}
                />
              </motion.div>
              <span className="text-xs text-[#4e4e4e] w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                {image.alt}
              </span>
            </div>
          );
        })}
      </ul> */}
    </div>
  );
};

export default BackgroundImages;
