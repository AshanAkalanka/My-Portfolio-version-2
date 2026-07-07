import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight, Download } from "lucide-react";
import heroBg from "../images/i.png";

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
        <span className={`border-r-4 pr-2 animate-pulse ${isDark ? "border-[#D4C990]" : "border-white"}`}>
            {text}
        </span>
    );
}

/* HERO */
function Hero() {
    const { isDark } = useTheme();

    return (
        <section
            id="home"
            className={`
        min-h-screen flex items-center justify-center px-4 md:px-16
        bg-cover bg-center bg-fixed
        transition-colors duration-300 relative overflow-hidden
      `}
            style={isDark ? undefined : { backgroundImage: `url(${heroBg})` }}
        >
            {isDark ? (
                <>
                    <div className="hero-dark-bg absolute inset-0 pointer-events-none"></div>
                    <div className="hero-stars hero-stars-near absolute inset-0 pointer-events-none"></div>
                    <div className="hero-stars hero-stars-far absolute inset-0 pointer-events-none"></div>
                    <div className="hero-glow absolute inset-x-0 top-0 h-64 pointer-events-none"></div>
                </>
            ) : (
                <div className="absolute inset-0 z-0 bg-black/45" />
            )}

            <div className="flex flex-col items-center text-center w-full relative z-10 max-w-5xl">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white font-semibold text-lg mb-3"
                >
                    Hi, I am
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-white text-5xl md:text-6xl font-extrabold uppercase tracking-widest leading-tight mb-8 transition-colors duration-300"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    <Typewriter words={["Ashan", "Ashan", "Ashan"]} />
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-white max-w-4xl text-lg leading-relaxed w-full transition-colors duration-300 mb-10 px-4"
                >
                    I am an Artificial Intelligence undergraduate passionate about building smart solutions
                    using data and algorithms. I enjoy working on AI and software projects, learning new
                    tools, and transforming ideas into meaningful digital experiences.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex w-full max-w-md flex-row gap-3 justify-center sm:max-w-none sm:gap-4"
                >
                    <a
                        href="#projects"
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded px-3 py-2.5 text-sm font-bold transition sm:w-auto sm:min-w-[220px] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-base ${
                            isDark
                                ? "bg-[#D4C990] text-gray-950 hover:bg-[#c2b680]"
                                : "bg-primary text-white hover:bg-primary"
                        }`}
                    >
                        View Projects
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>

                    <a
                        href="/resume.pdf"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded border border-white/80 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-gray-950 sm:w-auto sm:min-w-[220px] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
                    >
                        Download Resume
                        <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;

