import { memo } from "react";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ErrorMessage = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-5 left-0 w-1/3 px-8"
    >
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
        <div className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{errorMessage}</p>
          </div>
        </div>
        <div className="h-0.5 bg-white/20 w-full animate-[shrink_4s_linear]" />
      </div>
    </motion.div>
  );
};

export default memo(ErrorMessage);
