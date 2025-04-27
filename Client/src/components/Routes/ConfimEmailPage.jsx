import { useState, useEffect } from "react";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import SecondaryButton from "../ui/SecondaryButton";
import axios from "axios";

export default function ConfirmEmailPage() {
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      await axios.post("http://localhost:8000/api/email/resend");
      setResent(true);
      setCooldown(60);
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => setResent(false), 3000);
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br
     from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <FiMail className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Confirm Your Email
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            We've sent a confirmation link to your email address. Please check
            your inbox and click the link to activate your account.
          </p>

          <div className="mt-6 w-full">
            <SecondaryButton onClick={handleResend} disabled={cooldown > 0}>
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Email"}
            </SecondaryButton>

            {resent && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-600 dark:text-green-400 text-sm">
                <FiRefreshCw className="w-4 h-4" />
                Email sent successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
