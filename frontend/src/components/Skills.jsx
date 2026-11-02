import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaPython, FaReact, FaJava, FaNodeJs, FaDocker, FaFigma, FaJira, FaGithub } from "react-icons/fa";
import {
    SiAndroidstudio,
    SiCanva,
    SiCss3,
    SiExpress,
    SiFramer,
    SiHtml5,
    SiHuggingface,
    SiJavascript,
    SiJupyter,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiPostgresql,
    SiR,
    SiScikitlearn,
    SiSqlite,
    SiSpringboot,
    SiTailwindcss,
    SiTensorflow,
    SiTypescript,
    SiVite,
    SiDotnet,
} from "react-icons/si";
import { TbApi, TbPlugConnected, TbSql, TbBrandCSharp } from "react-icons/tb";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Reveal from "./Reveal";

const skillIcons = {
    "Python": { icon: FaPython, color: "text-[#3776AB]" },
    "C#": { icon: TbBrandCSharp, color: "text-[#239120]" },
    ".NET": { icon: SiDotnet, color: "text-[#512BD4]" },
    "SQL": { icon: TbSql, color: "text-[#4479A1]" },
    "R": { icon: SiR, color: "text-[#276DC3]" },
    "Typescript": { icon: SiTypescript, color: "text-[#3178C6]" },
    "React.js": { icon: FaReact, color: "text-[#61DAFB]" },
    "HTML": { icon: SiHtml5, color: "text-[#E34F26]" },
    "CSS": { icon: SiCss3, color: "text-[#1572B6]" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "text-[#06B6D4]" },
    "Framer Motion": { icon: SiFramer, color: "text-[#0055FF]" },
    "Vite": { icon: SiVite, color: "text-[#646CFF]" },
    "Java": { icon: FaJava, color: "text-[#007396]" },
    "Node.js": { icon: FaNodeJs, color: "text-[#339933]" },
    "Spring Boot": { icon: SiSpringboot, color: "text-[#6DB33F]" },
    "WebSockets": { icon: TbPlugConnected, color: "text-[#8B5CF6]" },
    "TensorFlow": { icon: SiTensorflow, color: "text-[#FF6F00]" },
    "Hugging Face": { icon: SiHuggingface, color: "text-[#FFD21E]" },
    "Jupyter Notebook": { icon: SiJupyter, color: "text-[#F37626]" },
    "Scikit-learn": { icon: SiScikitlearn, color: "text-[#F7931E]" },
    "Next.js": { icon: SiNextdotjs, color: "text-gray-900 dark:text-[#d7def7]" },
    "Express.js": { icon: SiExpress, color: "text-gray-900 dark:text-[#d7def7]" },
    "MongoDB": { icon: SiMongodb, color: "text-[#47A248]" },
    "PostgreSQL": { icon: SiPostgresql, color: "text-[#336791] dark:text-[#8bbce5]" },
    "MySQL": { icon: SiMysql, color: "text-[#4479A1] dark:text-[#87bddd]" },
    "SQLite": { icon: SiSqlite, color: "text-[#003B57] dark:text-[#83c8e9]" },
    "JavaScript": { icon: SiJavascript, color: "text-[#F7DF1E]" },
    "Git & GitHub": { icon: FaGithub, color: "text-gray-900 dark:text-[#d7def7]" },
    "Docker": { icon: FaDocker, color: "text-[#2496ED]" },
    "REST APIs": { icon: TbApi, color: "text-gray-600 dark:text-[#a8b3d1]" },
    "Figma": { icon: FaFigma, color: "text-[#F24E1E]" },
    "Canva": { icon: SiCanva, color: "text-[#00C4CC]" },
    "Jira": { icon: FaJira, color: "text-[#0052CC]" },
    "Android Studio": { icon: SiAndroidstudio, color: "text-[#3DDC84]" },
};

const skillGroups = [
    {
        id: "languages",
        number: "01",
        title: "Languages",
        description: "Core programming languages",
        skills: ["C#", "Python", "Typescript", "Java", "JavaScript", "SQL", "R"],
    },
    {
        id: "frontend",
        number: "02",
        title: "Frontend",
        description: "Interfaces & web experiences",
        skills: [
            "React.js",
            "Next.js",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Framer Motion",
            "Vite",
        ],
    },
    {
        id: "backend",
        number: "03",
        title: "Backend",
        description: "APIs & server-side systems",
        skills: [".NET", "Node.js", "Express.js", "REST APIs", "Spring Boot", "WebSockets"],
    },
    {
        id: "databases",
        number: "04",
        title: "Databases",
        description: "Relational & document data",
        skills: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"],
    },
    {
        id: "ai-ml",
        number: "05",
        title: "AI & ML",
        description: "Intelligent models & tools",
        skills: [
            "TensorFlow",
            "Hugging Face",
            "Jupyter Notebook",
            "Scikit-learn",
        ],
    },
    {
        id: "tools",
        number: "06",
        title: "Tools & Design",
        description: "Workflow, devops & UI design",
        skills: ["Git & GitHub", "Docker", "Figma", "Canva", "Jira", "Android Studio"],
    },
];

