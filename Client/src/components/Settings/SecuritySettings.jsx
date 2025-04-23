import { motion } from "framer-motion";
import PasswordChangeForm from "./PasswordChangeForm";
import TwoFactorAuth from "./TwoFactorAuth";

const SecuritySettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PasswordChangeForm />
      <div className="mt-8">
        <TwoFactorAuth />
      </div>
    </motion.div>
  );
};

export default SecuritySettings;
