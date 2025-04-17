import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SignupForm from "./SignupForm";
import ErrorMessage from "./ErrorMessage";
import SuccesMessage from "./SuccesMessage";

const Signup = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Signup - Planify";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000);

    clearTimeout();

    return () => clearTimeout();
  }, [errorMessage]);

  return (
    <>
      <motion.div
        className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {successMessage && <SuccesMessage successMessage={successMessage} />}
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignupForm
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Signup;
