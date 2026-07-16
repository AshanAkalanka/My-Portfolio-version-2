import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    const isHeroSection = location.pathname === "/" && activeSection === "home";

    useLayoutEffect(() => {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');

        if (!themeColorMeta) return;

        const navbarColor = isMobileMenuOpen
            ? isDark ? "#040814" : "#f4f4f4"
            : isHeroSection
                ? "#162b3f"
                : isDark ? "#080d1a" : "#eeeeef";

        themeColorMeta.setAttribute("content", navbarColor);
    }, [isDark, isHeroSection, isMobileMenuOpen]);

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
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth";

        if (location.pathname === "/") {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior });
            }
            return;
        }

        navigate("/");
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior });
            }
        }, 300);
    };

    return (
        <nav aria-label="Primary navigation" className={`site-nav safe-top-nav fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isHeroSection ? "site-nav--hero" : "site-nav--surface"
        }`}>
            <div className="px-6 md:px-16 py-3 md:py-5 flex items-center justify-between">
                <div className="flex items-center gap-3 relative z-50">

                    <span
                        className={`text-2xl font-bold transition-colors duration-300 ${
                            isHeroSection ? "text-white" : "text-gray-900 dark:text-white"
                        }`}
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        Ashan Akalanka
                    </span>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden md:flex items-center gap-9 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.22em]">
                        {navLinks.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`/#${id}`}
                                onClick={(e) => handleNavClick(e, id)}
                                className={`relative whitespace-nowrap py-1 transition-colors duration-300 ${activeSection === id
                                    ? "text-primary dark:text-[#38BDF8]"
                                    : isHeroSection
                                        ? "text-white/55 hover:text-white/85 dark:hover:text-[#38BDF8]"
                                        : "text-gray-500 hover:text-gray-800 dark:text-[#89938F] dark:hover:text-[#38BDF8]"
                                }`}
                            >
                                {label}
                                {activeSection === id && (
                                    <motion.span
                                        layoutId="activeSection"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-full bg-current"
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 relative z-50">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`nav-icon-button w-9 h-9 rounded-full flex items-center justify-center border hover:scale-110 transition duration-300 relative z-50 ${
                                isHeroSection
                                    ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    : "theme-control bg-white/70 border-white/40 text-gray-800 dark:text-[#38BDF8] dark:hover:text-white"
                            }`}
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <span
                                className={`material-symbols-rounded transition-colors ${
                                    isDark ? "text-[#FACC15]" : ""
                                }`}
                                aria-hidden="true"
                            >
                                {isDark ? "light_mode" : "dark_mode"}
                            </span>
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`nav-icon-button w-9 h-9 flex md:hidden items-center justify-center border rounded-full relative z-50 ${
                                isHeroSection
                                    ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    : "theme-control bg-white/70 border-white/40 text-gray-800 dark:text-[#38BDF8] dark:hover:text-white"
                            }`}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <motion.div
                                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex h-full w-full items-center justify-center"
                            >
                                <span className="material-symbols-outlined" aria-hidden="true">
                                    {isMobileMenuOpen ? "close" : "more_horiz"}
                                </span>
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
                        transition={{ duration: 0.28 }}
                        className="mobile-menu-overlay theme-section fixed inset-0 z-40 flex items-center justify-center bg-white px-6 pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] md:hidden"
                    >
                        <motion.div
                            id="mobile-navigation"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                            initial={{ opacity: 0, y: 16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.97 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="w-full max-w-xs"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map(({ label, id }, index) => (
                                    <motion.a
                                        key={id}
                                        href={`/#${id}`}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.035 * index }}
                                        onClick={(e) => handleNavClick(e, id)}
                                        className={`relative flex min-h-14 items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-300 ${activeSection === id
                                            ? "bg-primary/10 text-primary dark:bg-[#38BDF8]/15 dark:text-[#38BDF8]"
                                            : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#38BDF8]/10 dark:hover:text-[#38BDF8]"
                                        }`}
                                    >
                                        <span className="font-mono text-[10px] font-bold opacity-55">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-sm font-bold uppercase tracking-[0.13em]">
                                            {label}
                                        </span>
                                        {activeSection === id && (
                                            <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-current" />
                                        )}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
