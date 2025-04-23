import { FiLock } from "react-icons/fi";

const TwoFactorAuth = () => {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Security Options
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <FiLock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Enable
          </button>
        </div>
      </div>
    </>
  );
};

export default TwoFactorAuth;
