import { motion, useScroll } from "framer-motion";

function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            aria-hidden="true"
            className="scroll-progress fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left"
            style={{ scaleX: scrollYProgress }}
        />
    );
}

export default ScrollProgress;
