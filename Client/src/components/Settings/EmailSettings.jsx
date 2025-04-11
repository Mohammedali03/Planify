import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiBell } from "react-icons/fi";

const EmailSettings = () => {
  const [preferences, setPreferences] = useState({
    studyReminders: true,
    achievementNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const handleToggle = (preference) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
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
              <FiBell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Study Reminders
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about upcoming study sessions
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle("studyReminders")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.studyReminders
                ? "bg-indigo-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.studyReminders ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Achievement Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive emails about your study achievements
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle("achievementNotifications")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.achievementNotifications
                ? "bg-indigo-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.achievementNotifications
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Weekly Reports
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get weekly summaries of your study progress
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle("weeklyReports")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.weeklyReports
                ? "bg-indigo-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.weeklyReports ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Marketing Emails
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive updates about new features and promotions
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle("marketingEmails")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.marketingEmails
                ? "bg-indigo-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.marketingEmails ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSettings;
