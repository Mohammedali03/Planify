import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiCalendar,
  FiCheck,
  FiTrash,
  FiEdit2,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import Button from "../ui/Button";

const StudyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Sample initial goals
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setGoals([
      {
        id: 1,
        title: "Complete React Project",
        dueDate: today,
        completed: false,
        priority: "high",
        category: "Programming",
      },
      {
        id: 2,
        title: "Study for Math Exam",
        dueDate: tomorrow,
        completed: false,
        priority: "medium",
        category: "Mathematics",
      },
    ]);
  }, []);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const goal = {
        id: Date.now(),
        title: newGoal,
        dueDate: selectedDate,
        completed: false,
        priority: "medium",
        category: "General",
      };
      setGoals([...goals, goal]);
      setNewGoal("");
      setShowAddModal(false);
    }
  };

  const handleToggleComplete = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setNewGoal(goal.title);
    setSelectedDate(goal.dueDate);
    setShowAddModal(true);
  };

  const handleUpdateGoal = () => {
    if (newGoal.trim() && editingGoal) {
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoal.id
            ? { ...goal, title: newGoal, dueDate: selectedDate }
            : goal
        )
      );
      setNewGoal("");
      setEditingGoal(null);
      setShowAddModal(false);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isTomorrow = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  };

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDueDateText = (date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return formatDate(date);
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getPriorityColor = (priority) => {
    if (isDarkMode) {
      switch (priority) {
        case "high":
          return "bg-red-900/30 text-red-400";
        case "medium":
          return "bg-yellow-900/30 text-yellow-400";
        case "low":
          return "bg-green-900/30 text-green-400";
        default:
          return "bg-gray-800 text-gray-300";
      }
    }
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`rounded-xl shadow-md p-6 transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } ${goal.completed ? "opacity-75" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleComplete(goal.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        goal.completed
                          ? "bg-green-500 border-green-500"
                          : isDarkMode
                          ? "border-gray-600"
                          : "border-gray-300"
                      }`}
                    >
                      {goal.completed && <FiCheck className="text-white" />}
                    </button>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          goal.completed
                            ? "line-through text-gray-500"
                            : isDarkMode
                            ? "text-gray-200"
                            : "text-gray-900"
                        }`}
                      >
                        {goal.title}
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
                          {getDueDateText(goal.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditGoal(goal)}
                      className={`p-1 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-indigo-400"
                          : "text-gray-500 hover:text-indigo-600"
                      }`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className={`p-1 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-red-400"
                          : "text-gray-500 hover:text-red-600"
                      }`}
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      goal.priority
                    )}`}
                  >
                    {goal.priority.charAt(0).toUpperCase() +
                      goal.priority.slice(1)}
                  </span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      isDarkMode
                        ? "bg-indigo-900/30 text-indigo-400"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {goal.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add/Edit Goal Modal */}
        <AnimatePresence>
          {showAddModal && (
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
                      onChange={(e) =>
                        setSelectedDate(new Date(e.target.value))
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500"
                          : "border-gray-300 focus:border-indigo-500"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingGoal(null);
                      setNewGoal("");
                    }}
                    className={`px-4 py-2 cursor-pointer ${
                      isDarkMode
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingGoal ? handleUpdateGoal : handleAddGoal}
                    className={`px-4 py-2 ${
                      isDarkMode
                        ? "bg-indigo-700 hover:bg-indigo-600"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white rounded-lg cursor-pointer`}
                  >
                    {editingGoal ? "Update" : "Add"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StudyGoals;
