import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon } from "react-icons/fa";
import { Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";


const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
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
    const isHeroSection = activeSection === "home";

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
        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
        }

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
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
                rootMargin: "-50% 0px -49% 0px",
                threshold: 0,
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
        <nav className={`safe-top-nav fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isHeroSection
                ? isDark
                    ? "bg-transparent border-transparent shadow-none backdrop-blur-none"
                    : "bg-transparent border-transparent shadow-none backdrop-blur-none"
                : isDark
                    ? "theme-nav backdrop-blur-md border-b"
                    : "bg-[#f4f4f4] border-b border-gray-200 shadow-sm backdrop-blur-md"
        }`}>
            <div className="px-6 md:px-16 py-1 md:py-2 flex items-center justify-between">
                <div className="flex items-center gap-3 relative z-50">

                    <span
                        className={`text-2xl font-bold transition-colors duration-300 ${
                            isHeroSection && !isDark ? "text-white" : "text-gray-900 dark:text-white"
                        }`}
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        Ashan Akalanka
                    </span>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                    <div className={`hidden md:flex gap-10 text-sm font-semibold ${
                        isHeroSection ? "text-white" : "text-primary dark:text-[#64ffda]"
                    }`}>
                        {navLinks.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`/#${id}`}
                                onClick={(e) => handleNavClick(e, id)}
                                className={`transition-all duration-300 relative py-1 ${activeSection === id
                                    ? isHeroSection
                                        ? "text-white"
                                        : "text-primary dark:text-[#64ffda]"
                                    : isHeroSection
                                        ? "text-white/90 hover:text-white opacity-90 hover:opacity-100"
                                        : "hover:text-primary dark:hover:text-[#64ffda] opacity-70 hover:opacity-100"
                                }`}
                            >
                                {label}
                                {activeSection === id && (
                                    <motion.span
                                        layoutId="activeSection"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        className="absolute -bottom-2 left-0 right-0 mx-auto w-full h-1 rounded-full bg-primary dark:bg-[#64ffda]"
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 relative z-50">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center border hover:scale-110 transition duration-300 relative z-50 ${
                                isHeroSection
                                    ? "bg-transparent border-transparent text-white"
                                    : "theme-control bg-white/70 border-white/40 text-gray-800 dark:text-[#64ffda] dark:hover:text-white dark:hover:border-[#64ffda]/60"
                            }`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <FaMoon className="text-sm" />}
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`w-9 h-9 flex md:hidden items-center justify-center border rounded-full relative z-50 ${
                                isHeroSection
                                    ? "bg-transparent border-transparent text-white"
                                    : "theme-control bg-white/70 border-white/40 text-gray-800 dark:text-[#64ffda] dark:hover:text-white dark:hover:border-[#64ffda]/60"
                            }`}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-menu-overlay theme-section fixed inset-0 w-full bg-white z-40 flex flex-col items-center justify-center md:hidden overflow-hidden px-6 pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
                    >
                        <div className="flex w-full max-w-xs flex-col items-stretch gap-3">
                            {navLinks.map(({ label, id }, index) => (
                                <motion.a
                                    key={id}
                                    href={`/#${id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={(e) => handleNavClick(e, id)}
                                    className={`rounded-lg px-5 py-3 text-center text-2xl font-bold transition-all duration-300 ${activeSection === id
                                        ? "bg-primary/10 text-primary dark:bg-[#64ffda]/15 dark:text-[#64ffda]"
                                        : "text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#64ffda]/10 hover:text-primary dark:hover:text-[#64ffda]"
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
