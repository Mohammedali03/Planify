import React, { createContext, useState, useEffect, useContext } from "react";
import translations from "./lang/translation";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
