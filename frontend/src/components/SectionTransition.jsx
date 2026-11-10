import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";

function AnimatedCounter({ value, suffix = "", duration = 1.4, reducedMotion = false }) {
    const [count, setCount] = useState(reducedMotion ? value : 0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "-40px" });

    useEffect(() => {
        if (reducedMotion) {
            setCount(value);
            return;
        }

        if (!inView) {
            setCount(0);
            return;
        }

        let startTimestamp = null;
        let frameId;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = (timestamp - startTimestamp) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic: smooth deceleration towards target
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(easeOut * value);
            setCount(current);

            if (progress < 1) {
                frameId = requestAnimationFrame(step);
            } else {
                setCount(value);
            }
        };

        frameId = requestAnimationFrame(step);

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [inView, value, duration, reducedMotion]);

    return (
        <span ref={ref} className="section-stack-counter-num">
            {count}{suffix}
        </span>
    );
}

export default function SectionTransition({ id, title, caption, children, hideTitleOnDesktop = false, hideTitleOnMobile = false }) {
    const introRef = useRef(null);
    const contentRef = useRef(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: introRef, offset: ["start start", "end end"] });

    // Original before page animation style
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);

    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === "undefined") return true;
        return window.matchMedia("(min-width: 768px)").matches;
    });

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const handler = (e) => setIsDesktop(e.matches);
        if (mq.addEventListener) {
            mq.addEventListener("change", handler);
        } else {
            mq.addListener(handler);
        }
        return () => {
            if (mq.removeEventListener) {
                mq.removeEventListener("change", handler);
            } else {
                mq.removeListener(handler);
            }
        };
    }, []);

    const scrollToContent = () => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        if (reducedMotion) return;

        const mediaQuery = window.matchMedia("(min-width: 768px)");
        let timer;
        let advanced = false;
        let observer = null;

        const cancel = () => window.clearTimeout(timer);

        const setupObserver = () => {
            cancel();
            if (observer) {
                observer.disconnect();
                observer = null;
            }

            const isDesktopView = mediaQuery.matches;
            if ((hideTitleOnDesktop && isDesktopView) || (hideTitleOnMobile && !isDesktopView)) {
                return;
            }

            observer = new IntersectionObserver(([entry]) => {
                cancel();
                if (!entry.isIntersecting || advanced) return;
                timer = window.setTimeout(() => {
                    const top = introRef.current?.getBoundingClientRect().top;
                    if (document.hidden || top == null || Math.abs(top) > 90) return;
                    advanced = true;
                    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 1600);
            }, { threshold: 0.9 });

            if (introRef.current?.firstElementChild) {
                observer.observe(introRef.current.firstElementChild);
            }
        };

        setupObserver();

        const handleMediaChange = () => {
            setupObserver();
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleMediaChange);
        } else {
            mediaQuery.addListener(handleMediaChange);
        }

        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("touchstart", cancel, { passive: true });
        window.addEventListener("keydown", cancel);
        document.addEventListener("visibilitychange", cancel);

        return () => {
            cancel();
            if (observer) {
                observer.disconnect();
            }
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleMediaChange);
            } else {
                mediaQuery.removeListener(handleMediaChange);
            }
            window.removeEventListener("wheel", cancel);
            window.removeEventListener("touchstart", cancel);
            window.removeEventListener("keydown", cancel);
            document.removeEventListener("visibilitychange", cancel);
        };
    }, [reducedMotion, hideTitleOnDesktop, hideTitleOnMobile]);

    const sectionClasses = [
        "section-stack",
        hideTitleOnDesktop ? "section-stack--no-desktop-title" : "",
        hideTitleOnMobile ? "section-stack--no-mobile-title" : "",
    ].filter(Boolean).join(" ");

    const showRichTitle = isDesktop || id === "projects";

    return (
        <section
            id={id}
            className={sectionClasses}
            aria-label={title}
        >
            <div ref={introRef} className="section-stack-track" aria-hidden="true">
                <div className="section-stack-intro">
                    {/* Ambient Stage Glow */}
                    {showRichTitle && <div className="section-stack-glow" aria-hidden="true" />}

                    {/* Original Before Page Animation Style */}
                    <motion.div
                        className="section-stack-title"
                        style={reducedMotion ? undefined : { scale, opacity }}
                    >
                        {showRichTitle ? (
                            <>
                                <h2 className="section-stack-name">{title}</h2>
                                <p className="section-stack-caption">{caption}</p>

                                {/* Animated Stats Counters: Projects 10+, Skills 5+, Experience 2+ */}
                                <div className="section-stack-stats">
                                    <div className="section-stack-stat">
                                        <AnimatedCounter value={10} suffix="+" reducedMotion={reducedMotion} />
                                        <span className="section-stack-stat-label">Projects</span>
                                    </div>
                                    <span className="section-stack-stat-divider" aria-hidden="true" />
                                    <div className="section-stack-stat">
                                        <AnimatedCounter value={5} suffix="+" reducedMotion={reducedMotion} />
                                        <span className="section-stack-stat-label">Skills</span>
                                    </div>
                                    <span className="section-stack-stat-divider" aria-hidden="true" />
                                    <div className="section-stack-stat">
                                        <AnimatedCounter value={2} suffix="+" reducedMotion={reducedMotion} />
                                        <span className="section-stack-stat-label">Years Experience</span>
                                    </div>
                                </div>

                                {/* Interactive Scroll Indicator */}
                                <button
                                    type="button"
                                    className="section-stack-scroll-pill"
                                    onClick={scrollToContent}
                                    aria-label={`Scroll down to ${title}`}
                                >
                                    <span className="section-stack-mouse" aria-hidden="true">
                                        <span className="section-stack-mouse-wheel" />
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="section-stack-name">{title}</p>
                                <p className="section-stack-caption">{caption}</p>
                                <FiArrowDown size={32} strokeWidth={2} />
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
            <div ref={contentRef} className="section-stack-content">{children}</div>
        </section>
    );
}
