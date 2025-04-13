import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun, FiPalette } from "react-icons/fi";

const ThemeSettings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [accentColor, setAccentColor] = useState(
    localStorage.getItem("accentColor") || "indigo"
  );

  const colors = [
    { name: "indigo", value: "bg-indigo-600" },
    { name: "purple", value: "bg-purple-600" },
    { name: "pink", value: "bg-pink-600" },
    { name: "blue", value: "bg-blue-600" },
    { name: "green", value: "bg-green-600" },
    { name: "yellow", value: "bg-yellow-600" },
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
    localStorage.setItem("accentColor", color);
    // Update accent color in the app
    document.documentElement.style.setProperty("--accent-color", color);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              {theme === "dark" ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Theme Mode
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose between light and dark mode
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleThemeChange("light")}
              className={`px-4 py-2 rounded-lg ${
                theme === "light"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`px-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FiPalette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Accent Color
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred accent color
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleAccentColorChange(color.name)}
                className={`h-10 rounded-lg ${color.value} ${
                  accentColor === color.name
                    ? "ring-2 ring-offset-2 ring-indigo-500"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThemeSettings;
