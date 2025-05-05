import React from "react";
import { FiCalendar, FiCheck, FiTrash, FiEdit2 } from "react-icons/fi";

const Goal = ({
  goal,
  isDarkMode,
  handleDeleteGoal,
  handleToggleComplete,
  setEditingGoal,
  setShowAddModal,
}) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-start space-x-3">
        <button
          onClick={() => handleToggleComplete(goal.id)}
          className={`size-5 aspect-square rounded-full border-2 flex items-center justify-center cursor-pointer cursro-pointer ${
            goal.status
              ? "bg-green-500 border-green-500"
              : isDarkMode
              ? "border-gray-600"
              : "border-gray-300"
          } mt-1.5`}
        >
          {goal.status == 1 && <FiCheck className="text-white" />}
        </button>
        <div>
          <h3
            className={`text-lg font-semibold ${
              goal.status
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
              className={isDarkMode ? "text-gray-500" : "text-gray-400"}
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
  );
};

export default Goal;
