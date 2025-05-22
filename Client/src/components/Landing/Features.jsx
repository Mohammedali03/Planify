import { useRef } from "react";
import {
  SpeakerWaveIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion, useInView } from "framer-motion";

const features = [
  {
    id: 1,
    name: "Progress tracking",
    description:
      "Visualize your study journey with detailed stats and insight, set goals, track your time and celebrate miles tones as you progress.",
    icon: ChartBarIcon,
  },
  {
    id: 2,
    name: "Focus timer",
    description:
      "Boost productivity with custimizable timers. use the Promodo technique or set your own intervals to stay focused and take breaks effictively.",
    icon: ClockIcon,
  },
  {
    id: 3,
    name: "Study sounds",
    description:
      "Immerse yourself in a library of calming sounds. choose from rain, white noise or coffee shop embiance to create your perfect study environment.",
    icon: SpeakerWaveIcon,
  },
  {
    id: 4,
    name: "Task management",
    description:
      "organize your study tasks with ease. create todo lists, set priorities and got reminders to stay on top of your deadlines.",
    icon: ClipboardDocumentCheckIcon,
  },
];

const Features = () => {
  const featureRef = useRef(null);
  const isFeatureInView = useInView(featureRef, {
    once: true,
    margin: "-100px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 isolate relative py-24 sm:py-32 z-40">
      <motion.div
        initial="hidden"
        animate={isFeatureInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="mx-auto max-w-7xl px-6 lg:px-8"
        ref={featureRef}
      >
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div variants={itemVariants} className="z-100">
            <motion.h2 className="text-base/7 font-semibold text-indigo-600">
              Features
            </motion.h2>
            <motion.p
              className="mt-2 text-4xl font-semibold tracking-tight text-pretty
            text-gray-900 sm:text-5xl lg:text-balance"
            >
              Everything you need to master your studies
            </motion.p>
            <motion.p className="mt-6 text-lg/8 text-gray-600">
              Stay organized, focused and motivated with tools designed to help
              you achieve your goals
            </motion.p>
          </motion.div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10
              lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
          >
            {features.map((feature, index) => (
              <motion.div
                variants={itemVariants}
                key={feature.id}
                className="relative pl-16 group"
              >
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="absolute top-0 left-0 flex size-10 items-center 
                    justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500
                    shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40
                    transition-all duration-300"
                >
                  <feature.icon
                    aria-hidden="true"
                    className="size-6 text-white"
                  />
                </motion.div>
                <motion.div
                  className="text-base/7 font-semibold text-gray-900 group-hover:text-indigo-600
                    transition-colors duration-300"
                >
                  {feature.name}
                </motion.div>
                <motion.p
                  className="mt-2 text-base/7 text-gray-600 group-hover:text-gray-900
                    transition-colors duration-300"
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
