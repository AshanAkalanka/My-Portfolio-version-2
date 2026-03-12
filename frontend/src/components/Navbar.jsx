import { FaMoon } from "react-icons/fa";
import { Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import avatar from "../images/logo2.png";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
];

function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDark, setIsDark } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // 50% of the section must be visible
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        navLinks.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            navLinks.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    }, [location.pathname]); // Re-run if route changes

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setActiveSection(id);
        setIsMobileMenuOpen(false); // Close menu when clicking a link

        if (location.pathname === "/") {
            // Already on home page — just smooth-scroll
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            // On another page — navigate home, then scroll after render
            navigate("/");
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 dark:bg-gray-900/70 border-b border-white/30 dark:border-gray-700/40 transition-colors duration-300">
            <div className="px-6 md:px-16 py-1 md:py-2 flex items-center justify-between">

                {/* LEFT: PHOTO + NAME */}
                <div className="flex items-center gap-3 relative z-50">
                    <img
                        src={avatar}
                        alt="Ashan"
                        className="w-9 h-9 rounded-full object-cover border border-white/50"
                    />
                    <span
                        className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        Ashan Akalanka
                    </span>
                </div>

                {/* RIGHT SIDE (Desktop & Toggles) */}
                <div className="flex items-center gap-4 md:gap-8">

                    {/* DESKTOP NAV LINKS */}
                    <div className="hidden md:flex gap-10 text-sm font-semibold text-blue-800 dark:text-blue-300">
                        {navLinks.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`/#${id}`}
                                onClick={(e) => handleNavClick(e, id)}
                                className={`transition-all duration-300 relative py-1 ${activeSection === id
                                    ? "text-blue-600 dark:text-[#64ffda]"
                                    : "hover:text-blue-600 dark:hover:text-[#64ffda] opacity-70 hover:opacity-100"
                                    }`}
                            >
                                {label}
                                {/* Active Indicator Bar */}
                                {activeSection === id && (
                                    <motion.span
                                        layoutId="activeSection"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        className="absolute -bottom-2 left-0 right-0 mx-auto w-full h-1 rounded-full bg-blue-600 dark:bg-[#64ffda]"
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 relative z-50">
                        {/* MODE TOGGLE BUTTON */}
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/70 dark:bg-gray-700/80 border border-white/40 dark:border-gray-600/50 text-gray-800 dark:text-[#64ffda] hover:scale-110 transition duration-300 relative z-50"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <FaMoon className="text-sm" />}
                        </button>

                        {/* MOBILE MENU TOGGLE */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-9 h-9 flex md:hidden items-center justify-center bg-white/70 dark:bg-gray-700/80 border border-white/40 dark:border-gray-600/50 text-gray-800 dark:text-[#64ffda] rounded-full relative z-50"
                            aria-label="Toggle mobile menu"
                        >
                            <motion.div
                                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.div>
                        </button>
                    </div>

                </div>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-[#0a192f] z-40 flex flex-col items-center justify-center md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-8 w-full px-6">
                            {navLinks.map(({ label, id }, index) => (
                                <motion.a
                                    key={id}
                                    href={`/#${id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={(e) => handleNavClick(e, id)}
                                    className={`text-2xl font-bold transition-all duration-300 ${activeSection === id
                                        ? "text-blue-600 dark:text-[#64ffda]"
                                        : "text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-[#64ffda]"
                                        }`}
                                >
                                    {label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
