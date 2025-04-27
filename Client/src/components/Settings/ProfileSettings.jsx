import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCamera } from "react-icons/fi";
import { useAuth } from "../AuthProvider";
import axios from "axios";
import Button from "../ui/Button";

const ProfileSettings = () => {
  // default image url (NO image)
  const defaultUrl = "http://localhost:8000/default-avatar.png";

  const { user } = useAuth();

  // file reference
  const fileInputRef = useRef(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const validateForm = () => {
    if (!formData.firstName.trim() && !formData.lastName.trim()) {
      setError("First name or last name is required");
      return false;
    }
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
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
      setSuccess(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile");
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

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("Image size should be less than 5MB");
      return;
    }

    setSelectedPicture(file);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axios.post("http://localhost:8000/api/profile_pic", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Profile picture updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error updating profile picture"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePicture = async () => {
    if (
      !window.confirm("Are you sure you want to delete your profile picture?")
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete("http://localhost:8000/api/profile_pic", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess("Profile picture deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error deleting profile picture"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600">{success}</p>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="size-24 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            {user?.profile_picture_url === defaultUrl ? (
              <span
                className="text-2xl size-full font-semibold text-white capitalize
                bg-indigo-600 flex items-center justify-center"
              >
                {user?.name[0]}
              </span>
            ) : (
              <img
                src={user?.profile_picture_url}
                alt="Profile picture"
                className="rounded-full size-full"
              />
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
            <FiCamera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Profile Picture
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click to change your profile picture
          </p>
        </div>
        <div className="flex gap-2 ml-auto">
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end">
          {loading ? (
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-400 text-white rounded-lg transition-colors cursor-not-allowed"
              disabled={loading}
            >
              Save Changes...
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileSettings;
