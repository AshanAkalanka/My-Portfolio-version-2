import { motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ROLE TYPEWRITER */
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

function CountUpNumber({ value, suffix = "", delay = 0, className = "" }) {
    const numberRef = useRef(null);
    const isInView = useInView(numberRef, { once: true, amount: 0.6 });
    const prefersReducedMotion = useReducedMotion();
    
    const springValue = useSpring(0, {
        stiffness: 40,
        damping: 15,
        mass: 1,
    });
    
    const displayValue = useTransform(springValue, (current) => Math.round(current));
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isInView) {
            if (prefersReducedMotion) {
                springValue.set(value);
                setIsComplete(true);
            } else {
                const timer = setTimeout(() => {
                    springValue.set(value);
                }, delay);
                return () => clearTimeout(timer);
            }
        }
    }, [isInView, value, delay, prefersReducedMotion, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (latest >= value && !isComplete) {
                setIsComplete(true);
            }
        });
    }, [springValue, value, isComplete]);

    return (
        <motion.span
            ref={numberRef}
            aria-label={`${value}${suffix}`}
            className={`inline-block tabular-nums ${className}`}
            animate={
                isComplete && !prefersReducedMotion
                    ? { scale: [1, 1.1, 1] }
                    : { scale: 1 }
            }
            transition={{ duration: 0.32, ease: "easeOut" }}
        >
            <motion.span
                className="inline-block"
                initial={prefersReducedMotion ? false : { opacity: 0.35, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.14, ease: "easeOut", delay: delay / 1000 }}
            >
                <motion.span>{displayValue}</motion.span>
                {suffix}
            </motion.span>
        </motion.span>
    );
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
            const timer = setTimeout(() => setCharIndex((c) => c + 1), 26);
            return () => clearTimeout(timer);
        }

        const timer = setTimeout(() => {

            setShown((prev) => [...prev, current]);
            setLineIndex((i) => i + 1);
            setCharIndex(0);
        }, 380);

        return () => clearTimeout(timer);
    }, [charIndex, lineIndex, lines]);

    const current = lines[lineIndex];
    const typedText = current ? current.text.slice(0, charIndex) : "";
    const promptColor = isDark ? "text-[#38BDF8]" : "text-primary";

    const renderHighlightedText = (text) => {
        if (text.startsWith("current_status")) {
            const statusPart = text.slice(0, 14);
            const studentPart = text.slice(14);
            return (
                <>
                    <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>{statusPart}</span>
                    <span className={isDark ? "text-amber-300" : "text-amber-600"}>{studentPart}</span>
                </>
            );
        }
        return text;
    };

    return (
        <div
            aria-hidden="true"
            className={`w-full max-w-sm md:max-w-md rounded-lg border overflow-hidden backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 ${
                isDark
                    ? "bg-black/40 border-white/10 shadow-2xl"
                    : "bg-white/95 border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.14)]"
            }`}
        >
            <div
                className={`flex items-center gap-1.5 px-3 py-2.5 border-b md:px-4 md:py-3 ${
                    isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50/80"
                }`}
            >
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]/80" />

                <span
                    className={`ml-3 font-mono text-[11px] tracking-wide ${
                        isDark ? "text-white/40" : "text-gray-500"
                    }`}
                >
                    ashan@portfolio - cmd
                </span>
            </div>

            <div
                className={`min-h-[138px] px-4 py-3 font-mono text-[12px] leading-relaxed md:min-h-[160px] md:px-5 md:py-4 md:text-[13px] ${
                    isDark ? "text-white/85" : "text-[#172033]"
                }`}
            >
                {shown.map((line, index) => (
                    <div key={index} className="flex gap-2">
                        <span className={promptColor}>{line.prompt}</span>
                        <span>{renderHighlightedText(line.text)}</span>
                    </div>
                ))}

                {!done && current && (
                    <div className="flex gap-2">
                        <span className={promptColor}>{current.prompt}</span>
                        <span>
                            {renderHighlightedText(typedText)}
                            <span className="animate-[hardBlink_1s_step-end_infinite] font-black text-[14px]">|</span>
                        </span>
                    </div>
                )}

                {done && (
                    <div className="flex gap-2">
                        <span className={promptColor}>$</span>
                        <span className="animate-[hardBlink_1s_step-end_infinite] font-black text-[14px]">|</span>
                    </div>
                )}
            </div>
        </div>
    );
}

