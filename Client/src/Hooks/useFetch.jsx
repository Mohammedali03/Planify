import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: abortController.signal,
        });
        setData(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error getting data", err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetch();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
