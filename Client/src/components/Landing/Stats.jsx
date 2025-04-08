import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaUsers, FaCalendarCheck, FaChartLine } from "react-icons/fa";

const stats = [
  {
    id: 1,
    number: 42000,
    desc: "Study sessions logged every 24 hours",
    icon: <FaChartLine className="w-8 h-8 text-indigo-600" />,
  },
  {
    id: 2,
    number: 119000,
    desc: "Study plans created and successfully completed",
    icon: <FaCalendarCheck className="w-8 h-8 text-indigo-600" />,
  },
  {
    id: 3,
    number: 46000,
    desc: "New users joining our community annually",
    icon: <FaUsers className="w-8 h-8 text-indigo-600" />,
  },
];

const Stats = () => {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-200px" });

  return (
    <motion.section
      ref={statsRef}
      initial={{ opacity: 0 }}
      animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative isolate py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Our mission
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Empowering students and lifelong learners to achieve their full
            potential through innovative study management solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={
              isStatsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Why Choose Planify?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At <span className="font-bold text-indigo-600">Planify</span>,
                we help students and lifelong learners stay organized, manage
                time effectively, and stay motivated. Our platform simplifies
                study management and adapts to your learning style, making it
                easier to achieve your goals.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Your Success, Our Priority
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you&apos;re preparing for exams, juggling multiple
                courses, or pursuing self-directed learning, Planify offers a
                range of tools to keep you on track. From customizable study
                plans and progress tracking to reminders and performance
                analytics, we provide everything you need to succeed.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={
              isStatsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={
                  isStatsInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 20, scale: 0.95 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="group relative"
              >
                <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-6 p-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300"
                    initial={{ scale: 0 }}
                    animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.2,
                      ease: "backOut",
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-gray-900"
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isStatsInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + index * 0.2,
                        ease: "easeOut",
                      }}
                    >
                      {stat.number.toLocaleString()}
                    </motion.h3>
                    <motion.p
                      className="mt-2 text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isStatsInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.7 + index * 0.2,
                        ease: "easeOut",
                      }}
                    >
                      {stat.desc}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Stats;
