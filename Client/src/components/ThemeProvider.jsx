import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize dark mode state based on user's theme color
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sync with system preferes changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("prefers-color-scheme: dark");
    function handleThemeChange(e) {
      setIsDarkMode(e.matches);
    }

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkMode = () => useContext(ThemeContext);
