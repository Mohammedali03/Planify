import React, { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiBell,
  FiMoon,
  FiSun,
  FiLock,
  FiMail,
  FiGlobe,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import * as Lazy from "../lazy";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    document.title = "Settings - Planify";
  }, []);

  const settingsSections = [
    {
      id: "profile",
      title: "Account Settings",
      icon: <FiUser className="w-5 h-5" />,
      component: <Lazy.ProfileSettings />,
    },
    {
      id: "email",
      title: "Email Preferences",
      icon: <FiMail className="w-5 h-5" />,
      component: <Lazy.EmailSettings />,
    },
    {
      id: "security",
      title: "Password & Security",
      icon: <FiLock className="w-5 h-5" />,
      component: <Lazy.SecuritySettings />,
    },
    {
      id: "language",
      title: "Language",
      icon: <FiGlobe className="w-5 h-5" />,
      component: <Lazy.LanguageSettings />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Settings
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-4 space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      {section.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {section.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-64">
                      <Lazy.Loader />
                    </div>
                  }
                >
                  {settingsSections.find(
                    (section) => section.id === activeSection
                  )?.component || <Lazy.ProfileSettings />}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
