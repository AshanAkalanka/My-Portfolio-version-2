import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome as Home, FiUser as UserRound, FiBookOpen as GraduationCap, FiCode as Code2, FiFolder as FolderKanban, FiMail as Mail } from "react-icons/fi";
import { FiArrowRight as ArrowRight } from "react-icons/fi";
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
    const [isPillVisible, setIsPillVisible] = useState(true);
    const navRef = useRef(null);    const { isDark, setIsDark } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isHeroSection = location.pathname === "/" && activeSection === "home";

    useLayoutEffect(() => {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) return;

        let currentColor = "#ffffff";
        if (activeSection === "home" && location.pathname === "/") {
            currentColor = isDark ? "#000000" : "#ffffff";
        } else if (activeSection === "contact") {
            currentColor = isDark ? "#000000" : "#ffffff";
        } else {
            currentColor = isDark ? "#000000" : "#f6f8fc";
        }

        themeColorMeta.setAttribute("content", currentColor);
        
        // Also update HTML/Body background color so iOS Safari over-scroll (bounce) matches the current section
        document.documentElement.style.backgroundColor = currentColor;
        document.body.style.backgroundColor = currentColor;
    }, [isDark, activeSection, location.pathname]);

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
                setIsPillVisible(true);
                accumulatedScroll = 0;
                return;
            }

            if (accumulatedScroll >= directionThreshold) {
                setIsPillVisible(direction < 0);
                accumulatedScroll = 0;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const closeOnOutsideClick = (event) => {
            if (!navRef.current?.contains(event.target)) {                setIsMobileMenuOpen(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {                setIsMobileMenuOpen(false);
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
        e.preventDefault();        setActiveSection(id);
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
                    <button type="button" className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={isMobileMenuOpen ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 12h18M3 17h18"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
                    </button>
                </div>
            </div>
            <AnimatePresence>{isMobileMenuOpen && <motion.div id="mobile-navigation" className="mobile-navigation" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.15}}>
                <div className="design-container">{navLinks.map(({label,id,Icon}) => <a key={id} href={"/#" + id} onClick={event => handleNavClick(event,id)} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "location" : undefined}><Icon size={18} aria-hidden="true" />{label}<ArrowRight size={20} aria-hidden="true" /></a>)}</div>
            </motion.div>}</AnimatePresence>
        </nav>
            <AnimatePresence>
            {!isHeroSection && isPillVisible && <motion.div
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
                        <Icon size={18} strokeWidth={activeSection === id ? 2.25 : 1.8} aria-hidden="true" />
                        <span>{label}</span>
                    </a>
                ))}
            </motion.div>
            }
            </AnimatePresence>
        </>
    );
}

export default Navbar;
