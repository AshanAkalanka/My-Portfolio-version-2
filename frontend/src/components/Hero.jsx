import { useRef } from "react";
import { motion } from "framer-motion";
import { FiDownload as Download, FiGithub as Github, FiLinkedin as Linkedin, FiCode as Code2 } from "react-icons/fi";
import { FiArrowDown as ArrowDown, FiArrowRight as ArrowRight } from "react-icons/fi";
import useAmbientMotion from "../hooks/useAmbientMotion";
import portrait from "../images/photo.webp";
import ProgressiveImage from "./ProgressiveImage";
import HeroStars from "./HeroStars";

export default function Hero() {
    const heroRef = useRef(null);
    const animateBorder = useAmbientMotion(heroRef);
    return (
        <section ref={heroRef} id="home" className="hero-section" data-animate={animateBorder}>
            <HeroStars />
            <div className="design-container hero-layout">
                <motion.div className="hero-copy" initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="hero-greeting"><span className="status-dot" /> Hi, I'm Ashan Akalanka</p>
                    <h1>Building ideas<br /><span>Creating impact</span></h1>
                    <p className="hero-description">AI undergraduate. Software developer. Curious by nature. I turn complex problems into thoughtful, useful digital experiences.</p>
                    <div className="hero-actions">
                        <motion.a whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="design-button button-cyan" href="#projects">Explore my work <ArrowRight size={22} aria-hidden="true" /></motion.a>
                        <motion.a whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="design-button button-hero-outline" href="/resume.pdf" download>Download CV <Download size={16} aria-hidden="true" /></motion.a>
                    </div>
                    <div className="hero-socials">
                        <span>Find me on</span>
                        <a href="https://github.com/AshanAkalanka" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /> GitHub</a>
                        <a href="https://www.linkedin.com/in/ashanakalanka" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /> LinkedIn</a>
                    </div>
                </motion.div>
                <div className="hero-visual">
                    <div className="portrait-caption"><Code2 size={17} aria-hidden="true" /><span>Always learning · Always building</span></div>
                    <div className="hero-portrait-frame" data-animate={animateBorder}>
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
            </div>
        </section>
    );
}
