import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaUsers, FaBullseye, FaChartLine } from "react-icons/fa";

const stats = [
  {
    id: 1,
    name: "Active Students",
    value: "10K+",
    icon: FaUsers,
  },
  {
    id: 2,
    name: "Study Goals Achieved",
    value: "50K+",
    icon: FaBullseye,
  },
  {
    id: 3,
    name: "Study Hours Tracked",
    value: "100K+",
    icon: FaChartLine,
  },
];

const Banner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-white/80">
                {stat.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Join Our Study Community
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Track your progress, set study goals, and compete with peers in our
            innovative study platform.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
