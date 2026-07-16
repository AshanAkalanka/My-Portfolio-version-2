import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight } from "lucide-react";
import heroBg from "../images/hero.png";
import heroDarkBg from "../images/hero-dark.jpg";

/* ROLE TYPEWRITER - cycles through roles under the fixed name */
function RoleTypewriter({ words, speed = 90, delay = 1500 }) {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

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

    return <span>{text}</span>;
}

/* TERMINAL */
function TerminalBoot({ lines, isDark }) {
    const [shown, setShown] = useState([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (lineIndex >= lines.length) {
            setDone(true);
            return;
        }
        const current = lines[lineIndex];
        if (charIndex <= current.text.length) {
            const t = setTimeout(() => setCharIndex((c) => c + 1), 26);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setShown((prev) => [...prev, current]);
            setLineIndex((i) => i + 1);
            setCharIndex(0);
        }, 380);
        return () => clearTimeout(t);
    }, [charIndex, lineIndex, lines]);

    const current = lines[lineIndex];
    const typedText = current ? current.text.slice(0, charIndex) : "";
    const promptColor = isDark ? "text-[#38BDF8]" : "text-primary";

    return (
        <div
            className={`w-full max-w-sm md:max-w-md rounded-lg border shadow-2xl overflow-hidden backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 ${
                isDark ? "bg-black/40 border-white/10" : "bg-white/90 border-white/40"
            }`}
        >
            {/* title bar */}
            <div
                className={`flex items-center gap-1.5 px-3 py-2.5 border-b md:px-4 md:py-3 ${
                    isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
                }`}
            >
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]/80" />
                <span
                    className={`ml-3 font-mono text-[11px] tracking-wide ${
                        isDark ? "text-white/40" : "text-gray-400"
                    }`}
                >
                    ashan@portfolio - cmd
                </span>
            </div>

            {/* body */}
            <div className={`min-h-[138px] px-4 py-3 font-mono text-[12px] leading-relaxed md:min-h-[160px] md:px-5 md:py-4 md:text-[13px] ${isDark ? "text-white/85" : "text-gray-800"}`}>
                {shown.map((l, i) => (
                    <div key={i} className="flex gap-2">
                        <span className={promptColor}>{l.prompt}</span>
                        <span>{l.text}</span>
                    </div>
                ))}
                {!done && current && (
                    <div className="flex gap-2">
                        <span className={promptColor}>{current.prompt}</span>
                        <span>
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </div>
                )}
                {done && (
                    <div className="flex gap-2">
                        <span className={promptColor}>$</span>
                        <span className="animate-pulse">|</span>
                    </div>
                )}
            </div>
        </div>
    );
}

/* HERO */
function Hero() {
    const { isDark } = useTheme();

    const bootLines = [
        { prompt: "$", text: "Hi !" },
        { prompt: ">", text: "I'm Ashan" },
        { prompt: "$", text: "AI undergraduate" },
        { prompt: ">", text: "Web development, SE, AI" },
        { prompt: "$", text: "current_status --Student" },
        { prompt: ">", text: "open to new opportunities" },
    ];

    return (
        <section
            id="home"
            className="min-h-screen min-h-[100svh] md:min-h-screen flex items-center justify-center px-4 pb-14 pt-24 md:px-16 md:py-28 bg-cover bg-center md:bg-fixed mobile-bg-scroll transition-colors duration-300 relative overflow-hidden"
            style={{ backgroundImage: `url(${isDark ? heroDarkBg : heroBg})` }}
        >
            {isDark ? (
                <>
                    <div className="absolute inset-0 z-0 bg-[#081a2f]/60 pointer-events-none"></div>
                    <div className="hero-glow absolute inset-x-0 top-0 h-64 pointer-events-none"></div>
                </>
            ) : (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
            )}

            <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-20 lg:gap-24 items-center">
                {/* LEFT - identity */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-white/80 font-semibold text-lg mb-2"
                    >
                        Hi, I'm
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-4"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                        Ashan
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`mb-4 font-mono text-lg md:mb-6 md:text-xl ${isDark ? "text-[#38BDF8]" : "text-[#00eb66]"}`}
                    >
                        <RoleTypewriter
                            words={["AI Undergraduate", "ML Enthusiast", "Software Developer"]}
                        />
                        <span className="border-r-2 ml-0.5 animate-pulse border-current" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mb-7 max-w-lg text-base leading-relaxed text-white/85 md:mb-10 md:text-lg"
                    >
                        I'm passionate about building smart solutions using data and algorithms.
                        I enjoy working on AI and software projects, learning new tools, and
                        turning ideas into meaningful digital experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex w-auto flex-col gap-3 justify-center min-[380px]:flex-row md:justify-start sm:max-w-none sm:gap-4"
                    >
                        <a
                            href="#projects"
                            className={`group flex w-fit items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold transition duration-300 active:scale-[0.98] sm:w-auto sm:min-w-[200px] sm:gap-2 sm:px-6 sm:py-3 sm:text-base ${
                                isDark
                                    ? "bg-[#38BDF8] text-[#081a2f] hover:bg-[#0EA5E9]"
                                    : "bg-primary text-white hover:bg-primary"
                            }`}
                        >
                            View Projects
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" aria-hidden="true" />
                        </a>
                    </motion.div>
                </div>

                {/* RIGHT - signature terminal panel */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    className="mt-2 flex justify-center md:mt-0 md:justify-end md:pl-4"
                >
                    <TerminalBoot lines={bootLines} isDark={isDark} />
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