function Skills({ id = "skills" }) {
    const trackRef = useRef(null);
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    const checkScroll = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 2) {
            setActiveCardIndex(0);
            return;
        }
        const scrollRatio = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
        const index = Math.round(scrollRatio * (skillGroups.length - 1));
        setActiveCardIndex(Math.min(Math.max(0, index), skillGroups.length - 1));
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        checkScroll();
        track.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll);
        return () => {
            track.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [checkScroll]);

    const scrollByDirection = (direction) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector(".skill-square-card");
        const step = card ? card.offsetWidth + 24 : 320;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 2) return;

        if (direction > 0) {
            if (track.scrollLeft >= maxScroll - 8) {
                track.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                track.scrollTo({ left: Math.min(maxScroll, track.scrollLeft + step), behavior: "smooth" });
            }
        } else {
            if (track.scrollLeft <= 8) {
                track.scrollTo({ left: maxScroll, behavior: "smooth" });
            } else {
                track.scrollTo({ left: Math.max(0, track.scrollLeft - step), behavior: "smooth" });
            }
        }
    };

    const scrollToCard = (index) => {
        const track = trackRef.current;
        if (!track) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 2) return;
        const targetLeft = (index / (skillGroups.length - 1)) * maxScroll;
        track.scrollTo({ left: targetLeft, behavior: "smooth" });
        setActiveCardIndex(index);
    };

    return (
        <motion.section
            id={id || undefined}
            className="skills-square-section section-dark-skills scroll-mt-24 transition-colors duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
        >
            <div className="skills-square-container">
                {/* 100% Centered Skills Header */}
                <Reveal className="skills-center-header">
                    <p className="design-eyebrow"><span>03</span> TECH STACK</p>
                    <h2>My Skills</h2>
                    <p className="design-section-description">
                        Technologies grouped by how I use them across software, web, and AI projects.
                    </p>
                </Reveal>

                {/* Square Cards: Desktop 4 in upper, 2 in lower; Mobile horizontal scroll */}
                <div className="skills-track-wrapper">
                    <button
                        type="button"
                        onClick={() => scrollByDirection(-1)}
                        aria-label="Previous skill category"
                        className="skills-desktop-arrow skills-desktop-arrow--prev"
                    >
                        <FiChevronLeft size={32} strokeWidth={1.8} aria-hidden="true" />
                    </button>

                    <div
                    ref={trackRef}
                    className="skills-square-track"
                    tabIndex={0}
                    aria-label="Skill categories"
                >
                    {skillGroups.map((group, groupIndex) => (
                        <motion.article
                            key={group.id}
                            className={`skill-square-card skill-square-card--${group.id}`}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
                        >
                            <div className="skill-card-top">
                                <div className="skill-card-title-wrap">
                                    <span className="skill-card-number">{group.number}</span>
                                    <h3 className="skill-card-title">{group.title}</h3>
                                </div>
                                <span className="skill-card-badge">{group.skills.length} Techs</span>
                            </div>

                            <div className="skill-card-body">
                                <div className="skill-chips-grid">
                                    {group.skills.map((skillName) => {
                                        const skillData = skillIcons[skillName] || {
                                            icon: FaReact,
                                            color: "text-gray-600 dark:text-[#a8b3d1]",
                                        };
                                        const IconComponent = skillData.icon;

                                        return (
                                            <div key={skillName} className="skill-square-chip">
                                                <IconComponent
                                                    className={`skill-square-chip-icon ${skillData.color}`}
                                                    aria-hidden="true"
                                                />
                                                <span className="skill-square-chip-text">{skillName}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="skill-card-footer">
                                <p className="skill-card-desc">{group.description}</p>
                            </div>
                        </motion.article>
                    ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollByDirection(1)}
                        aria-label="Next skill category"
                        className="skills-desktop-arrow skills-desktop-arrow--next"
                    >
                        <FiChevronRight size={32} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                </div>

                {/* Mobile carousel controls (hidden on desktop) */}
                <div className="skills-carousel-controls-wrap">
                    <div className="skills-carousel-arrows">
                        <button
                            type="button"
                            onClick={() => scrollByDirection(-1)}
                            aria-label="Previous skill category"
                            className="skills-nav-arrow"
                        >
                            <FiChevronLeft size={28} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByDirection(1)}
                            aria-label="Next skill category"
                            className="skills-nav-arrow"
                        >
                            <FiChevronRight size={28} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                    </div>

                    <div className="skills-carousel-dots" role="tablist" aria-label="Skill categories">
                        {skillGroups.map((group, index) => (
                            <button
                                key={group.id}
                                type="button"
                                role="tab"
                                aria-selected={index === activeCardIndex}
                                aria-label={`View ${group.title}`}
                                className={`skills-dot ${index === activeCardIndex ? "active" : ""}`}
                                onClick={() => scrollToCard(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Skills;
