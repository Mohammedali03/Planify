import axios from "axios";

const API = "http://localhost:8000/api/timer";

export const startTimer = (time) => {
  return axios.post(`${API}/start`, { duration: time }, getAuthHeader());
};

export const pauseTimer = (time) => {
  return axios.post(`${API}/pause/${time}`, {}, getAuthHeader());
};

export const endTimer = (time) => {
  return axios.post(`${API}/end/${time}`, {}, getAuthHeader());
};

export const deleteTimer = () => {
  return axios.delete(`${API}/delete`, getAuthHeader());
};

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
