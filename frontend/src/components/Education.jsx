import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
    FiAward,
    FiBookOpen,
    FiCpu,
    FiChevronLeft,
    FiChevronRight,
    FiArrowRight,
    FiCode,
    FiBarChart2,
    FiMonitor,
    FiFileText,
    FiBriefcase
} from "react-icons/fi";
import { TbBrain, TbNetwork } from "react-icons/tb";
import { SiGoogle, SiCoursera, SiUdemy } from "react-icons/si";
import Reveal from "./Reveal";
import usePageVisibility from "../hooks/usePageVisibility";
import { useTheme } from "../context/ThemeContext";

const educationData = [
    {
        id: 1,
        code: "2019 — 2022",
        title: "Advanced Level (Commerce Stream)",
        institution: "Eheliyagoda Central College",
        detail: "Accounting, Business Studies, Information Technology, and practical commerce fundamentals.",
        ongoing: false,
        featured: false,
        Icon: FiBookOpen,
        theme: "commerce",
        tags: ["Information Technology", "Business Studies", "Accounting"],
        diagramNodes: [
            { label: "IT & Systems", icon: FiMonitor },
            { label: "Accounting", icon: FiFileText },
            { label: "Business Studies", icon: FiBriefcase }
        ],
        actionLabel: "FOUNDATION",
    },
    {
        id: 2,
        code: "2022 — Present",
        title: "Professional Certifications",
        institution: "Coursera · Google · Udemy",
        detail: "Prompt engineering, artificial intelligence, modern web development, and programming languages.",
        ongoing: true,
        featured: false,
        Icon: FiAward,
        theme: "certifications",
        tags: ["Prompt Engineering", "Google Cloud", "Full-Stack Web", "Python & AI"],
        diagramNodes: [
            { label: "Google", icon: SiGoogle },
            { label: "Coursera", icon: SiCoursera },
            { label: "DeepLearning", icon: TbBrain },
            { label: "Udemy", icon: SiUdemy }
        ],
        actionLabel: "CREDENTIALS",
    },
    {
        id: 3,
        code: "2024 — Present",
        title: "BSc (Hons) in IT Specialising in Artificial Intelligence",
        institution: "SLIIT (Sri Lanka Institute of Information Technology)",
        detail: "Machine learning, deep learning, software engineering, and modern web technologies with a focus on building intelligent systems.",
        ongoing: true,
        featured: false,
        Icon: FiCpu,
        theme: "degree",
        tags: ["Machine Learning", "Deep Learning", "Databases", "Data Structures & Algorithms", "Fullstack Development"],
        diagramNodes: [
            { label: "AI & ML", icon: TbBrain },
            { label: "Neural Nets", icon: TbNetwork },
            { label: "Full-Stack", icon: FiCode },
            { label: "Data Science", icon: FiBarChart2 }
        ],
        actionLabel: "EXPLORE MORE",
    },
];

const educationCards = [...educationData].reverse();

