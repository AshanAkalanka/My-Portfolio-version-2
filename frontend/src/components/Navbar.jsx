import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon } from "react-icons/fa";
import { Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import avatar from "../images/logo2.png";

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            }
        );

        navLinks.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            navLinks.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [location.pathname]);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setActiveSection(id);
        setIsMobileMenuOpen(false);

        if (location.pathname === "/") {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
            return;
        }

        navigate("/");
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);
    };

    return (
        <nav className="safe-top-nav theme-nav fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-white/30 transition-colors duration-300">
            <div className="px-6 md:px-16 py-1 md:py-2 flex items-center justify-between">
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

                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden md:flex gap-10 text-sm font-semibold text-blue-800 dark:text-[#5AA9FF]">
                        {navLinks.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`/#${id}`}
                                onClick={(e) => handleNavClick(e, id)}
                                className={`transition-all duration-300 relative py-1 ${activeSection === id
                                    ? "text-blue-600 dark:text-[#5AA9FF]"
                                    : "hover:text-blue-600 dark:hover:text-[#5AA9FF] opacity-70 hover:opacity-100"
                                    }`}
                            >
                                {label}
                                {activeSection === id && (
                                    <motion.span
                                        layoutId="activeSection"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        className="absolute -bottom-2 left-0 right-0 mx-auto w-full h-1 rounded-full bg-blue-600 dark:bg-[#5AA9FF]"
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 relative z-50">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="theme-control w-9 h-9 rounded-full flex items-center justify-center bg-white/70 border border-white/40 text-gray-800 dark:text-[#5AA9FF] hover:scale-110 transition duration-300 relative z-50"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <FaMoon className="text-sm" />}
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="theme-control w-9 h-9 flex md:hidden items-center justify-center bg-white/70 border border-white/40 text-gray-800 dark:text-[#5AA9FF] rounded-full relative z-50"
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

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100dvh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-menu-overlay theme-section absolute top-0 left-0 w-full min-h-screen bg-white z-40 flex flex-col items-center justify-center md:hidden overflow-hidden"
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
                                        ? "text-blue-600 dark:text-[#5AA9FF]"
                                        : "text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-[#5AA9FF]"
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
