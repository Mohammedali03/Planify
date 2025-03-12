import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validateForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = true;
  }
  if (!formData.lastName.trim()) {
    errors.lastName = true;
  }
  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
    errors.email = true;
  }
  if (formData.password.length < 8) {
    errors.password = true;
  }

  return errors;
};

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Set loading to true when submission starts
    setLoading(true);

    try {
      const response = await submitFormData(formData);
      console.log(response.data);
      setLoading(false);
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => location("/login"), 2000);
    } catch (error) {
      console.error("an error has occured", error);
      setLoading(false);
      setErrorMessage("There was an error processing your request.");
    }
  };

  const submitFormData = async (data) => {
    const response = await axios.post(
      "http://localhost:8000/api/register",
      data
    );
    return response;
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
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
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  className={` ${
                    errors.firstName ? "outline-red-500" : "outline-gray-300"
                  } 
                      block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 
                  -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                  focus:outline-indigo-600 sm:text-sm/6`}
                  onChange={handleChange}
                />
              </div>
              {errors.firstName && (
                <div className="error">First name is required</div>
              )}
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  className={` ${
                    errors.lastName ? "outline-red-500" : "outline-gray-300"
                  } block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                  -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                  focus:outline-indigo-600 sm:text-sm/6`}
                  onChange={handleChange}
                />
              </div>
              {errors.lastName && (
                <div className="error">Last name is required</div>
              )}
            </div>

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
                  className={`${
                    errors.email ? "outline-red-500" : "outline-gray-300"
                  } block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 
                  -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                  focus:outline-indigo-600 sm:text-sm/6`}
                  onChange={handleChange}
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`${
                    errors.password ? "outline-red-500" : "outline-gray-300"
                  } block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 
                  -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                  focus:outline-indigo-600 sm:text-sm/6`}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <div className="error">
                  Password must contain at least 8 characters
                </div>
              )}
            </div>

            <div>
              {loading ? (
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm/6 
                font-semibold text-white shadow-xs hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 
                focus-visible:outline-indigo-600 duration-300 cursor-pointer"
                >
                  Sign in...
                </button>
              ) : (
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 
              font-semibold text-white shadow-xs hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600 duration-300 cursor-pointer"
                >
                  Sign in
                </button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
