import { useState } from "react";
import Loader from "../../ui/Loader";
import Input from "../../ui/Input";
import SecondaryButton from "../../ui/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../Logo";

const REGISTER_URL = "http://localhost:8000/api/register";

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

const SignupForm = ({ setErrorMessage, setSuccessMessage }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    setErrorMessage(null);

    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await submitFormData(formData);
      setSuccessMessage(
        "Created account successfully! Redirecting to Login..."
      );
      setTimeout(() => location("/confirm-email"), 3000);
    } catch (error) {
      console.error("an error has occured", error);
      setErrorMessage(
        error.response?.data?.message || "Email address is already registered!"
      );
    } finally {
      setLoading(false);
    }
  };

  const submitFormData = async (data) => {
    const response = await axios.post(REGISTER_URL, data);
    return response;
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
        <Link to="/">
          <Logo className="cursor-pointer" />
        </Link>
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <Input
              id="first-name"
              name="firstName"
              onChange={handleChange}
              errors={errors}
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
            <Input
              id="last-name"
              name="lastName"
              onChange={handleChange}
              errors={errors}
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
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              errors={errors}
            />
          </div>
          {errors.email && <div className="error">Invalid email address</div>}
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
            <Input
              id="password"
              name="password"
              type="password"
              errors={errors}
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
    </>
  );
};

export default SignupForm;
