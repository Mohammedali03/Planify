import { motion } from "framer-motion";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const SuccesMessage = ({ successMessage }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          successMessage ? "opacity-100" : "opacity-0"
        } block absolute top-5 left-1/2 w-[90%] md:w-[80%] lg:w-[50%] -translate-x-1/2 rounded-md 
         bg-green-500 text-white p-4 duration-300`}
      >
        <div className="relative">
          <CheckBadgeIcon className="size-7 mr-2 inline-block" />

          <span className="font-semibold">{successMessage}</span>
        </div>
      </motion.div>
    </>
  );
};

export default SuccesMessage;
