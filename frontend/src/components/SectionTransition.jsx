import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";

export default function SectionTransition({ id, title, caption, children }) {
    const introRef = useRef(null);
    const contentRef = useRef(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: introRef, offset: ["start start", "end end"] });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);

    useEffect(() => {
        if (reducedMotion) return;
        let timer;
        let advanced = false;
        const cancel = () => window.clearTimeout(timer);
        const observer = new IntersectionObserver(([entry]) => {
            cancel();
            if (!entry.isIntersecting || advanced) return;
            timer = window.setTimeout(() => {
                const top = introRef.current?.getBoundingClientRect().top;
                if (document.hidden || top == null || Math.abs(top) > 90) return;
                advanced = true;
                contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 1600);
        }, { threshold: 0.9 });
        // Observe the viewport-sized title, rather than its double-height sticky track.
        observer.observe(introRef.current.firstElementChild);
        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("touchstart", cancel, { passive: true });
        window.addEventListener("keydown", cancel);
        document.addEventListener("visibilitychange", cancel);
        return () => {
            cancel();
            observer.disconnect();
            window.removeEventListener("wheel", cancel);
            window.removeEventListener("touchstart", cancel);
            window.removeEventListener("keydown", cancel);
            document.removeEventListener("visibilitychange", cancel);
        };
    }, [reducedMotion]);

    return (
        <section id={id} className="section-stack" aria-label={title}>
            <div ref={introRef} className="section-stack-track" aria-hidden="true">
                <div className="section-stack-intro">
                    <motion.div className="section-stack-title" style={reducedMotion ? undefined : { scale, opacity }}>
                        <p className="section-stack-name">{title}</p>
                        <p className="section-stack-caption">{caption}</p>
                        <FiArrowDown size={32} strokeWidth={2} />
                    </motion.div>
                </div>
            </div>
            <div ref={contentRef} className="section-stack-content">{children}</div>
        </section>
    );
}
