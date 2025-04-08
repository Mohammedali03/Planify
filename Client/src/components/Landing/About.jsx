import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "../Reveal";
import {
  GlobeAltIcon,
  HandRaisedIcon,
  BookOpenIcon,
  FlagIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    title: "Be World-Class",
    description:
      "We strive for excellence in everything we do. From intuitive design to powerful features, we aim to deliver a world-class experience that empowers users to reach their full potential.",
    icon: <GlobeAltIcon className="h-6 w-6 text-indigo-600" />,
  },
  {
    title: "Be Supportive",
    description:
      "We believe in creating a supportive community where learners can thrive. Whether you're struggling with a tough subject or celebrating a milestone, we're here to cheer you on every step of the way.",
    icon: <HandRaisedIcon className="h-6 w-6 text-indigo-600" />,
  },
  {
    title: "Share Everything You Know",
    description:
      "Knowledge grows when shared. That's why we encourage users to share tips, resources, and study strategies with each other. Together, we can build a richer learning environment for everyone.",
    icon: <BookOpenIcon className="h-6 w-6 text-indigo-600" />,
  },
  {
    title: "Take Responsibility",
    description:
      "We take pride in being reliable and accountable. Our team is committed to providing a seamless experience, ensuring that our app is always there when you need it most.",
    icon: <FlagIcon className="h-6 w-6 text-indigo-600" />,
  },
  {
    title: "Always Learning",
    description:
      "Just like you, we're always learning and improving. We continuously update and enhance our app with new features and tools to meet the evolving needs of our users.",
    icon: <ChartBarIcon className="h-6 w-6 text-indigo-600" />,
  },
  {
    title: "Enjoy Downtime",
    description:
      "We understand the importance of balance. That's why we encourage users to take breaks, recharge, and enjoy their downtime. After all, a rested mind is a productive mind.",
    icon: <SparklesIcon className="h-6 w-6 text-indigo-600" />,
  },
];

const About = () => {
  const valuesRef = useRef(null);
  const titleRef = useRef(null);

  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="relative isolate py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white"></div>
        <div
          className="absolute inset-0 
          bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
          bg-[size:6rem_4rem] opacity-20"
        ></div>
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center"
          >
            Our Values
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-lg leading-8 text-gray-600 text-center"
          >
            At <span className="font-bold text-indigo-600">Planify</span>, we
            believe in empowering students to achieve their academic goals
            through organization, collaboration, and continuous growth. Our
            values guide everything we do, ensuring that our app helps you study
            smarter, not harder.
          </motion.p>
        </div>

        <div
          ref={valuesRef}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                className="group relative"
              >
                <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
