import { motion, spring } from "framer-motion";
import lights from "../../images/lights.avif";
import casa from "../../images/casa.webp";
import bridge from "../../images/bridge.webp";
import coast from "../../images/coast.webp";
import coloredsky from "../../images/coloredsky.webp";
import parachute from "../../images/parachute.webp";
import ocean from "../../images/ocean.webp";
import palms from "../../images/palms.webp";
import lightening from "../../images/lightening.webp";

const BackgroundImages = ({ setBackground }) => {
  const images = [
    { id: 1, image: casa, alt: "la casa de papel" },
    { id: 2, image: coast, alt: "coast" },
    { id: 3, image: coloredsky, alt: "colored sky" },
    { id: 4, image: parachute, alt: "Parachute" },
    { id: 5, image: ocean, alt: "Ocean" },
    { id: 6, image: bridge, alt: "bridg" },
    { id: 7, image: palms, alt: "palms" },
    { id: 8, image: lightening, alt: "Lightening" },
    { id: 9, image: lights, alt: "Lights" },
  ];

  return (
    <div className="p-4 overflow-y-scroll h-[400px]">
      <h2 className="font-semibold text-lg mb-2">Featured Images</h2>
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
      </ul>
    </div>
  );
};

export default BackgroundImages;
