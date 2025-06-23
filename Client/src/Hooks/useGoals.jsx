import { useState, useEffect, useCallback } from "react";
import { deleteGoal, getGoals, toggleGoal } from "../components/GoalsServices";

export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingGoal, setEditingGoal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getGoals();
        console.log(res.data);
        setGoals(res.data.goals);
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
      const res = await toggleGoal(id);
      console.log(res.data.goal);
      setGoals(
        goals.map((goal) =>
          goal.id === id ? { ...goal, ...res.data.goal } : goal
        )
      );
    } catch (e) {
      console.error("toggling goal failed", e);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      const res = await deleteGoal(id);

      console.log(res.data);
      // Remove the deleted goal from the state (will be replaced by optimistic UI later)
      setGoals(goals.filter((goal) => goal.id !== res.data.goal.id));
      console.log(goals);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    goals,
    setGoals,
    newGoal,
    setNewGoal,
    editingGoal,
    setEditingGoal,
    showAddModal,
    setShowAddModal,
    selectedDate,
    setSelectedDate,
    isDarkMode,
    isLoading,
    error,
    handleToggleComplete,
    handleDeleteGoal,
  };
};
