import { useAuth } from "../../AuthProvider";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const LoginError = () => {
  const { errorMessage } = useAuth();

  return (
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
  );
};

export default LoginError;
