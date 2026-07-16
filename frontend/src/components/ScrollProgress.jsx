import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const prefersReducedMotion = useReducedMotion();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 28,
        mass: 0.22,
    });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.45)] dark:bg-[#38BDF8] dark:shadow-[0_0_8px_rgba(56,189,248,0.5)]"
            style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
        />
    );
}

export default ScrollProgress;
