import { memo } from "react";
import { motion } from "framer-motion";
import { CheckBadgeIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useCallback } from "react";

const SuccesMessage = ({ successMessage }) => {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    setProgress((prevProgress) => {
      if (prevProgress >= 100) {
        return 100;
      }
      return prevProgress + 1;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(updateProgress, 30);

    return () => {
      clearInterval(timer);
    };
  }, [updateProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-5 right-5 w-96 bg-white rounded-lg shadow-lg overflow-hidden
      border border-green-100 z-50"
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <div className="relative">
                <ShieldCheckIcon className="h-8 w-8 text-green-500" />
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-1 -right-1"
                >
                  <CheckBadgeIcon className="h-4 w-4 text-green-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {successMessage}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Redirecting to login...
            </p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gray-100">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.03 }}
        />
      </div>
    </motion.div>
  );
};

export default memo(SuccesMessage);
