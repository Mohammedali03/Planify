import { useEffect, useCallback, memo } from "react";
import { useAuth } from "../../AuthProvider";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import LoginError from "./LoginError";
import SuccessMessage from "../Signup/SuccesMessage";

const Login = () => {
  const { errorMessage, setErrorMessage, successMessage } = useAuth();

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(clearError, 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, clearError]);

  useEffect(() => {
    document.title = "Login - Planify";
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left side - Design */}
      <div
        className="w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 
      flex items-center justify-center p-8 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center text-white relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent 
            bg-gradient-to-r from-white to-indigo-100"
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-12 text-indigo-100"
          >
            Continue your learning journey with us.
          </motion.p>

          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm 
              hover:bg-white/20 transition-all duration-300"
            >
              <div>
                <svg
                  className="w-16 h-16 mx-auto mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-sm text-indigo-100">
                Monitor your learning journey
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              <div>
                <svg
                  className="w-16 h-16 mx-auto mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
              <p className="text-sm text-indigo-100">
                Join the learning community
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {errorMessage && <LoginError />}
          {successMessage && <SuccessMessage />}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
