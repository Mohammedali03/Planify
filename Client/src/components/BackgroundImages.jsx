import React, { useEffect, useState } from "react";
import { motion, spring } from "framer-motion";
import axios from "axios";
import chelsea from "../images/chelsea-market-skybridge.avif";
import dark from "../images/dark-2m.avif";
import mountains from "../images/in-the-mountains.avif";
import whispering from "../images/whispering-shores.avif";
import beach from "../images/beach-and-mountains.avif";
import awesome from "../images/awesome.avif";
import cafe from "../images/cafe-canvas.avif";
import city from "../images/city.avif";

const BackgroundImages = ({ setBackground }) => {
  const [favorites, setFavorites] = useState({});
  const [Pictures, setPictures] = useState(null);

  const images = [
    { id: 1, image: city, alt: "city" },
    { id: 2, image: chelsea, alt: "Chelsea market skybridge" },
    { id: 3, image: dark, alt: "Dark 2AM" },
    { id: 4, image: mountains, alt: "In the mountains" },
    { id: 5, image: whispering, alt: "Whispering shores" },
    { id: 6, image: beach, alt: "Beach and mountains" },
    { id: 7, image: awesome, alt: "Awesome" },
    { id: 8, image: cafe, alt: "Cafe canvas" },
  ];

  // Fetch Available images
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get("http//:localhost:8000/api/images", {
          headers: {
            Authorization: `Bearer, ${localStorage.getItem("token")}`,
          },
        });
        setPictures(response.data);
      } catch (e) {
        console.error("an error has occured", e);
      }
    };

    fetchPictures();
  }, []);

  // Toggle favorite images
  const toggleFavourite = async (id) => {
    // Check if Image is not Favorite
    if (!favorites[id]) {
      // Make the Image Favorite
      try {
        const response = await axios.post(
          `http://localhost:8000/api/favorites/${id}/image`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFavorites((prev) => ({ ...prev, [id]: true }));
      } catch (e) {
        console.error(e);
      }
    }

    // If Image Is Favorite Then Remove It
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/favorites/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setFavorites((prev) => ({ ...prev, [id]: false }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4 overflow-y-scroll h-[400px]">
      <h2 className="font-semibold text-lg mb-2">Featured Images</h2>
      <ul className="grid grid-cols-2 gap-3 flex-wrap">
        {images.map((image) => {
          return (
            <div key={image.id} className="relative">
              <motion.div className="relative hover:scale-[1.03] duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-5 absolute right-1 top-1 ${
                    favorites[image.id] && "fill-indigo-600 text-indigo-200 "
                  } text-indigo-200 z-90 cursor-pointer
             hover:fill-indigo-400 duration-300`}
                  onClick={() => toggleFavourite(image.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 
              3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>

                <img
                  src={image.image}
                  loading="lazy"
                  alt={image.alt}
                  className="h-20 w-36 rounded-md cursor-pointer"
                  whileHover={{ scale: 1.03 }}
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
      </ul>
    </div>
  );
};

export default BackgroundImages;