export default function Education({ id = "education" }) {
    const carouselRef = useRef(null);
    const touchStartX = useRef(null);
    const [activeCard, setActiveCard] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [interacting, setInteracting] = useState(false);
    const reducedMotion = useReducedMotion();
    const pageVisible = usePageVisibility();
    const inView = useInView(carouselRef, { amount: 0.25 });
    const { isDark } = useTheme();

    const moveCards = useCallback((direction) => {
        const total = educationCards.length;
        setActiveCard((prevIndex) => {
            const nextIndex = direction > 0
                ? (prevIndex + 1 >= total ? 0 : prevIndex + 1)
                : (prevIndex - 1 < 0 ? total - 1 : prevIndex - 1);
            return nextIndex;
        });
    }, []);

    const selectCard = (index) => {
        setAutoPlay(false);
        setActiveCard(index);
    };

    useEffect(() => {
        if (!autoPlay || interacting || reducedMotion || !pageVisible || !inView) return;
        const timer = window.setTimeout(() => moveCards(1), 5500);
        return () => window.clearTimeout(timer);
    }, [autoPlay, interacting, reducedMotion, pageVisible, inView, moveCards, activeCard]);

    const getDesktopCardStyle = (position) => {
        if (position === 0) {
            return {
                x: "0%",
                scale: 1,
                zIndex: 25,
                opacity: 1,
                pointerEvents: "auto",
                filter: "brightness(1) blur(0px)",
                boxShadow: isDark
                    ? "0 28px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)"
                    : "0 24px 60px -12px rgba(16, 42, 76, 0.16), 0 0 0 1px rgba(220, 228, 240, 0.8)",
            };
        }
        if (position === -1) {
            return {
                x: "-28%",
                scale: 0.88,
                zIndex: 12,
                opacity: 0.52,
                pointerEvents: "auto",
                filter: isDark ? "brightness(0.65) blur(0.5px)" : "brightness(0.92) blur(0.5px)",
                boxShadow: isDark
                    ? "0 14px 35px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)"
                    : "0 14px 35px -10px rgba(16, 42, 76, 0.08), 0 0 0 1px rgba(220, 228, 240, 0.5)",
            };
        }
        if (position === 1) {
            return {
                x: "28%",
                scale: 0.88,
                zIndex: 12,
                opacity: 0.52,
                pointerEvents: "auto",
                filter: isDark ? "brightness(0.65) blur(0.5px)" : "brightness(0.92) blur(0.5px)",
                boxShadow: isDark
                    ? "0 14px 35px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)"
                    : "0 14px 35px -10px rgba(16, 42, 76, 0.08), 0 0 0 1px rgba(220, 228, 240, 0.5)",
            };
        }
        return {
            x: position > 0 ? "45%" : "-45%",
            scale: 0.76,
            zIndex: 5,
            opacity: 0,
            pointerEvents: "none",
            filter: "brightness(0.5) blur(2px)",
            boxShadow: "none",
        };
    };

    const getMobileCardStyle = (position) => {
        if (position === 0) {
            return {
                x: "0%",
                scale: 1,
                zIndex: 20,
                opacity: 1,
                pointerEvents: "auto",
                filter: "brightness(1) blur(0px)",
                boxShadow: isDark
                    ? "0 22px 55px -10px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08)"
                    : "0 18px 45px -10px rgba(16, 42, 76, 0.16), 0 0 0 1px rgba(220, 228, 240, 0.8)",
            };
        }
        if (position === -1) {
            return {
                x: "-30%",
                scale: 0.88,
                zIndex: 10,
                opacity: 0.5,
                pointerEvents: "auto",
                filter: isDark ? "brightness(0.65) blur(0.5px)" : "brightness(0.92) blur(0.5px)",
                boxShadow: isDark
                    ? "0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)"
                    : "0 10px 25px -5px rgba(16, 42, 76, 0.08), 0 0 0 1px rgba(220, 228, 240, 0.5)",
            };
        }
        if (position === 1) {
            return {
                x: "30%",
                scale: 0.88,
                zIndex: 10,
                opacity: 0.5,
                pointerEvents: "auto",
                filter: isDark ? "brightness(0.65) blur(0.5px)" : "brightness(0.92) blur(0.5px)",
                boxShadow: isDark
                    ? "0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)"
                    : "0 10px 25px -5px rgba(16, 42, 76, 0.08), 0 0 0 1px rgba(220, 228, 240, 0.5)",
            };
        }
        return {
            x: position > 0 ? "50%" : "-50%",
            scale: 0.75,
            zIndex: 2,
            opacity: 0,
            pointerEvents: "none",
            filter: "brightness(0.5) blur(2px)",
            boxShadow: "none",
        };
    };

    return (
        <section id={id || undefined} className="design-section education-section">
            {!isDark && (
                <>
                    <div className="education-corner-pattern education-corner-pattern--top-left" aria-hidden="true" />
                    <div className="education-corner-pattern education-corner-pattern--bottom-right" aria-hidden="true" />
                </>
            )}
            <div className="design-container education-container-wrap" ref={carouselRef}>
                {/* Centered Main Header */}
                <Reveal className="education-center-header">
                    <p className="design-eyebrow"><span>04</span> EDUCATION</p>
                    <h2>My Learning Journey</h2>
                    <p className="design-section-description">The foundation behind my work, and a journey that's still unfolding.</p>
                </Reveal>

                {/* ========================================================
                   DESKTOP VIEW (>= 768px): Wide 2-Column 3D Card Stack
                   ======================================================== */}
                <div
                    className="education-desktop-stage-wrap"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Education journey stacked cards"
                >
                    <div
                        className="education-desktop-stage"
                        onMouseEnter={() => setInteracting(true)}
                        onMouseLeave={() => setInteracting(false)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowRight") { setAutoPlay(false); moveCards(1); }
                            if (e.key === "ArrowLeft") { setAutoPlay(false); moveCards(-1); }
                        }}
                    >
                        {educationCards.map((item, index) => {
                            const total = educationCards.length;
                            let position = index - activeCard;
                            if (position > total / 2) position -= total;
                            if (position < -total / 2) position += total;

                            const Icon = item.Icon;

                            return (
                                <motion.div
                                    key={item.id}
                                    className={`education-stack-card-slot ${position === 0 ? "is-active-slot" : "is-stacked-slot"}`}
                                    animate={getDesktopCardStyle(position)}
                                    whileHover={position !== 0 ? { scale: 0.91, opacity: 0.78, transition: { duration: 0.2 } } : undefined}
                                    transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                    onClick={() => {
                                        if (position !== 0) {
                                            selectCard(index);
                                        }
                                    }}
                                >
                                    <article className="education-stack-card">
                                        {/* Left Column: Info & Story */}
                                        <div className="education-stack-info">
                                            <div className="education-stack-meta">
                                                <span className="education-stack-code">{item.code}</span>
                                                <span className="education-stack-number">0{index + 1} / EDUCATION</span>
                                            </div>

                                            <h3 className="education-stack-title">{item.title}</h3>
                                            <p className="education-stack-institution">{item.institution}</p>
                                            <p className="education-stack-desc">{item.detail}</p>

                                            {/* Key Focus Tags */}
                                            <div className="education-stack-tags">
                                                {item.tags.map((tag) => (
                                                    <span key={tag} className="education-stack-tag">{tag}</span>
                                                ))}
                                            </div>

                                            {/* Action Button */}
                                            <div className="education-stack-action">
                                                <span className="education-action-pill">
                                                    <span>{item.actionLabel}</span>
                                                    <span className="education-action-arrow">
                                                        <FiArrowRight size={15} />
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Column: Circular Diagram Graphic */}
                                        <div className="education-stack-graphic" aria-hidden="true">
                                            <div className="education-diagram-wrap">
                                                <div className="education-diagram-ring education-diagram-ring--outer" />
                                                <div className="education-diagram-ring education-diagram-ring--inner" />

                                                {/* Center Icon Hub */}
                                                <div className="education-diagram-hub">
                                                    <Icon size={40} strokeWidth={1.8} />
                                                </div>

                                                {/* Satellite Orbital Nodes */}
                                                {item.diagramNodes.map((node, i) => {
                                                    const NodeIcon = node.icon;
                                                    const isThreeNode = item.diagramNodes.length === 3;
                                                    const nodeClass = isThreeNode
                                                        ? `education-diagram-node--3node-${i + 1}`
                                                        : `education-diagram-node--${i + 1}`;
                                                    return (
                                                        <div key={node.label} className={`education-diagram-node ${nodeClass}`}>
                                                            <span className="education-node-icon">
                                                                <NodeIcon size={14} />
                                                            </span>
                                                            <span className="education-node-label">{node.label}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </article>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Desktop Controls */}
                    <div className="education-desktop-controls">
                        <button
                            type="button"
                            onClick={() => { setAutoPlay(false); moveCards(-1); }}
                            aria-label="Previous education card"
                            className="education-ctrl-chevron"
                        >
                            <FiChevronLeft size={28} strokeWidth={2.4} />
                        </button>

                        <div className="education-desktop-dots" role="tablist" aria-label="Education cards pagination">
                            {educationCards.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={index === activeCard}
                                    className={`education-dot ${index === activeCard ? "is-active" : ""}`}
                                    onClick={() => { setAutoPlay(false); selectCard(index); }}
                                    aria-label={`Show ${item.title}`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => { setAutoPlay(false); moveCards(1); }}
                            aria-label="Next education card"
                            className="education-ctrl-chevron"
                        >
                            <FiChevronRight size={28} strokeWidth={2.4} />
                        </button>
                    </div>
                </div>

                {/* ========================================================
                   MOBILE VIEW (< 768px): 3D Stack View with Original Mobile Card Content
                   ======================================================== */}
                <div
                    className="education-mobile-wrap"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Education journey mobile stack"
                >
                    <div
                        className="education-mobile-stage"
                        tabIndex={0}
                        onTouchStart={(e) => {
                            touchStartX.current = e.touches[0].clientX;
                        }}
                        onTouchEnd={(e) => {
                            if (touchStartX.current === null) return;
                            const diff = e.changedTouches[0].clientX - touchStartX.current;
                            if (diff > 35) {
                                setAutoPlay(false);
                                moveCards(-1);
                            } else if (diff < -35) {
                                setAutoPlay(false);
                                moveCards(1);
                            }
                            touchStartX.current = null;
                        }}
                    >
                        {educationCards.map((item, index) => {
                            const total = educationCards.length;
                            let position = index - activeCard;
                            if (position > total / 2) position -= total;
                            if (position < -total / 2) position += total;

                            const Icon = item.Icon;

                            return (
                                <motion.div
                                    key={item.id}
                                    className={`education-mobile-card-slot ${position === 0 ? "is-active-slot" : "is-stacked-slot"}`}
                                    animate={getMobileCardStyle(position)}
                                    transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                                    onClick={() => {
                                        if (position !== 0) {
                                            selectCard(index);
                                        }
                                    }}
                                >
                                    <article className="education-card">
                                        <div className="education-card-art" aria-hidden="true">
                                            <span className="education-card-orbit" />
                                            <Icon />
                                        </div>
                                        <div className="education-card-top">
                                            <span>{item.code}</span>
                                        </div>
                                        <div className="education-card-copy">
                                            <span className="education-card-number">0{index + 1} / EDUCATION</span>
                                            <h3>{item.title}</h3>
                                            <strong>{item.institution}</strong>
                                            <p>{item.detail}</p>
                                        </div>
                                    </article>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile Controls: Left Arrow + Dots + Right Arrow */}
                    <div className="education-desktop-controls education-mobile-controls">
                        <button
                            type="button"
                            onClick={() => { setAutoPlay(false); moveCards(-1); }}
                            aria-label="Previous education card"
                            className="education-ctrl-chevron"
                        >
                            <FiChevronLeft size={28} strokeWidth={2.4} />
                        </button>

                        <div className="education-desktop-dots" role="tablist" aria-label="Education cards switcher">
                            {educationCards.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={index === activeCard}
                                    className={`education-dot ${index === activeCard ? "is-active" : ""}`}
                                    onClick={() => { setAutoPlay(false); selectCard(index); }}
                                    aria-label={`Show ${item.title}`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => { setAutoPlay(false); moveCards(1); }}
                            aria-label="Next education card"
                            className="education-ctrl-chevron"
                        >
                            <FiChevronRight size={28} strokeWidth={2.4} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
