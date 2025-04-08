import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const socialLinks = [
    { icon: FaTwitter, href: "https://twitter.com/planify", label: "Twitter" },
    {
      icon: FaFacebook,
      href: "https://facebook.com/planify",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/planify",
      label: "Instagram",
    },
    { icon: FaGithub, href: "https://github.com/planify", label: "GitHub" },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/company/planify",
      label: "LinkedIn",
    },
  ];

  const footerLinks = [
    { name: "Features", href: "#features" },
    { name: "Stats", href: "#stats" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <motion.footer
      ref={footerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white"
    >
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              <Logo />
            </h3>
            <p className="text-gray-600 max-w-md">
              Empowering students and lifelong learners to achieve their full
              potential through innovative study management solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {footerLinks.map(({ name, href }) => (
                <motion.a
                  key={name}
                  href={href}
                  className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-indigo-600" />
                <p>support@planify.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-indigo-600" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-indigo-600" />
                <p>123 Study Street, Learning City</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2025 Planify, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
