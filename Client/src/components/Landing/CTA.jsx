import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

const CTA = () => {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <div className="bg-white">
      <motion.div
        ref={ctaRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative overflow-hidden isolate bg-gray-900 sm:px-16"
      >
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2
            [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full 
            sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <div className="py-24 px-6 mx-auto text-center lg:mx-0">
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <RocketLaunchIcon className="h-12 w-12 text-white" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl [text-wrap:balance] font-semibold text-balance text-white"
          >
            Boost your productivity today
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg/8 text-pretty text-gray-300"
          >
            Organize your studies and boost productivity with our app. Track
            progress and achieve goals easily. Start now!
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/signup"
              className="group rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900
                hover:bg-gray-100 duration-300 flex items-center space-x-2"
            >
              <span>Get started</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CTA;
