import { useState, useEffect, useCallback, memo } from "react";
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
    let timeoutId;
    if (errorMessage) {
      timeoutId = setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [errorMessage]);

  const handleSetErrorMessage = useCallback((message) => {
    setErrorMessage(message);
  }, []);

  const handleSetSuccessMessage = useCallback((message) => {
    setSuccessMessage(message);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {successMessage && <SuccesMessage successMessage={successMessage} />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <div>
        <SignupForm
          setErrorMessage={handleSetErrorMessage}
          setSuccessMessage={handleSetSuccessMessage}
        />
      </div>
    </motion.div>
  );
};

export default memo(Signup);
