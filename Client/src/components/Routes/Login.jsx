import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Loader from "../ui/Loader";

const validateForm = (formData) => {
  const errors = {};

  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = true;
  }

  if (formData.password === "") {
    errors.password = true;
  }

  return errors;
};

const Login = () => {
  const { login, errorMessage, setErrorMessage } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    setData({ ...data, [name]: value });

    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const errors = validateForm(data);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
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
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000);
  }, [errorMessage]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" relative flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        {errorMessage && (
          <div
            className={`${
              errorMessage ? "block" : "hidden"
            } absolute top-5 left-1/2 w-[90%] md:w-[80%] lg:w-[50%] -translate-x-1/2 rounded-md 
         bg-red-500 text-white p-4`}
          >
            <div className="relative">
              <ExclamationTriangleIcon className="size-7 mr-2 inline-block" />
              <span className="font-semibold">
                Login failed:
                {"   "}
                {errorMessage}
              </span>
            </div>
          </div>
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Link to="/">
            <Logo className="cursor-pointer" />
          </Link>
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className={`${
                    errors.email ? "outline-red-500" : " outline-gray-300"
                  } block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                  focus:outline-indigo-600 sm:text-sm/6`}
                />
              </div>
              {errors.email && (
                <div className="error">Invalid email address</div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className={`${
                    errors.password ? "outline-red-500" : " outline-gray-300"
                  } block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                   outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                   focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                />
              </div>
              {errors.password && (
                <div className="error">Password is required</div>
              )}
            </div>

            <div>
              <button
                className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 h-9
                 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-800 focus-visible:outline-2 
                 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300 cursor-pointer"
              >
                {loading ? <Loader /> : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