const NETWORK_NODES = [
    { id: 0, x: 880, y: 120, r: 3 }, { id: 1, x: 960, y: 170, r: 2.5 },
    { id: 2, x: 1045, y: 140, r: 2 }, { id: 3, x: 1125, y: 210, r: 3 },
    { id: 4, x: 1185, y: 300, r: 2.5 }, { id: 5, x: 1090, y: 330, r: 2 },
    { id: 6, x: 1005, y: 290, r: 3 }, { id: 7, x: 925, y: 250, r: 2 },
    { id: 8, x: 855, y: 330, r: 2.5 }, { id: 9, x: 935, y: 410, r: 3 },
    { id: 10, x: 1015, y: 450, r: 2 }, { id: 11, x: 1095, y: 490, r: 2.5 },
    { id: 12, x: 955, y: 555, r: 3 }, { id: 13, x: 875, y: 515, r: 2 },
    { id: 14, x: 795, y: 455, r: 2.5 }, { id: 15, x: 735, y: 395, r: 2 },
    { id: 16, x: 695, y: 335, r: 3 }, { id: 17, x: 655, y: 275, r: 2 },
    { id: 18, x: 615, y: 215, r: 2.5 }, { id: 19, x: 755, y: 600, r: 2 },
    { id: 20, x: 835, y: 640, r: 3 }, { id: 21, x: 695, y: 655, r: 2 },
    { id: 22, x: 595, y: 600, r: 2.5 },
];

const NETWORK_EDGES = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
    [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16],
    [16, 17], [17, 18], [1, 7], [6, 9], [7, 16], [9, 13], [10, 12],
    [14, 19], [13, 20], [15, 17], [19, 20], [20, 21], [21, 22], [12, 20],
];

const PULSE_NODE_IDS = [3, 9, 13, 17, 21];

