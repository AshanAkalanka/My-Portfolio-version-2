import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useIsPresent, useReducedMotion } from "framer-motion";
import { FiGithub as Github, FiImage as ImageIcon, FiPause, FiPlay, FiCloud, FiCode, FiLayers, FiGitBranch, FiChevronDown, FiSmartphone, FiCheck } from "react-icons/fi";
import { FiArrowRight as ArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaJava } from "react-icons/fa";
import { SiReact, SiNodedotjs, SiMysql, SiTailwindcss, SiSpringboot, SiHtml5, SiCss3, SiJavascript, SiNextdotjs, SiExpress, SiMongodb, SiDotnet, SiPostgresql, SiPython, SiDocker, SiGooglegemini, SiYoutube } from "react-icons/si";
import ProgressiveImage from "./ProgressiveImage";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import projects from "../data/projects";
import mobileApps from "../data/mobileApps";
import usePageVisibility from "../hooks/usePageVisibility";

const cardSlugs = ["apartment-management-system", "music-platform"];
const cardProjects = cardSlugs.map(slug => projects.find(project => project.slug === slug));
const archive = projects.filter(project => !cardSlugs.includes(project.slug));
const initialArchiveCount = Math.max(0, 10 - cardProjects.length);
const slides = [projects.find(project => project.slug === "ai-grocery-system"), ...cardProjects, ...archive.filter(project => project.slug !== "ai-grocery-system")];
const archiveTechIcons = {
    "Java spring boot": { Icon: FaJava, label: "Java Spring Boot", color: "#b45309", darkColor: "#fb923c" },
    "React": { Icon: SiReact, color: "#087ea4", darkColor: "#61dafb" },
    "React.js": { Icon: SiReact, color: "#087ea4", darkColor: "#61dafb" },
    "Node.js": { Icon: SiNodedotjs, color: "#3c873a", darkColor: "#86c768" },
    "MySQL": { Icon: SiMysql, color: "#00758f", darkColor: "#83c8e9" },
    "Tailwind CSS": { Icon: SiTailwindcss, color: "#0891b2", darkColor: "#38bdf8" },
    "Spring Boot": { Icon: SiSpringboot, color: "#4d8b20", darkColor: "#8bd356" },
    "HTML": { Icon: SiHtml5, color: "#c2410c", darkColor: "#fb923c" },
    "CSS": { Icon: SiCss3, color: "#2563eb", darkColor: "#60a5fa" },
    "JavaScript": { Icon: SiJavascript, color: "#a87800", darkColor: "#f5d547" },
    "OpenWeather API": { Icon: FiCloud, color: "#c2410c", darkColor: "#fdba74" },
    "Next.js": { Icon: SiNextdotjs, color: "#142033", darkColor: "#f5f8ff" },
    "Express": { Icon: SiExpress, color: "#142033", darkColor: "#d7e4f7" },
    "MongoDB": { Icon: SiMongodb, color: "#3c873a", darkColor: "#86c768" },
    ".NET": { Icon: SiDotnet, color: "#512bd4", darkColor: "#b6a2ff" },
    "PostgreSQL": { Icon: SiPostgresql, color: "#336791", darkColor: "#8bbce5" },
    "Python": { Icon: SiPython, color: "#3776ab", darkColor: "#85bff0" },
    "Python AI Agents": { Icon: SiPython, color: "#3776ab", darkColor: "#85bff0" },
    "CI/CD Pipeline": { Icon: FiGitBranch, color: "#245fe8", darkColor: "#62c9ff" },
    "YouTube API": { Icon: SiYoutube, color: "#dc2626", darkColor: "#ff7373" },
    "Microservices": { Icon: FiLayers, color: "#526278", darkColor: "#bac9dd" },
    "Docker": { Icon: SiDocker, color: "#1d83c1", darkColor: "#68c3f5" },
    "Gemini API": { Icon: SiGooglegemini, color: "#4285f4", darkColor: "#91b7ff" },
};

function ArchiveTech({ tech, project = false }) {
    const { Icon, label = tech, color, darkColor } = archiveTechIcons[tech] || { Icon: FiCode, color: "#526278", darkColor: "#bac9dd" };
    return <span title={label} style={{ "--tech-color": color, "--tech-dark-color": darkColor }}><Icon className="tech-icon" size={17} aria-hidden="true" /><span className="tech-label">{project ? tech : label}</span></span>;
}

const FeaturedSlide = forwardRef(function FeaturedSlide({ project, index, direction, reducedMotion }, ref) {
    const isPresent = useIsPresent();
    return (
        <motion.div ref={ref} className="featured-slide" custom={direction} aria-hidden={!isPresent || undefined} inert={!isPresent ? true : undefined} variants={{ enter: step => ({ opacity: 0, x: reducedMotion ? 0 : step * 24 }), visible: { opacity: 1, x: 0 }, exit: step => ({ opacity: 0, x: reducedMotion ? 0 : -step * 24 }) }} initial="enter" animate="visible" exit="exit" transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} role="group" aria-roledescription="slide" aria-label={String(index + 1) + " of " + slides.length}>
            <ProjectCard project={project} index={index} featured />
        </motion.div>
    );
});

