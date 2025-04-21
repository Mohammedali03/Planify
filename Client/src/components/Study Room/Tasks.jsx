import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const Tasks = ({ setShowTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/goals", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data.goals;

        setTasks(data.filter((task) => task.startDate === today));
      } catch (e) {
        console.error("error fetching data", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/goals",
        {
          description: newTask,
          startDate: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks((prev) => [...prev, res.data.goal]);
      setNewTask("");
      setIsAddingTask(false);
    } catch (e) {
      console.log("error adding task", e);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/goals/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;

      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: data.goal.status } : task
        )
      );
    } catch (e) {
      console.error("toggling goal failed", e);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/goals/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div
      className="feature tasks z-90 absolute rounded-md flex-col 
      items-stretch bg-white shadow-lg overflow-y-scroll size-[400px]"
      role="dialog"
      aria-label="Tasks"
    >
      <div className="flex py-2 px-4 items-center justify-between border-b border-[#e9e9e9]">
        <span className="text-sm text-gray-600 font-medium">Tasks</span>

        <button
          onClick={() => setShowTasks(false)}
          className="size-7 text-gray-500 p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          aria-label="Hide tasks panel"
        >
          <MinusIcon />
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
          <PlusIcon className="size-5" />
          Add Task
        </button>
        {isAddingTask && (
          <div className="flex gap-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
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
            className="flex items-center justify-between p-2 mb-2 
            hover:bg-indigo-100 hover:border-gray-200 rounded-md border border-[#ddd]"
          >
            <div className="flex items-center  gap-3 cursor-pointer">
              <button
                onClick={() => handleToggleTask(task.id)}
                className={`w-5 h-5 border-2 flex items-center justify-center transition-colors cursor-pointer ${
                  task.status == 1
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-gray-300 hover:border-gray-400"
                } starting:opacity-0 duration-300`}
                aria-label={
                  task.status == 1
                    ? "Mark task as incomplete"
                    : "Mark task as complete"
                }
              >
                {task.status == 1 && (
                  <CheckIcon className="size-4 text-white" />
                )}
              </button>
              <span
                className={`capitalize font-medium text-sm ${
                  task.status == 1
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {task.description}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="p-1 hover:bg-indigo-100 duration-300 rounded-md cursor-pointer"
              aria-label="Delete task"
            >
              <TrashIcon className="w-4 h-4 text-gray-500" />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