function HeroArt({ isDark }) {
    const tint = isDark ? "#38BDF8" : "#0EA5E9";
    const nodeById = Object.fromEntries(NETWORK_NODES.map((node) => [node.id, node]));

    const bgGradient = isDark
        ? "radial-gradient(circle at 75% 20%, #10243e 0%, #081527 45%, #04070d 100%)"
        : "radial-gradient(circle at 75% 20%, #f8fafc 0%, #f1f5f9 45%, #e2e8f0 100%)";

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div
                className="absolute inset-0"
                style={{
                    background: bgGradient,
                }}
            />

            <div
                className="absolute inset-x-0 top-0 h-72 md:h-96"
                style={{
                    background: `radial-gradient(ellipse 60% 100% at 70% 0%, ${tint}33, transparent 70%)`,
                }}
            />

            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
            >
                <defs>
                    <radialGradient id="heroArtBlend" cx="70%" cy="28%" r="52%">
                        <stop offset="0%" stopColor={tint} stopOpacity="0.5" />
                        <stop offset="45%" stopColor={tint} stopOpacity="0.24" />
                        <stop offset="100%" stopColor={tint} stopOpacity="0" />
                    </radialGradient>

                    <filter id="heroArtBlur" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="42" />
                    </filter>

                    <pattern id="heroArtDots" width="34" height="34" patternUnits="userSpaceOnUse">
                        <circle cx="1.2" cy="1.2" r="1.2" fill={tint} fillOpacity="0.35" />
                    </pattern>
                </defs>

                <rect x="0" y="0" width="1440" height="900" fill="url(#heroArtDots)" opacity="0.12" />

                <path
                    d="M1200,50 C1310,100 1340,230 1260,310 C1390,350 1380,470 1280,530
                       C1360,570 1340,670 1240,700 C1110,750 980,670 920,570
                       C840,510 860,430 800,370 C720,310 760,210 860,170
                       C940,100 1100,30 1200,50 Z"
                    fill="url(#heroArtBlend)"
                    filter="url(#heroArtBlur)"
                />

                <g stroke={tint} strokeOpacity="0.35" strokeWidth="1.5" fill="none">
                    <path d="M800,370 L726,370 L726,424 L652,424" />
                    <path d="M826,430 L826,488 L752,488 L752,546" />
                    <path d="M860,470 L918,470 L918,522" />
                    <path d="M766,314 L700,314 L700,256" />
                </g>

                <g stroke={tint} strokeOpacity="0.22" strokeWidth="1">
                    {NETWORK_EDGES.map(([start, end], index) => {
                        const startNode = nodeById[start];
                        const endNode = nodeById[end];

                        return (
                            <line
                                key={index}
                                x1={startNode.x}
                                y1={startNode.y}
                                x2={endNode.x}
                                y2={endNode.y}
                            />
                        );
                    })}
                </g>

                <g fill={tint} fillOpacity="0.55">
                    {NETWORK_NODES.map((node) => (
                        <circle key={node.id} cx={node.x} cy={node.y} r={node.r} />
                    ))}
                </g>

                {PULSE_NODE_IDS.map((id, index) => {
                    const node = nodeById[id];

                    return (
                        <motion.circle
                            key={id}
                            cx={node.x}
                            cy={node.y}
                            r={node.r + 3}
                            fill={tint}
                            animate={{ opacity: [0.1, 0.85, 0.1] }}
                            transition={{
                                duration: 2.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.6,
                            }}
                        />
                    );
                })}
            </svg>

            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? "radial-gradient(ellipse 800px 600px at 15% 55%, rgba(4,8,16,0.6), transparent 70%)"
                        : "radial-gradient(ellipse 800px 600px at 15% 55%, rgba(255,255,255,0.6), transparent 70%)",
                }}
            />
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

    const stats = [
        { value: 10, suffix: "+", label: "Projects Completed" },
        { value: 2, suffix: "+", label: "Years Experience" },
        { value: 5, suffix: "+", label: "Tech Stacks" },
    ];

    return (
        <section
            id="home"
            className="min-h-[100svh] flex items-center justify-center px-4 pb-8 pt-12 md:px-16 md:py-28 bg-cover bg-center transition-colors duration-300 relative overflow-hidden"
        >
            <style>{`
                @keyframes hardBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-hard-blink {
                    animation: hardBlink 1s step-end infinite;
                }
            `}</style>
            
            <HeroArt isDark={isDark} />

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center">
                <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12 lg:gap-16">
                    <div className="flex flex-col items-center text-center md:max-w-xl md:items-start md:text-left">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={`font-semibold text-lg mb-2 ${
                                isDark ? "text-white/80" : "text-[#172033]"
                            }`}
                        >
                            Hi, I'm
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className={`text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-none mb-4 ${
                                isDark ? "text-white" : "text-[#172033]"
                            }`}
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                            Ashan
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className={`relative mb-4 w-fit pb-2 font-mono text-lg md:mb-6 md:text-xl ${
                                isDark ? "text-[#38BDF8]" : "text-emerald-600"
                            }`}
                        >
                            <RoleTypewriter
                                words={[
                                    "AI Undergraduate",
                                    "ML Enthusiast",
                                    "Software Developer",
                                ]}
                            />
                            <span className="border-r-2 ml-0.5 animate-hard-blink border-current" />
                            <span
                                aria-hidden="true"
                                className={`absolute bottom-0 left-0 h-0.5 w-10 rounded-full ${
                                    isDark ? "bg-[#38BDF8]/70" : "bg-emerald-500/80"
                                }`}
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`mb-7 max-w-lg text-base leading-relaxed md:mb-8 md:text-lg ${
                                isDark ? "text-white/85" : "text-[#334155]"
                            }`}
                        >
                            I'm passionate about building smart solutions using data and algorithms.
                            I enjoy working on AI and software projects, learning new tools, and
                            turning ideas into meaningful digital experiences.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4"
                        >
                            <a
                                href="#projects"
                                className={`group inline-flex w-auto min-w-[10.5rem] items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold transition duration-300 active:scale-[0.98] sm:gap-2 sm:px-6 sm:py-3 sm:text-base ${
                                    isDark
                                        ? "bg-[#38BDF8] text-[#081a2f] hover:bg-[#0EA5E9]"
                                        : "bg-[#1e3a8a] text-white shadow-lg shadow-blue-950/20 hover:-translate-y-0.5 hover:bg-[#172554] hover:shadow-xl hover:shadow-blue-950/25"
                                }`}
                            >
                                View Projects
                                <ArrowRight
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                                    aria-hidden="true"
                                />
                            </a>
                        </motion.div>
                    </div>

                    {/* TERMINAL ON MOBILE TOO */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                        className="w-full flex justify-center md:justify-end mt-6 md:mt-0 scale-95 sm:scale-100 origin-top"
                    >
                        <TerminalBoot lines={bootLines} isDark={isDark} />
                    </motion.div>
                </div>

                {/* STATS ROW */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className={`grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 w-full mt-6 pt-4 border-t md:mt-12 md:pt-7 ${
                        isDark ? "border-white/10" : "border-slate-900/10"
                    }`}
                >
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="flex flex-col items-center text-center">
                            <CountUpNumber
                                value={stat.value}
                                suffix={stat.suffix}
                                delay={1050 + index * 220}
                                className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 md:mb-2 ${
                                    isDark ? "text-white" : "text-[#172033]"
                                }`}
                            />

                            <span
                                className={`text-xs sm:text-sm md:text-base font-medium leading-tight ${
                                    isDark ? "text-white/80" : "text-[#334155]"
                                }`}
                            >
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
            
            {/* SCROLL INDICATOR */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-20"
                onClick={() => {
                    const nextSection = document.getElementById('projects');
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                    }
                }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className={`w-6 h-6 ${isDark ? "text-white/50" : "text-slate-400"}`} />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;
