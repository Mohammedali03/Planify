import { motion } from "framer-motion";
import stanford from "../../images/stanford-university.webp";
import purple from "../../images/Purple-UO2.webp";
import aaronloeb from "../../images/aaronloeb-university.webp";
import graduate from "../../images/Graduate-university.webp";
import oxford from "../../images/university-of-oxford.webp";
import { useState } from "react";

const images = [
  { name: "stanford", image: stanford },
  { name: "purple", image: purple },
  { name: "aaronloeb", image: aaronloeb },
  { name: "graduate", image: graduate },
  { name: "oxford", image: oxford },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const WorkWith = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white pt-14 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg/8 mb-10 font-semibold text-gray-900"
        >
          Trusted by the world&apos;s most innovative study universities
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 
          sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
        >
          {images.map((item, index) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== index
                  ? "blur-sm opacity-50"
                  : ""
              }`}
            >
              <motion.img
                src={item.image}
                alt={item.name}
                className={`col-span-2 w-full object-contain lg:col-span-1 grayscale hover:grayscale-0 transition-all duration-300 ${
                  hoveredIndex === index ? "scale-110" : ""
                }`}
                width={158}
                height={48}
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkWith;
