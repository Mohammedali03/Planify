import axios from "axios";

const API = "http://localhost:8000/api/goals";

export const getGoals = async () => {
  return axios.get(API, getAuthHeader());
};

export const addGoal = async (data) => {
  return axios.post(API, data, getAuthHeader());
};

export const updateGoal = async (id, data) => {
  return axios.patch(
    `http://localhost:8000/api/goals/${id}`,
    data,
    getAuthHeader()
  );
};

export const toggleGoal = async (id) => {
  return axios.delete(`${API}/${id}/complete`, getAuthHeader());
};

export const deleteGoal = async (id) => {
  return axios.delete(`http://localhost:8000/api/goals/${id}`, getAuthHeader());
};

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
