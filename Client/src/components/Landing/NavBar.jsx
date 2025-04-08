import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const navigation = [
  { name: "Features", link: "features" },
  { name: "Stats", link: "stats" },
  { name: "About", link: "about" },
  { name: "Testimonials", link: "testimonials" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setActiveLink(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Logo />
          </motion.div>

          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-8"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  smooth={true}
                  offset={-50}
                  spy={true}
                  className="relative group"
                >
                  <motion.span
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeLink === item.link
                        ? "text-indigo-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeLink === item.link ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center"
          >
            <motion.button
              onClick={() => navigate("/signup")}
              className="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 cursor-pointer">Get Started</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Logo />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900"
                >
                  <span className="sr-only">Close menu</span>
                  <FaTimes className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="p-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      className={`text-base font-medium ${
                        activeLink === item.link
                          ? "text-indigo-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate("/signup");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r
                   from-indigo-600 to-indigo-500 rounded-lg "
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;
