import { useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const INACTIVITY_LIMIT = 60 ^ 1000; // 1 minute

let timeout;

const updateLastActive = () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    axios.post(
      `${BASE_URL}/update_last_active_at`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }, INACTIVITY_LIMIT);
};

const useUserActivity = () => {
  useEffect(() => {
    const events = ["scroll", "click", "mousemove", "keydown"];
    events.forEach((event) => {
      window.addEventListener(event, updateLastActive);
    });

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateLastActive)
      );
    };
  }, []);
};

export default useUserActivity;
