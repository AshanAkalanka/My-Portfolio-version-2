import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 600);

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth";

        window.scrollTo({ top: 0, behavior });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    aria-label="Scroll back to top"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 12, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.92 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.22 }}
                    className="scroll-to-top fixed right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/75 text-gray-800 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1f36]/85 dark:text-[#38BDF8] md:right-7"
                >
                    <ArrowUp className="h-5 w-5" aria-hidden="true" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export default ScrollToTop;
