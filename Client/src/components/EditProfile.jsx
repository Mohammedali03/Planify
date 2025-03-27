import { useState } from "react";
import avatar from "../images/avatar.jpeg";
import { useAuth } from "./AuthProvider";

const EditProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0],
    lastName: user?.name.split(" ")[1],
    email: user?.email,
  });

  console.log(lastName);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
      bg-background p-4 md:p-8"
    >
      <div className="bg-white max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8">
        <h1 className=" text-2xl text-indigo-600 font-bold mb-8">
          Edit Profile
        </h1>

        <form className="space-y-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="relative cursor-pointer">
              <div className="size-20 rounded-full overflow-hidden border border-primary">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <input aria-label="Upload profile picture" /> */}
            </div>
            <div className="flex gap-2">
              <button className="p-2 px-3 bg-indigo-600 font-semibold text-white rounded-md cursor-pointer">
                Change Picture
              </button>
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
                className={`w-full px-4 py-2 rounded-md border  focus:outline-none focus:ring-2 focus:ring-ring`}
                required
              />
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
                className={`w-full px-4 py-2 rounded-md border  focus:outline-none focus:ring-2 focus:ring-ring`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-md border  focus:outline-none focus:ring-2 focus:ring-ring`}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              className="p-2 px-3 bg-red-600 font-semibold text-white rounded-md cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Close
            </button>
            <button
              className="p-2 px-3 bg-indigo-600 font-semibold text-white rounded-md cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
