import React, { useState, useEffect } from "react";
import { motion, spring } from "framer-motion";
import axios from "axios";
// import chelsea from "../../images/chelsea-market-skybridge.avif";
// import dark from "../../images/dark-2m.avif";
// import mountains from "../../images/in-the-mountains.avif";
// import whispering from "../../images/whispering-shores.avif";
// import beach from "../../images/beach-and-mountains.avif";
// import awesome from "../../images/awesome.avif";
// import cafe from "../../images/cafe-canvas.avif";
// import city from "../../images/city.avif";

const BackgroundVideos = ({ setBackground }) => {
  const [videos, setVideos] = useState(null);
  // const [vid, setVid] = useState([
  //   { id: 1, image: city, alt: "city" },
  //   { id: 2, image: chelsea, alt: "Chelsea market skybridge" },
  //   { id: 3, image: dark, alt: "Dark 2AM" },
  //   { id: 4, image: mountains, alt: "In the mountains" },
  //   { id: 5, image: whispering, alt: "Whispering shores" },
  //   { id: 6, image: beach, alt: "Beach and mountains" },
  //   { id: 7, image: awesome, alt: "Awesome" },
  //   { id: 8, image: cafe, alt: "Cafe canvas" },
  // ]);

  // Fetch Available images
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http//:localhost:8000/api/videos", {
          headers: {
            Authorization: `Bearer, ${localStorage.getItem("token")}`,
          },
        });
        // console.log(res.data);
        setVideos(res.data);
      } catch (e) {
        console.error("an error has occured", e);
      }
    };

    fetchVideos();
  });

  return (
    <div className="p-4 overflow-y-scroll h-[400px]">
      <h2 className="font-semibold text-lg mb-2">Featured Videos</h2>
      <ul className="grid grid-cols-2 gap-3 flex-wrap">
        {/* {vid.map((video) => {
          return (
            <div key={video.id} className="relative">
              <motion.div className="relative hover:scale-[1.03] duration-500">
                <motion.img
                  src={video.image}
                  loading="lazy"
                  alt={video.alt}
                  className="h-20 w-36 rounded-md cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1, type: spring }}
                  onClick={() => setBackground(video.image)}
                />
              </motion.div>
              <span className="text-xs text-[#4e4e4e] w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                {video.alt}
              </span>
            </div>
          );
        })} */}
      </ul>
    </div>
  );
};

export default BackgroundVideos;
