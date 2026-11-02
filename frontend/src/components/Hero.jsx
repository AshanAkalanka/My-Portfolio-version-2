import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiDownload as Download, FiGithub as Github, FiLinkedin as Linkedin, FiCode as Code2 } from "react-icons/fi";
import { FiArrowDown as ArrowDown, FiArrowRight as ArrowRight, FiSliders, FiRotateCcw, FiCheck, FiPlus } from "react-icons/fi";
import useAmbientMotion from "../hooks/useAmbientMotion";
import usePageVisibility from "../hooks/usePageVisibility";
import portrait from "../images/photo.webp";
import ProgressiveImage from "./ProgressiveImage";
import HeroStars from "./HeroStars";

const DEFAULT_HERO_COLOR = "none";

const PRESET_COLORS = [
    { name: "Warm Orange", hex: "#fba54b" },
    { name: "Electric Blue", hex: "#3b82f6" },
    { name: "Cosmic Purple", hex: "#a855f7" },
    { name: "Emerald Green", hex: "#10b981" },
    { name: "Hot Pink", hex: "#ec4899" },
    { name: "Warm Gold", hex: "#f59e0b" },
    { name: "Cyan Aqua", hex: "#06b6d4" },
    { name: "Royal Indigo", hex: "#6366f1" },
    { name: "Teal Green", hex: "#14b8a6" },
    { name: "Crimson Red", hex: "#e11d48" }
];

const typewriterWords = [
    "AI Undergraduate",
    "Software Developer",
    "ML Enthusiast",
    "Problem Solver"
];

function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHue(hex) {
    if (!hex || hex === "none" || !hex.startsWith("#")) return 28;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0;
    if (max === min) return 0;
    const d = max - min;
    switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
    }
    return Math.round(h * 60);
}

