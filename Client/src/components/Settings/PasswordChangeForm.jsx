import { useState } from "react";
import Input from "../ui/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SecondaryButton from "../ui/SecondaryButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordChangeForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle password change logic here
    if (
      !formData.currentPassword.trim() ||
      !formData.newPasswordConfirmation.trim() ||
      !formData.newPassword.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be longer than 7 characters");
      return;
    }

    if (formData.newPassword !== formData.newPasswordConfirmation) {
      setError('the "New Password" and "Confirm Password" do not match');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/update_password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      setSuccess(data.message);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (e) {
      console.error("error updating password", e);
      setError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400
            hover:text-gray-500 dark:hover:text-gray-300"
            >
              {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="newPasswordConfirmation"
              value={formData.newPasswordConfirmation}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            } px-4 py-2 bg-indigo-600 text-white rounded-lg
             hover:bg-indigo-700 duration-300 `}
            disabled={loading}
          >
            {loading ? "Change Password..." : "Change Password"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordChangeForm;
