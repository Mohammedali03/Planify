import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const ManipulateGoals = ({
  isDarkMode,
  setShowAddModal,
  editingGoal,
  setEditingGoal,
  setGoals,
}) => {
  const [newGoal, setNewGoal] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingGoal) {
      setNewGoal(editingGoal.description || "");
      setSelectedDate(new Date(editingGoal.startDate));
    } else {
      setNewGoal("");
      setSelectedDate(new Date());
    }
  }, [editingGoal]);

  const handleAddGoal = async () => {
    if (!newGoal.trim()) {
      setError("Goal description cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/goals",
        {
          description: newGoal,
          startDate: selectedDate.toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setGoals((prevGoals) => [res.data.goal, ...prevGoals]);
      setShowAddModal(false);
    } catch (error) {
      setError(error.response?.data?.message || "Error adding goal");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGoal = async () => {
    if (!newGoal.trim()) {
      setError("Goal description cannot be empty");
      return;
    }

    if (!editingGoal?.id) {
      setError("Invalid goal to update");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/goals/${editingGoal.id}`,
        {
          description: newGoal,
          startDate: selectedDate.toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === res.data.goal.id
            ? {
                ...goal,
                ...res.data.goal,
              }
            : goal
        )
      );
      setEditingGoal("");
      setShowAddModal(false);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating goal");
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleClose = () => {
    setShowAddModal(false);
    setNewGoal("");
    setEditingGoal("");
    setSelectedDate(new Date());
    setError(null);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`rounded-xl p-6 w-full max-w-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            {editingGoal ? "Edit Goal" : "Add New Goal"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Goal Title
              </label>
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500"
                    : "border-gray-300 focus:border-indigo-500"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Enter your goal"
                disabled={loading}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Due Date
              </label>
              <input
                type="date"
                value={formatDateForInput(selectedDate)}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500"
                    : "border-gray-300 focus:border-indigo-500"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={loading}
                min={today}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleClose}
              className={`px-4 py-2 cursor-pointer ${
                isDarkMode
                  ? "text-gray-300 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={editingGoal ? handleUpdateGoal : handleAddGoal}
              className={`px-4 py-2 ${
                isDarkMode
                  ? "bg-indigo-700 hover:bg-indigo-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={loading}
            >
              {loading ? "Saving..." : editingGoal ? "Update" : "Add"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ManipulateGoals;