function HeroColorPicker({ currentColor, onColorChange, onReset }) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);
    const triggerRef = useRef(null);
    const [hue, setHue] = useState(() => hexToHue(currentColor));

    useEffect(() => {
        if (currentColor !== "none") {
            setHue(hexToHue(currentColor));
        }
    }, [currentColor]);

    const handleHueChange = (e) => {
        const newHue = Number(e.target.value);
        setHue(newHue);
        onColorChange(hslToHex(newHue, 92, 58));
    };

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target) &&
                !triggerRef.current?.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="hero-color-picker-wrap">
            <button
                ref={triggerRef}
                type="button"
                className={`hero-color-trigger ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Customize hero glow color"
                title="Customize hero glow color"
            >
                <span
                    className="hero-color-swatch-dot"
                    style={{
                        backgroundColor: currentColor === "none" ? "transparent" : currentColor,
                        borderColor: currentColor === "none" ? "var(--line)" : "transparent"
                    }}
                />
                <span>Glow</span>
                <FiSliders size={13} aria-hidden="true" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={popoverRef}
                        className="hero-color-popover"
                        initial={{ opacity: 0, scale: 0.94, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 6 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-label="Hero glow color picker"
                    >
                        <div className="hero-color-popover-header">
                            <span className="hero-color-popover-title">Hero Glow</span>
                            <button
                                type="button"
                                className="hero-color-reset-btn"
                                onClick={onReset}
                                title="Reset to original white"
                            >
                                <FiRotateCcw size={11} /> None
                            </button>
                        </div>

                        <div className="hero-color-grid">
                            {PRESET_COLORS.map((item) => {
                                const isSelected = currentColor.toLowerCase() === item.hex.toLowerCase();
                                return (
                                    <button
                                        key={item.hex}
                                        type="button"
                                        className={`hero-color-cell ${isSelected ? "selected" : ""}`}
                                        style={{ backgroundColor: item.hex }}
                                        onClick={() => onColorChange(item.hex)}
                                        title={item.name}
                                        aria-label={item.name}
                                    >
                                        {isSelected && <FiCheck size={14} className="hero-color-check" />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="hero-color-slider-row" title="Slide to pick any color hue">
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={hue}
                                onChange={handleHueChange}
                                className="hero-color-hue-slider"
                                aria-label="Hue color slider"
                            />
                        </div>

                        <div className="hero-color-custom-row">
                            <label className="hero-color-custom-label">
                                <span
                                    className="hero-color-custom-swatch"
                                    style={{
                                        backgroundColor: currentColor === "none" ? "#14b8a6" : currentColor
                                    }}
                                >
                                    <input
                                        type="color"
                                        value={currentColor === "none" ? "#14b8a6" : currentColor}
                                        onChange={(e) => onColorChange(e.target.value)}
                                        className="hero-color-native-input"
                                        aria-label="Pick custom color"
                                    />
                                    <FiPlus size={14} />
                                </span>
                                <span className="hero-color-custom-text">Custom color</span>
                            </label>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Hero() {
    const heroRef = useRef(null);
    const animateBorder = useAmbientMotion(heroRef);
    const animatePortraitBorder = useAmbientMotion(heroRef, { allowMobile: true });

    const [heroColor, setHeroColor] = useState(() => {
        try {
            return localStorage.getItem("hero_glow_color") || DEFAULT_HERO_COLOR;
        } catch {
            return DEFAULT_HERO_COLOR;
        }
    });

    const handleColorChange = (newColor) => {
        setHeroColor(newColor);
        try {
            localStorage.setItem("hero_glow_color", newColor);
        } catch {}
    };

    const handleResetColor = () => {
        setHeroColor("none");
        try {
            localStorage.removeItem("hero_glow_color");
        } catch {}
    };

    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const reducedMotion = useReducedMotion();
    const pageVisible = usePageVisibility();

    useEffect(() => {
        if (reducedMotion) {
            setText(typewriterWords[wordIndex % typewriterWords.length]);
            return;
        }
        if (!pageVisible) return;

        const currentWord = typewriterWords[wordIndex % typewriterWords.length];

        if (!isDeleting && text === currentWord) {
            const timeout = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && text === "") {
            const timeout = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % typewriterWords.length);
            }, 350);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
        }, isDeleting ? 45 : 85);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, reducedMotion, pageVisible]);

    return (
        <section
            ref={heroRef}
            id="home"
            className="hero-section"
            data-animate={animateBorder}
            data-glow={heroColor !== "none"} style={heroColor !== "none" ? { "--hero-glow": heroColor } : undefined}
        >
            <HeroStars />
            <div className="design-container hero-layout">
                <motion.div className="hero-copy" initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="hero-greeting">Hi, I'm <span className="hero-name-accent">Ashan Akalanka</span></p>
                    <h1 className="hero-typewriter-heading" aria-label={`I am an ${typewriterWords[wordIndex % typewriterWords.length]}`}>
                        <span className="hero-typewriter-text">{text}</span>
                        <span className="hero-cursor" aria-hidden="true">|</span>
                    </h1>
                    <p className="hero-description">AI undergraduate. Software developer. Curious by nature. I turn complex problems into thoughtful, useful digital experiences.</p>
                    <div className="hero-actions">
                        <motion.a whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="design-button button-cyan" href="#projects">Explore my work <ArrowRight size={18} aria-hidden="true" /></motion.a>
                        <motion.a whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="design-button button-hero-outline" href="/resume.pdf" download>Download CV <Download size={16} aria-hidden="true" /></motion.a>
                    </div>
                    <div className="hero-socials">
                        <span>Find me on</span>
                        <a href="https://github.com/AshanAkalanka" target="_blank" rel="noreferrer" aria-label="GitHub" className="hero-social-github"><Github size={18} /> GitHub</a>
                        <a href="https://www.linkedin.com/in/ashanakalanka" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hero-social-linkedin"><Linkedin size={18} /> LinkedIn</a>
                    </div>
                </motion.div>
                <div className="hero-visual">
                    <div className="portrait-caption"><Code2 size={17} aria-hidden="true" /><span>Always learning · Always building</span></div>
                    <div className="hero-portrait-frame" data-animate={animatePortraitBorder}>
                        <div className="hero-portrait">
                            <ProgressiveImage src={portrait} alt="Ashan Akalanka outdoors" loading="eager" fetchPriority="high" width="640" height="853" wrapperClassName="h-full w-full" className="h-full w-full object-cover" />
                            <div className="portrait-label"><span>Based in Sri Lanka</span><span>Open to opportunities <span className="status-dot" /></span></div>
                        </div>
                    </div>
                    <span className="visual-coordinate" aria-hidden="true">&lt; built with curiosity /&gt;</span>
                </div>
            </div>
            <div className="design-container hero-foot">
                <a href="#projects" className="hero-scroll"><ArrowDown size={20} aria-hidden="true" /> Scroll to discover</a>
                <HeroColorPicker
                    currentColor={heroColor}
                    onColorChange={handleColorChange}
                    onReset={handleResetColor}
                />
            </div>
        </section>
    );
}