function ProjectCard({ project, featured: isFeatured, index }) {
    const [detailsRevealed, setDetailsRevealed] = useState(false);
    const hasSource = project.sourceUrl && project.sourceUrl !== "#";
    const handleClick = (event) => {
        const isTouch = event.nativeEvent.pointerType === "touch" || window.matchMedia("(hover: none)").matches;
        if (!isFeatured && isTouch && !detailsRevealed) {
            event.preventDefault();
            setDetailsRevealed(true);
        }
        if (!hasSource) event.preventDefault();
    };
    return (
        <motion.a whileHover={{ y: isFeatured ? -2 : -5 }} whileTap={{ scale: 0.995 }} transition={{ type: "spring", stiffness: 280, damping: 24 }} href={project.sourceUrl} target={hasSource ? "_blank" : undefined} rel={hasSource ? "noreferrer" : undefined} aria-label={"View " + project.title + " project on GitHub"} aria-disabled={!hasSource || undefined} onClick={handleClick} onBlur={() => setDetailsRevealed(false)} data-revealed={detailsRevealed} className={"work-card" + (isFeatured ? " work-card-featured" : " work-card-reveal")}>
            <div className="work-preview">
                {project.image
                    ? <ProgressiveImage src={project.image} alt={project.title + " interface preview"} wrapperClassName="h-full w-full" className="h-full w-full object-contain object-center" />
                    : <div className="project-preview-placeholder" role="img" aria-label={project.title + " interface preview"}><ImageIcon size={40} aria-hidden="true" /><span>Preview coming soon</span></div>}
                <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
                {!isFeatured && <span className="work-preview-arrow"><ArrowRight size={26} aria-hidden="true" /></span>}
            </div>
            <div className="work-content">
                <span className="work-category">{isFeatured && "Featured project / "}{project.category}</span>
                <h3>{project.title}</h3>
                <p>{isFeatured ? project.longDescription : project.description}</p>
                {project.tech.length > 0 && <div className="work-technologies">{project.tech.map(tech => <ArchiveTech key={tech} tech={tech} project />)}</div>}
                <span className="work-action"><Github className="work-action-icon" size={22} aria-hidden="true" /><span className="work-action-label">Explore on GitHub</span><ArrowRight className="work-action-arrow" size={22} aria-hidden="true" /></span>
            </div>
        </motion.a>
    );
}

function MobileAppCard({ app, index }) {
    const hasSource = app.sourceUrl && app.sourceUrl !== "#";
    return (
        <Reveal as="article" className="mobile-app-card" delay={index % 2 * 0.08}>
            <div className="mobile-app-preview">
                <ProgressiveImage src={app.image} alt={app.title + " mobile interface"} wrapperClassName="mobile-app-image" width="900" height="1600" />
            </div>
            <div className="mobile-app-content">
                <span className="mobile-app-category">{app.category}</span>
                <h4>{app.title}</h4>
                <p>{app.description}</p>
                <ul className="mobile-app-features">{app.features.map(feature => <li key={feature}><FiCheck size={15} aria-hidden="true" />{feature}</li>)}</ul>
                <div className="mobile-app-technologies" aria-label="Project technologies">{app.tech.map(tech => <ArchiveTech key={tech} tech={tech} />)}</div>
                {hasSource && <a className="design-text-link mobile-app-source" href={app.sourceUrl} target="_blank" rel="noreferrer" aria-label={"View " + app.title + " mobile project on GitHub"}><Github size={16} aria-hidden="true" />View project<ArrowRight size={18} aria-hidden="true" /></a>}
            </div>
        </Reveal>
    );
}

