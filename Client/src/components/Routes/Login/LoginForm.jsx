import { useState, useCallback, memo } from "react";
import Loader from "../../ui/Loader";
import Input from "../../ui/Input";
import SecondaryButton from "../../ui/SecondaryButton";
import { useAuth } from "../../AuthProvider";
import Logo from "../../Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const validateForm = (formData) => {
  const errors = {};

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

const FormField = memo(
  ({ label, id, name, type = "text", errors, onChange, children }) => (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
        {children}
      </div>
      <div className="mt-2">
        <Input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          errors={errors}
        />
      </div>
      {errors[name] && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="error text-red-500 text-sm mt-1.5 flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-md border border-red-100"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errors[name]}</span>
        </motion.div>
      )}
    </div>
  )
);

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login, setErrorMessage } = useAuth();

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrorMessage(null);

      const validationErrors = validateForm(data);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        // Scroll to the first error
        const firstErrorField = document.querySelector(".error");
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        return;
      }

      setLoading(true);

      try {
        await login(data);
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setLoading(false);
      }
    },
    [data, login, setErrorMessage]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <Link to="/">
          <Logo className="cursor-pointer" />
        </Link>
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 mt-5">
        <FormField
          label="Email address"
          id="email"
          name="email"
          type="email"
          errors={errors}
          onChange={handleChange}
        />

        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          errors={errors}
          onChange={handleChange}
        >
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
        </FormField>

        <div>
          <SecondaryButton loading={loading}>
            {loading ? <Loader /> : "Login"}
          </SecondaryButton>
        </div>
      </form>

      <p className="mt-7 text-center text-sm/6 text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </motion.div>
  );
};

export default memo(LoginForm);
