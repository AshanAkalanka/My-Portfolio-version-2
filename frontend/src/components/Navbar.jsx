import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Home, UserRound, GraduationCap, Code2, FolderKanban, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";


const navLinks = [
    { label: "Home", id: "home", Icon: Home },
    { label: "About", id: "about", Icon: UserRound },
    { label: "Education", id: "education", Icon: GraduationCap },
    { label: "Skills", id: "skills", Icon: Code2 },
    { label: "Projects", id: "projects", Icon: FolderKanban },
    { label: "Contact", id: "contact", Icon: Mail },
];

function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const menuCloseTimeout = useRef(null);
    const { isDark, setIsDark } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isHeroSection = location.pathname === "/" && activeSection === "home";

    useLayoutEffect(() => {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) return;

        let currentColor = "#ffffff";
        if (isDark) {
            switch (activeSection) {
                case "home": currentColor = "#081527"; break;
                case "about": currentColor = "#0c111f"; break;
                case "education": currentColor = "#111827"; break;
                case "skills": currentColor = "#0c111f"; break;
                case "projects": currentColor = "#111827"; break;
                case "contact": currentColor = "#0c111f"; break;
                default: currentColor = "#0c111f";
            }
        } else {
            switch (activeSection) {
                case "home": currentColor = "#f4f4f4"; break;
                case "about": currentColor = "#fff9ec"; break;
                case "education": currentColor = "#ffffff"; break;
                case "skills": currentColor = "#fff9ec"; break;
                case "projects": currentColor = "#f8fafc"; break;
                case "contact": currentColor = "#fff9ec"; break;
                default: currentColor = "#f4f4f4";
            }
        }

        themeColorMeta.setAttribute("content", currentColor);
        
        // Also update HTML/Body background color so iOS Safari over-scroll (bounce) matches the current section
        document.documentElement.style.backgroundColor = currentColor;
        document.body.style.backgroundColor = currentColor;
    }, [isDark, activeSection]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                window.clearTimeout(menuCloseTimeout.current);
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => () => window.clearTimeout(menuCloseTimeout.current), []);

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const closeOnOutsideClick = (event) => {
            if (!navRef.current?.contains(event.target)) {
                window.clearTimeout(menuCloseTimeout.current);
                setIsMobileMenuOpen(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                window.clearTimeout(menuCloseTimeout.current);
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
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
        window.clearTimeout(menuCloseTimeout.current);
        const previousSection = activeSection;
        setActiveSection(id);
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const behavior = prefersReducedMotion
            ? "auto"
            : "smooth";

        const goToSection = () => {
            setIsMobileMenuOpen(false);
            if (location.pathname === "/") {
                document.getElementById(id)?.scrollIntoView({ behavior });
                return;
            }

            navigate("/");
            window.setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior });
            }, 300);
        };

        if (isMobileMenuOpen && !prefersReducedMotion && id !== previousSection) {
            menuCloseTimeout.current = window.setTimeout(goToSection, 320);
        } else {
            goToSection();
        }
    };

    return (
        <nav ref={navRef} aria-label="Primary navigation" className={`site-nav safe-top-nav fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isHeroSection ? "site-nav--hero" : "site-nav--surface"
        } ${isMobileMenuOpen ? "site-nav--menu-open" : ""}`}>
            <div className="px-6 md:px-16 py-3 md:py-5 flex items-center justify-between">
                <div className="flex items-center gap-3 relative z-50">

                    <span
                        className={`text-2xl font-bold transition-colors duration-300 ${
                            isHeroSection
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-900 dark:text-white"
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
                                        ? "text-gray-500 hover:text-gray-800 dark:text-white dark:hover:text-[#38BDF8]"
                                        : "text-gray-500 hover:text-gray-800 dark:text-white dark:hover:text-[#38BDF8]"
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
                            className={`nav-icon-button relative z-50 flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 hover:scale-110 md:h-9 md:w-9 ${
                                isHeroSection
                                    ? "bg-white/5 border-white/10 text-gray-800 hover:bg-white/10 dark:text-[#38BDF8] dark:hover:text-white"
                                    : "theme-control bg-white/70 border-white/40 text-gray-800 dark:text-[#38BDF8] dark:hover:text-white"
                            }`}
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <span
                                className={`material-symbols-rounded nav-theme-icon transition-colors ${
                                    isDark ? "text-[#FACC15]" : ""
                                }`}
                                aria-hidden="true"
                            >
                                {isDark ? "light_mode" : "dark_mode"}
                            </span>
                        </button>

                        <button
                            onClick={() => {
                                window.clearTimeout(menuCloseTimeout.current);
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                            }}
                            className="relative z-50 flex h-11 w-11 items-center justify-center text-black transition-colors duration-200 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:text-white dark:focus-visible:ring-white md:hidden"
                            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-navigation"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d={isMobileMenuOpen ? "M5 5l14 14M19 5L5 19" : "M3 6h18M3 12h18M3 18h18"}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-slate-100 bg-white px-6 pb-5 pt-3 shadow-[0_18px_30px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#040814] md:hidden"
                    >
                        <div className="mx-auto w-full max-w-lg">
                            <LayoutGroup id="mobile-navigation-active">
                                <div className="flex flex-col gap-2">
                                    {navLinks.map(({ label, id, Icon }, index) => (
                                        <a
                                            key={id}
                                            href={`/#${id}`}
                                            onClick={(e) => handleNavClick(e, id)}
                                            aria-current={activeSection === id && location.pathname === "/" ? "location" : undefined}
                                            className={`relative isolate flex min-h-12 items-center gap-3 px-5 text-left text-sm transition-colors duration-200 ${activeSection === id ? "font-semibold text-white dark:text-[#081a2f]" : "text-slate-600 hover:text-[#1e3a8a] dark:text-slate-300 dark:hover:text-[#38BDF8]"} ${activeSection !== id && index < navLinks.length - 1 ? "border-b border-slate-200 dark:border-white/10" : ""}`}
                                        >
                                            {activeSection === id && (
                                                <motion.span
                                                    layoutId="mobile-active-pill"
                                                    className="absolute inset-0 z-0 rounded-full bg-[#1e3a8a] shadow-[0_4px_12px_rgba(30,58,138,0.22)] dark:bg-[#38BDF8]"
                                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                                    aria-hidden="true"
                                                />
                                            )}
                                            <Icon className="relative z-10 h-4 w-4 shrink-0" aria-hidden="true" />
                                            <span className="relative z-10">{label}</span>
                                        </a>
                                    ))}
                                </div>
                            </LayoutGroup>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