export default function Projects({ id = "projects" }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [direction, setDirection] = useState(1);
    const [autoPlay, setAutoPlay] = useState(true);
    const [interacting, setInteracting] = useState(false);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const showcaseRef = useRef(null);
    const inView = useInView(showcaseRef, { amount: 0.35 });
    const pageVisible = usePageVisibility();
    const reducedMotion = useReducedMotion();
    const visibleArchive = showAllProjects ? archive : archive.slice(0, initialArchiveCount);
    const changeSlide = useCallback((step) => {
        setDirection(step);
        setActiveSlide(current => (current + step + slides.length) % slides.length);
    }, []);
    const selectSlide = (index) => {
        if (index === activeSlide) return;
        const forwardSteps = (index - activeSlide + slides.length) % slides.length;
        setDirection(forwardSteps <= slides.length / 2 ? 1 : -1);
        setActiveSlide(index);
    };
    useEffect(() => {
        if (!autoPlay || interacting || !inView || !pageVisible || reducedMotion) return;
        const timer = window.setInterval(() => changeSlide(1), 6000);
        return () => window.clearInterval(timer);
    }, [autoPlay, interacting, inView, pageVisible, reducedMotion, changeSlide, activeSlide]);
    const handleCarouselKey = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            changeSlide(event.key === "ArrowRight" ? 1 : -1);
        }
    };
    return (
        <section id={id || undefined} className="design-section projects-section">
            <div className="design-container">
                <SectionHeader number="01" label="SELECTED WORK" title="A few things I've brought to life" description="From intelligent tools to everyday experiences. A selection of projects that put ideas into practice." action={<a className="design-text-link" href="https://github.com/AshanAkalanka" target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> All repositories <ArrowRight size={22} aria-hidden="true" /></a>} />
                <div className="work-grid">
                    <div ref={showcaseRef} className="featured-showcase" role="region" aria-roledescription="carousel" aria-label="Project showcase" onKeyDown={handleCarouselKey} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
                        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                            <FeaturedSlide key={slides[activeSlide].slug} project={slides[activeSlide]} index={activeSlide} direction={direction} reducedMotion={reducedMotion} />
                        </AnimatePresence>
                        <button className="carousel-side-arrow carousel-previous" type="button" onClick={() => changeSlide(-1)} aria-label="Previous project"><FiChevronLeft size={32} strokeWidth={1.8} aria-hidden="true" /></button>
                        <button className="carousel-side-arrow carousel-next" type="button" onClick={() => changeSlide(1)} aria-label="Next project"><FiChevronRight size={32} strokeWidth={1.8} aria-hidden="true" /></button>
                        <div className="carousel-pagination" role="group" aria-label="Choose featured project">
                            <div className="carousel-pagination-track">
                                {slides.map((project, index) => (
                                    <button
                                        key={project.slug}
                                        className={`carousel-pagination-button${index === activeSlide ? " is-current" : ""}`}
                                        type="button"
                                        aria-label={`Show project ${index + 1}: ${project.title}`}
                                        aria-current={index === activeSlide ? "true" : undefined}
                                        onClick={() => selectSlide(index)}
                                    >
                                        {index === activeSlide ? (
                                            <motion.span
                                                layoutId="featured-project-active-pill"
                                                className="carousel-pagination-active-pill"
                                                aria-hidden="true"
                                                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
                                            />
                                        ) : (
                                            <span className="carousel-pagination-indicator" aria-hidden="true" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="project-carousel-controls">
                            <span className="carousel-hint">Browse all projects</span>
                            <span className="carousel-count" aria-live={autoPlay && !interacting && !reducedMotion ? "off" : "polite"} aria-atomic="true">{String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
                            {!reducedMotion && <button type="button" className="carousel-playback" aria-label={autoPlay ? "Pause automatic projects" : "Play automatic projects"} onClick={() => setAutoPlay(current => !current)}>{autoPlay ? <FiPause size={16} aria-hidden="true" /> : <FiPlay size={16} aria-hidden="true" />}</button>}
                        </div>
                    </div>
                    {cardProjects.map((project, index) => <Reveal key={project.slug} delay={index * 0.08}><ProjectCard project={project} index={index} /></Reveal>)}
                </div>
                <div className="archive-heading"><h3>More things I've built</h3><span>{String(archive.length).padStart(2, "0")} more projects</span></div>
                <div id="project-archive" className="archive-list">{visibleArchive.map((project, index) => (
                    <Reveal as="a" delay={index < initialArchiveCount ? index * 0.04 : 0} whileHover={{ x: 4 }} href={project.sourceUrl} key={project.slug} target={project.sourceUrl === "#" ? undefined : "_blank"} rel={project.sourceUrl === "#" ? undefined : "noreferrer"} onClick={project.sourceUrl === "#" ? event => event.preventDefault() : undefined} aria-disabled={project.sourceUrl === "#" || undefined} className="archive-row" aria-label={"View " + project.title + " project on GitHub"}>
                        <span className="archive-number">{String(index + cardProjects.length + 1).padStart(2, "0")}</span>
                        <div><h4>{project.title}</h4><p>{project.description}</p></div>
                        <span className="archive-tech">{project.tech.map(tech => <ArchiveTech key={tech} tech={tech} />)}</span>
                        <ArrowRight size={24} aria-hidden="true" />
                    </Reveal>
                ))}</div>
                {(archive.length > initialArchiveCount || mobileApps.length > 0) && <div className="archive-more"><button type="button" className="design-button archive-more-button" aria-expanded={showAllProjects} aria-controls="project-archive mobile-apps" onClick={() => setShowAllProjects(value => !value)}>{showAllProjects ? "View less" : "View more"}<FiChevronDown size={18} className={showAllProjects ? "is-expanded" : ""} aria-hidden="true" /></button></div>}
                <section id="mobile-apps" className="mobile-apps-showcase" aria-labelledby="mobile-apps-heading" hidden={!showAllProjects}>
                    <Reveal className="mobile-apps-heading">
                        <p className="design-eyebrow"><FiSmartphone size={16} aria-hidden="true" />ON THE GO</p>
                        <h3 id="mobile-apps-heading">Mobile Apps</h3>
                    </Reveal>
                    <div className="mobile-apps-grid">{mobileApps.map((app, index) => <MobileAppCard key={app.slug} app={app} index={index} />)}</div>
                </section>
            </div>
        </section>
    );
}
