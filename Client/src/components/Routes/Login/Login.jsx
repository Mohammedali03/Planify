import { useEffect } from "react";
import { useAuth } from "../../AuthProvider";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import LoginError from "./LoginError";

const Login = () => {
  const { errorMessage, setErrorMessage } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000);
  }, [errorMessage]);

  useEffect(() => {
    document.title = "Login - Planify";
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" relative flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        {errorMessage && <LoginError />}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
        </div>
      </motion.div>
    </>
  );
};

export default Login;
