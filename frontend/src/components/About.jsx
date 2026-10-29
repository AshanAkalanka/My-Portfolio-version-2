import { FiCpu as Brain, FiCode as Code2, FiLayers as Layers } from "react-icons/fi";
import { FiArrowRight as ArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";

const interests = [
    { Icon: Brain, title: "Intelligence with purpose", text: "Exploring AI and machine learning to solve practical, everyday problems." },
    { Icon: Code2, title: "Thoughtful engineering", text: "Writing clear, maintainable code with a focus on the people who use it." },
    { Icon: Layers, title: "The complete picture", text: "Connecting interfaces, APIs, and data to build cohesive experiences." },
];

export default function About({ id = "about" }) {
    return (
        <section id={id || undefined} className="design-section about-section about-editorial" aria-labelledby="about-heading">
            <span className="about-watermark" aria-hidden="true">ABOUT</span>
            <div className="design-container about-layout">
                <div className="about-introduction">
                    <Reveal className="about-heading-group">
                        <h2 id="about-heading">About <span>me</span></h2>
                        <p className="about-tagline">A curious mind, a builder at heart</p>
                    </Reveal>
                    <Reveal className="about-copy" delay={0.08}>
                        <p>I'm Ashan, a third-year <strong>Artificial Intelligence undergraduate at SLIIT</strong> with a love for building things that make a difference.</p>
                        <p>My work sits at the intersection of software development, thoughtful interfaces, and intelligent systems. I enjoy understanding how things work, breaking down complex problems, and turning ideas into useful applications.</p>
                        <p>There's always something new to learn. Right now, I'm sharpening my skills in full-stack development and exploring what AI can bring to the experiences we use every day.</p>
                    </Reveal>
                    <a className="design-text-link about-contact-link" href="#contact">Let's build something together <ArrowRight size={22} aria-hidden="true" /></a>
                </div>
                <div className="about-highlights">{interests.map(({ Icon, title, text }, index) => (
                    <Reveal as="article" key={title} className="about-highlight" delay={index * 0.08}>
                        <span className="about-highlight-icon"><Icon size={32} aria-hidden="true" /></span>
                        <span className="about-highlight-number" aria-hidden="true">0{index + 1}</span>
                        <h3>{title}</h3>
                        <p>{text}</p>
                    </Reveal>
                ))}</div>
            </div>
        </section>
    );
}
