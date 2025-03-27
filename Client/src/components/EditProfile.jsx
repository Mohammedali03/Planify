import { useState } from "react";
import avatar from "../images/avatar.jpeg";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import Button from "./ui/Button";

const EditProfile = ({ setShowProfile }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0],
    lastName: user?.name.split(" ")[1],
    email: user?.email,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName &&
      !lastName &&
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/profile",
        formData,
        {
          // withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log("error updating user's data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
      bg-background p-3 md:p-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
        onClick={() => setShowProfile(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>

      <div className="bg-white max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-3 md:p-5 ">
        <h1 className=" text-2xl text-indigo-600 font-bold mb-8">
          Edit Profile
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 mb-5">
            <div className="relative cursor-pointer">
              <div className="size-20 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <input aria-label="Upload profile picture" /> */}
            </div>
            <div className="flex gap-2">
              <Button>Change Picture</Button>
              <button
                className="p-2 px-3 bg-gray-100 font-semibold text-red-500 border border-gray-200 
              cursor-pointer rounded-md"
              >
                Delete Picture
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-md border `}
                required
              />
              {formData.firstName === "" ? (
                <p className="error">This field is required</p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-md border `}
                required
              />
              {formData.lastName === "" ? (
                <p className="error">This field is required</p>
              ) : (
                ""
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-md border `}
                required
              />
              {!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email) ? (
                <p className="error">Invalid email address</p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              className="p-2 px-3 bg-red-600 font-semibold text-white rounded-md cursor-pointer"
              type="submit"
            >
              Close
            </button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
