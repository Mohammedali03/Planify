import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link } from "react-scroll";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
  { name: "Features", link: "features" },
  { name: "Stats", link: "stats" },
  { name: "About", link: "about" },
  { name: "Testimonials", link: "testimonials" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="absolute inset-x-0 top-0 z-50 overflow-hidden">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8 lg:py-5"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex lg:flex-1"
        >
          <Logo />
        </motion.div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <AnimatePresence mode="wait">
              <motion.span
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex lg:gap-4"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              duration={500}
              to={item.link}
              smooth={true}
              offset={-50}
              spy={true}
              activeClass="active"
              className="text-sm p-2 rounded-md hover:bg-indigo-200 hover:text-indigo-600
              w-[95px] text-center duration-300 cursor-pointer font-medium text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex lg:flex-1 lg:justify-end "
        >
          <button
            onClick={() => navigate("/signup")}
            className="text-sm/6 font-semibold cursor-pointer text-gray-900 hover:underline"
          >
            Sign up <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto
         bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900
                    duration-300 hover:text-indigo-600 hover:bg-indigo-100"
                    smooth={true}
                    offset={-50}
                    spy={true}
                    activeClass="active"
                    duration={500}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={() => navigate("/signup")}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900
                  duration-300 hover:bg-indigo-100 hover:text-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavBar;
