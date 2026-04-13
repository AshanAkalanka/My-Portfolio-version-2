import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight, Download } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

/* TYPEWRITER */
function Typewriter({ words, speed = 120, delay = 1600 }) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        const current = words[index];
        let timer;

        if (!deleting && text.length < current.length) {
            timer = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
        } else if (deleting && text.length > 0) {
            timer = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
        } else if (!deleting && text.length === current.length) {
            timer = setTimeout(() => setDeleting(true), delay);
        } else if (deleting && text.length === 0) {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [text, deleting, index, words, speed, delay]);

    return (
        <span className={`border-r-4 pr-2 animate-pulse ${isDark ? "border-[#5AA9FF]" : "border-black"}`}>
            {text}
        </span>
    );
}

/* HERO */
function Hero() {
    const { isDark } = useTheme();

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <section
            id="home"
            className={`
        min-h-screen flex items-center justify-center px-4 md:px-16
        bg-cover bg-center bg-fixed
        transition-colors duration-300 relative
      `}
            style={isDark ? undefined : { backgroundColor: '#f9f9f9' }}
        >
            {isDark ? (
                <>
                    <div className="hero-dark-bg absolute inset-0 pointer-events-none"></div>
                    <div className="hero-stars hero-stars-near absolute inset-0 pointer-events-none"></div>
                    <div className="hero-stars hero-stars-far absolute inset-0 pointer-events-none"></div>
                    <div className="hero-glow absolute inset-x-0 top-0 h-64 pointer-events-none"></div>
                </>
            ) : (
                <div className="absolute inset-0 z-0">
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        className="w-full h-full"
                        options={{
                            fullScreen: { enable: false, zIndex: 0 },
                            fpsLimit: 120,
                            interactivity: {
                                events: {
                                    onHover: {
                                        enable: true,
                                        mode: "repulse",
                                    },
                                    resize: true,
                                },
                                modes: {
                                    repulse: {
                                        distance: 80,
                                        duration: 0.4,
                                    },
                                },
                            },
                            particles: {
                                color: {
                                    value: "#2563eb", // Tailwind blue-600
                                },
                                links: {
                                    color: "#9ca3af", // Tailwind gray-400
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.4,
                                    width: 1,
                                },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: {
                                        default: "bounce",
                                    },
                                    random: false,
                                    speed: 1,
                                    straight: false,
                                },
                                number: {
                                    density: {
                                        enable: true,
                                        area: 800,
                                    },
                                    value: 60,
                                },
                                opacity: {
                                    value: 0.4,
                                },
                                shape: {
                                    type: "circle",
                                },
                                size: {
                                    value: { min: 1, max: 3 },
                                },
                            },
                            detectRetina: true,
                        }}
                    />
                </div>
            )}

            <div className="flex flex-col items-center text-center w-full relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-blue-600 dark:text-[#5AA9FF] font-semibold text-lg mb-3"
                >
                    Hi, I am
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-6xl font-extrabold text-black dark:text-white leading-tight mb-8 transition-colors duration-300"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    <Typewriter words={["Ashan", "AI Student", "Web Developer"]} />
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed w-full max-w-none transition-colors duration-300 mb-10 px-4 md:px-20"
                >
                    I am an Artificial Intelligence undergraduate passionate about building smart solutions
                    using data and algorithms. I enjoy working on AI and software projects, learning new
                    tools, and transforming ideas into meaningful digital experiences.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <a
                        href="#projects"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                    >
                        View Projects
                        <ArrowRight size={20} />
                    </a>

                    <a
                        href="/resume.pdf"
                        className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        Download Resume
                        <Download size={20} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;

