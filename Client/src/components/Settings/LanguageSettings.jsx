import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";

const LanguageSettings = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem("language", langCode);
    // Update language in the app
    document.documentElement.lang = langCode;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <FiGlobe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Language
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your preferred language
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center space-x-3 p-3 rounded-lg text-left ${
                language === lang.code
                  ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSettings;
