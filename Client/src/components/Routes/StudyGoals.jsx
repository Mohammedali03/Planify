import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiCheck, FiTrash, FiEdit2 } from "react-icons/fi";
import Button from "../ui/Button";
import axios from "axios";
import ManipulateGoals from "../ManipulateGoals";

const StudyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:8000/api/goals", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGoals(res.data.goals);
        console.log(res.data.goals);
      } catch (e) {
        setError("Failed to fetch goals. Please try again later.");
        console.error("error fetching data", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleToggleComplete = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/api/goals/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setGoals(
        goals.map((goal) =>
          goal.id === id ? { ...goal, status: goal.status === 0 ? 1 : 0 } : goal
        )
      );
    } catch (e) {
      console.error("toggling goal failed", e);
    }
  };

  const handleDeleteGoal = async (id) => {
    // Remove the deleted goal from the state (will be replaced by optimistic UI later)
    setGoals(goals.filter((goal) => goal.id !== id));
    try {
      await axios.delete(`http://localhost:8000/api/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.title = "Study Goals - Planify";
  }, []);

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      } p-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className={`text-3xl font-bold ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Study Goals
            </h1>
            <p
              className={`mt-1 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Track and manage your study objectives
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-4 
               text-white px-4  rounded-lg transition-colors cursor-pointer"
            >
              + Add Goal
            </Button>
          </div>
        </div>

        {/* Loading and Error States */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          /* Goals Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {goals?.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`rounded-xl shadow-md p-6 transition-colors ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  } ${goal.status === 1 ? "opacity-75" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => handleToggleComplete(goal.id)}
                        className={`size-5 aspect-square rounded-full border-2 flex items-center justify-center cursor-pointer cursro-pointer ${
                          goal.status === 1
                            ? "bg-green-500 border-green-500"
                            : isDarkMode
                            ? "border-gray-600"
                            : "border-gray-300"
                        } mt-1.5`}
                      >
                        {goal.status === 1 && (
                          <FiCheck className="text-white" />
                        )}
                      </button>
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            goal.status === 1
                              ? "line-through text-gray-500"
                              : isDarkMode
                              ? "text-gray-200"
                              : "text-gray-900"
                          }`}
                        >
                          {goal.description}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <FiCalendar
                            className={
                              isDarkMode ? "text-gray-500" : "text-gray-400"
                            }
                          />
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {goal.startDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingGoal(goal);
                          setShowAddModal(true);
                        }}
                        className={`p-1 cursor-pointer ${
                          isDarkMode
                            ? "text-gray-400 hover:text-indigo-400"
                            : "text-gray-500 hover:text-indigo-600"
                        }`}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className={`p-1 cursor-pointer ${
                          isDarkMode
                            ? "text-gray-400 hover:text-red-400"
                            : "text-gray-500 hover:text-red-600"
                        }`}
                      >
                        <FiTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        {showAddModal && (
          <ManipulateGoals
            setShowAddModal={setShowAddModal}
            isDarkMode={isDarkMode}
            editingGoal={editingGoal}
            setGoals={setGoals}
          />
        )}
      </div>
    </motion.div>
  );
};

export default StudyGoals;
