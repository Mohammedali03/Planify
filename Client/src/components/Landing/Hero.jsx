import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 z-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 
          rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-fit py-28 sm:py-48 lg:py-48 xl:max-w-[800px] 2xl:w-full flex flex-col 
      justify-center md:justify-start"
      >
        <div>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1
             ring-gray-900/10 hover:ring-gray-900/20"
            >
              Empower Your Study Journey with Cutting-Edge Tools
            </motion.div>
          </div>
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-semibold tracking-tight text-balance
             text-gray-900 sm:text-5xl md:text-6xl xl:text-7xl "
            >
              Boost your productivity with smart study tools
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-lg font-medium tet-pretty text-gray-500 sm:text-xl/8"
            >
              Track your progress, manage tasks and create your perfect study
              environment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button className="" onClick={() => navigate("/signup")}>
                Get started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
