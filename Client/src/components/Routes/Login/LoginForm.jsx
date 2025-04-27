import { useState } from "react";
import Loader from "../../ui/Loader";
import Input from "../../ui/Input";
import SecondaryButton from "../../ui/SecondaryButton";
import { useAuth } from "../../AuthProvider";
import Logo from "../../Logo";
import { Link } from "react-router-dom";

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

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login, setErrorMessage } = useAuth();

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

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <Link to="/">
          <Logo className="cursor-pointer" />
        </Link>
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 mt-5">
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
            <Input
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
              errors={errors}
            />
          </div>
          {errors.password && <div className="error">Password is required</div>}
        </div>

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
    </>
  );
};

export default LoginForm;
