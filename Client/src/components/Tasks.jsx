import { useState } from "react";
import { motion } from "framer-motion";

const Tasks = ({ setShowTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
      },
    ]);
    setNewTask("");
    setIsAddingTask(false);
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div
      className="feature tasks z-90 absolute rounded-md flex-col items-stretch overflow-hidden bg-white shadow-lg"
      style={{
        width: "400px",
        height: "300px",
      }}
      role="dialog"
      aria-label="Tasks"
    >
      <div className="flex py-2 px-4 items-center justify-between border-b border-[#e9e9e9]">
        <span className="text-sm text-gray-600 font-medium">Tasks</span>

        <button
          onClick={() => setShowTasks(true)}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          aria-label="Hide tasks panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
      </div>

      <div className="border-t border-[#e9e9e9] p-2 px-4">
        <button
          onClick={() => setIsAddingTask(true)}
          className={`p-2 w-full text-indigo-600 hover:bg-indigo-100 rounded-md
          cursor-pointer transition-colors flex items-end gap-2
          text-sm font-semibold ${isAddingTask ? "mb-3" : "mb-0"}`}
          aria-label="Add new task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Task
        </button>
        {isAddingTask && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="flex-1 px-2 py-2 border border-indigo-400 rounded-md focus:outline-none 
              focus:ring focus:ring-indigo-600 focus:border-transparent placeholder:text-gray-400"
              autoFocus
              aria-label="New task input"
            />
          </div>
        )}
      </div>
      <ul className="px-4">
        {tasks.map((task) => (
          <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            key={task.id}
            onClick={() => handleToggleTask(task.id)}
            className="flex items-center justify-between p-2 mb-2 cursor-pointer
            hover:bg-indigo-100 hover:border-gray-200 rounded-md border border-[#ddd]"
          >
            <div className="flex items-center  gap-3 cursor-pointer">
              <button
                className={`w-5 h-5 border-2 flex items-center justify-center transition-colors  ${
                  task.completed
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-gray-300 hover:border-gray-400"
                } starting:opacity-0 duration-300`}
                aria-label={
                  task.completed
                    ? "Mark task as incomplete"
                    : "Mark task as complete"
                }
              >
                {task.completed && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </button>
              <span
                className={`capitalize font-medium text-sm ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="p-1 hover:bg-indigo-100 duration-300 rounded-md cursor-pointer"
              aria-label="Delete task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
