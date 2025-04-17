import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        errorMessage ? "block" : "hidden"
      } absolute top-5 left-1/2 w-[90%] md:w-[80%] lg:w-[50%] -translate-x-1/2 rounded-md 
         bg-red-500 text-white p-4`}
    >
      <div className="relative">
        <ExclamationTriangleIcon className="size-7 mr-2 inline-block " />
        <span className="font-semibold">{errorMessage}</span>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
