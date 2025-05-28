import { useState, useCallback, memo } from "react";
import Loader from "../../ui/Loader";
import Input from "../../ui/Input";
import SecondaryButton from "../../ui/SecondaryButton";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../Logo";
import { motion } from "framer-motion";
import { useAuth } from "../../AuthProvider";

const REGISTER_URL = "http://localhost:8000/api/register";

// Validation rules
const validationRules = {
  firstName: (value) => (!value.trim() ? "First name is required" : ""),
  lastName: (value) => (!value.trim() ? "Last name is required" : ""),
  email: (value) =>
    !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
      ? "Invalid email address"
      : "",
  password: (value) =>
    value.length < 8 ? "Password must contain at least 8 characters" : "",
};

const validateForm = (formData) => {
  const errors = {};
  Object.keys(validationRules).forEach((field) => {
    const error = validationRules[field](formData[field]);
    if (error) errors[field] = error;
  });
  return errors;
};

// Memoized form field component
const FormField = memo(
  ({ label, id, name, type = "text", errors, onChange }) => (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
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
        <div className="error text-red-500 text-sm mt-1">{errors[name]}</div>
      )}
    </div>
  )
);

const SignupForm = ({ setErrorMessage, setSuccessMessage }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

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

  const submitFormData = useCallback(async (data) => {
    try {
      const response = await axios.post(REGISTER_URL, data);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrorMessage(null);

      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setLoading(true);

      try {
        // First register the user
        await submitFormData(formData);
        setSuccessMessage("Account created successfully! Logging you in...");

        // Then attempt to log them in using the AuthProvider's login function
        await login({
          email: formData.email,
          password: formData.password,
        });

        // The login function from AuthProvider will handle the navigation
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Email address is already registered!"
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, setErrorMessage, setSuccessMessage, submitFormData, login]
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left side - Form */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
            <Link to="/">
              <Logo className="cursor-pointer" />
            </Link>
            <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 mt-5">
            <FormField
              label="First Name"
              id="first-name"
              name="firstName"
              errors={errors}
              onChange={handleChange}
            />

            <FormField
              label="Last Name"
              id="last-name"
              name="lastName"
              errors={errors}
              onChange={handleChange}
            />

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
            />

            <div>
              <SecondaryButton loading={loading}>
                {loading ? <Loader /> : "Sign up"}
              </SecondaryButton>
            </div>
          </form>
          <p className="mt-5 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Enhanced Design */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center p-8 relative overflow-hidden">
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
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100"
          >
            Welcome to Study App
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-12 text-indigo-100"
          >
            Join our community of learners and start your educational journey
            today.
          </motion.p>

          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn at Your Pace</h3>
              <p className="text-sm text-indigo-100">
                Access study materials anytime, anywhere
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
              <h3 className="text-xl font-semibold mb-3">Join Community</h3>
              <p className="text-sm text-indigo-100">
                Connect with fellow learners and share knowledge
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(SignupForm);
