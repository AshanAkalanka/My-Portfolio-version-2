import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome as Home, FiUser as UserRound, FiBookOpen as GraduationCap, FiCode as Code2, FiFolder as FolderKanban, FiMail as Mail } from "react-icons/fi";
import { PiSunDuotone as Sun, PiMoonStarsDuotone as Moon } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
    { label: "Home", id: "home", Icon: Home },
    { label: "Work", id: "projects", Icon: FolderKanban },
    { label: "About", id: "about", Icon: UserRound },
    { label: "Skills", id: "skills", Icon: Code2 },
    { label: "Education", id: "education", Icon: GraduationCap },
    { label: "Contact", id: "contact", Icon: Mail },
];

// The bottom dock is intentionally short, like a native mobile app tab bar.
// Education remains available in the unchanged header navigation.
const mobilePillLinks = navLinks.filter(({ id }) => ["home", "projects", "about", "skills", "contact"].includes(id));

function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPillVisible, setIsPillVisible] = useState(false);
    const navRef = useRef(null);
    const { isDark, setIsDark } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isHeroSection = location.pathname === "/" && activeSection === "home";

    useEffect(() => {
        let previousScrollY = window.scrollY;
        let previousDirection = 0;
        let accumulatedScroll = 0;
        const directionThreshold = 8;

        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);
            const distance = currentScrollY - previousScrollY;
            previousScrollY = currentScrollY;

            if (window.innerWidth > 767 || Math.abs(distance) < 1) return;

            const direction = Math.sign(distance);
            if (direction !== previousDirection) {
                previousDirection = direction;
                accumulatedScroll = 0;
            }
            accumulatedScroll += Math.abs(distance);

            if (currentScrollY <= 24) {
                setIsPillVisible(false);
                accumulatedScroll = 0;
                return;
            }

            if (accumulatedScroll >= directionThreshold) {
                setIsPillVisible(direction > 0);
                accumulatedScroll = 0;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.body.style.overflow = originalOverflow;
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

        const observed = new Set();
        const observeSections = () => {
            navLinks.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element && !observed.has(element)) {
                    observer.observe(element);
                    observed.add(element);
                }
            });
        };
        observeSections();

        // Sections arrive in a separate bundle; keep navigation tracking them.
        const mutations = new MutationObserver((records) => {
            if (records.some((record) => [...record.addedNodes].some((node) =>
                node.nodeType === 1 && (node.matches("section[id]") || node.querySelector("section[id]"))
            ))) observeSections();
        });
        const main = document.querySelector("main");
        if (main) mutations.observe(main, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutations.disconnect();
        };
    }, [location.pathname]);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setActiveSection(id);
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const behavior = prefersReducedMotion
            ? "auto"
            : "smooth";

        const goToSection = () => {
            setIsMobileMenuOpen(false);
            const element = document.getElementById(id);
            if (location.pathname === "/" && element) {
                element.scrollIntoView({ behavior });
                return;
            }

            navigate(`/#${id}`, { state: { scrollBehavior: behavior } });
        };

        goToSection();
    };

    return (
        <>
        <nav ref={navRef} aria-label="Primary navigation" className={"site-nav safe-top-nav " + (isHeroSection ? "site-nav--hero" : "site-nav--surface") + (isMobileMenuOpen ? " site-nav--menu-open" : "")}>
            <div className="design-container nav-layout">
                <a className="nav-brand" href="/#home" onClick={event => handleNavClick(event, "home")} style={{ fontFamily: "'Caveat', cursive" }}>Ashan Akalanka</a>
                <div className="desktop-nav">{navLinks.filter(link => link.id !== "home").map(({ label, id }) => (
                    <a key={id} href={"/#" + id} onClick={event => handleNavClick(event, id)} aria-current={activeSection === id ? "location" : undefined} className={activeSection === id ? "active" : ""}>{label}</a>
                ))}</div>
                <div className="nav-controls">
                    <button type="button" className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>{isDark ? <Sun size={22} aria-hidden="true" /> : <Moon size={22} aria-hidden="true" />}</button>
                    <button type="button" className="mobile-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open mobile menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="17" x2="20" y2="17" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>

        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    id="mobile-navigation"
                    className="mobile-menu-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation Menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                >
                    <div className="mobile-menu-header safe-top-nav">
                        <div className="design-container mobile-menu-header-inner">
                            <a
                                className="nav-brand"
                                href="/#home"
                                onClick={(event) => handleNavClick(event, "home")}
                                style={{ fontFamily: "'Caveat', cursive" }}
                            >
                                Ashan Akalanka
                            </a>
                            <div className="mobile-menu-actions">
                                <button
                                    type="button"
                                    className="theme-toggle"
                                    onClick={() => setIsDark(!isDark)}
                                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    {isDark ? <Sun size={22} aria-hidden="true" /> : <Moon size={22} aria-hidden="true" />}
                                </button>
                                <button
                                    type="button"
                                    className="mobile-menu-close"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-label="Close mobile menu"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="mobile-menu-body"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsMobileMenuOpen(false);
                            }
                        }}
                    >
                        <motion.nav
                            className="mobile-menu-links"
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.06,
                                    },
                                },
                            }}
                        >
                            {navLinks.map(({ label, id }) => (
                                <motion.a
                                    key={id}
                                    href={"/#" + id}
                                    onClick={(event) => handleNavClick(event, id)}
                                    className={"mobile-menu-link" + (activeSection === id ? " active" : "")}
                                    aria-current={activeSection === id ? "location" : undefined}
                                    variants={{
                                        hidden: { opacity: 0, y: 14 },
                                        show: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.24, ease: "easeOut" },
                                        },
                                    }}
                                >
                                    <span>{label}</span>
                                </motion.a>
                            ))}
                        </motion.nav>
                    </div>

                    <div className="mobile-menu-footer">
                        <p className="mobile-menu-tagline">AI Undergraduate · Software Developer</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {!isHeroSection && isPillVisible && !isMobileMenuOpen && (
                <motion.div
                    className="mobile-pill-nav"
                    role="navigation"
                    aria-label="Mobile navigation"
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.96 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                >
                    {mobilePillLinks.map(({ label, id, Icon }) => (
                        <a
                            key={id}
                            href={"/#" + id}
                            onClick={event => handleNavClick(event, id)}
                            className={activeSection === id ? "active" : ""}
                            aria-current={activeSection === id ? "location" : undefined}
                        >
                            <Icon size={18} strokeWidth={activeSection === id ? 2.2 : 1.8} aria-hidden="true" />
                            <span>{label}</span>
                        </a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
}

export default Navbar;
