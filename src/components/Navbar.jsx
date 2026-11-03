import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Our Service" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  const navContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // একটার পর একটা
        delayChildren: 0.2,
      },
    },
  };

  const navItem = {
    hidden: { y: -20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const mobileMenu = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.35,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  const mobileItem = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed to-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
          {/* Logo */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="flex items-center gap-1 cursor-pointer">
            <div className="h-4 w-4 bg-blue-600 rounded-full opacity-75 hover:opacity-100 transition-opacity"></div>
            <div className="h-4 w-4 bg-red-500 -ml-2 rounded-full opacity-100 hover:opacity-75"></div>
          </motion.div>

          {/* Mobile meni button */}
          <motion.button
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.1,
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <HiX className="size-6" />
            ) : (
              <HiMenu className="size-6" />
            )}
          </motion.button>

          {/* Desktop navitems */}
          <motion.div
            variants={navContainer}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.a
                variants={navItem}
                key={index}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all 
                        ${activeLink === link.href
                    ? "text-blue-600 after:w-full"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Get in touch btn */}
          <motion.button
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,                 // আস্তে আসবে
              ease: [0.22, 1, 0.36, 1],       // very smooth (easeOutExpo vibe)
              delay: 0.15,
            }}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg
             text-sm font-medium hover:bg-blue-700 transition-all
             hover:shadow-lg hover:shadow-blue-100"
          >
            <a href="#newsletter">Get in touch</a>
          </motion.button>
        </div>

        {/* Mobile menu items */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenu}
              initial="hidden"
              animate="show"
              exit="exit"
              className="md:hidden bg-white border-t border-gray-100 py-4">
              <motion.div className="container mx-auto px-4 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.a
                    variants={mobileItem}
                    onClick={() => {
                      setActiveLink(link.href);
                      setIsMenuOpen(false);
                    }}
                    className={`block text-sm font-medium py-2 
                    ${activeLink === link.href
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                      }`}
                    key={index}
                    href={link.href}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Get in touch btn */}
                <motion.button
                  variants={mobileItem}
                  className="w-full md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
                  <a href="#newsletter">Get in touch</a>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
