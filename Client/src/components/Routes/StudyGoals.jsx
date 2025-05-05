import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import ManipulateGoals from "../ManipulateGoals";
import { useGoals } from "../../hooks/useGoals";
import Goal from "../Goal";

const StudyGoals = () => {
  const {
    goals,
    setGoals,
    editingGoal,
    setEditingGoal,
    showAddModal,
    setShowAddModal,
    isDarkMode,
    isLoading,
    error,
    handleDeleteGoal,
    handleToggleComplete,
  } = useGoals();

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
          <div className="grid grid-cols-1 gap-6">
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
                  } ${goal.status ? "opacity-75" : ""}`}
                >
                  <Goal
                    goal={goal}
                    isDarkMode={isDarkMode}
                    handleDeleteGoal={handleDeleteGoal}
                    handleToggleComplete={handleToggleComplete}
                    setEditingGoal={setEditingGoal}
                    setShowAddModal={setShowAddModal}
                  />
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
            setEditingGoal={setEditingGoal}
            setGoals={setGoals}
          />
        )}
      </div>
    </motion.div>
  );
};

export default StudyGoals;
