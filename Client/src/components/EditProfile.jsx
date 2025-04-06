import { useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import Button from "./ui/Button";

const EditProfile = ({ setShowProfile }) => {
  const { user } = useAuth();

  // file reference
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0],
    lastName: user?.name.split(" ")[1],
    email: user?.email,
  });
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isProfilePic, setIsProfilePic] = useState(false);

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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      // window.location.reload();
    } catch (e) {
      console.log("error updating user's data");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle picture change
  const handlePictureChange = () => {
    fileInputRef.current.click();
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPicture(file);
    setLoading(true);

    console.log(file);

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/profile_pic",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // required for FormData
          },
        }
      );
      console.log(res.data); // You can show a toast here if you want
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile picture:", error);
    } finally {
      setLoading(false);
    }
  };

  // Functio to delete the profile picture
  const handleDeletePicture = () => {
    try {
      axios.delete("http://localhost:8000/api/profile_pic", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-100
      bg-background p-3 md:p-8"
    >
      <div className="bg-white relative max-w-3xl mx-auto rounded-lg shadow-lg p-3 md:p-5 ">
        <button
          className="absolute top-5 right-5 size-9 flex items-center justify-center duration-300
          hover:bg-gray-200 hover:text-indigo-600 rounded-lg cursor-pointer"
          onClick={() => setShowProfile(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className=" text-2xl text-indigo-600 font-bold mb-8">
          Edit Profile
        </h1>
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="relative cursor-pointer">
              <div className="size-20 rounded-full overflow-hidden border border-gray-300">
                {user?.profile_pic ? (
                  <img src={user?.profile_picture_url} alt="Profile picture" />
                ) : (
                  <span
                    className="text-lg size-full font-semibold text-white
                 bg-indigo-600 flex items-center justify-center"
                  >
                    {user?.name[0]}
                  </span>
                )}
              </div>
              {/* <input aria-label="Upload profile picture" /> */}
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Button onClick={handlePictureChange}>Change Picture</Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePictureUpload}
                  ref={fileInputRef}
                />
              </div>
              <button
                className="p-2 px-3 bg-gray-100 font-semibold text-red-500 border border-gray-200 
              cursor-pointer rounded-md"
                onClick={handleDeletePicture}
              >
                Delete Picture
              </button>
            </div>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className={`w-full px-4 py-2 rounded-md border`}
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
          </form>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              className="p-2 px-3 bg-red-600 font-semibold text-white rounded-md cursor-pointer"
              onClick={() => setShowProfile(false)}
            >
              Close
            </button>
            <Button type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
