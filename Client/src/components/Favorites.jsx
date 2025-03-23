import axios from "axios";
import React, { useEffect, useState } from "react";

const Favorites = ({ setBackground }) => {
  const [favorites, setFavorites] = useState(null);

  // Fetch Favorites spaces
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http//:localhost:8000/api/favorites", {
          headers: {
            Authorization: `Bearer, ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setFavorites(res.data);
      } catch (e) {
        console.error("an error has occured", e);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="p-4 overflow-y-scroll h-[400px] w-[342px]">
      <h2 className="font-semibold text-lg mb-2">Favorite Spaces</h2>
      <ul className="grid grid-cols-2 gap-3 flex-wrap"></ul>
    </div>
  );
};

export default Favorites;
