import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp as ArrowUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            let observer;
            const scrollToTarget = () => {
                const element = document.getElementById(location.hash.slice(1));
                if (!element) return false;
                element.scrollIntoView({ behavior: location.state?.scrollBehavior || "auto" });
                observer?.disconnect();
                return true;
            };
            if (scrollToTarget()) return;

            // Hash targets may not exist until the lower-page bundle finishes.
            observer = new MutationObserver(scrollToTarget);
            observer.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
            return () => observer.disconnect();
        }

        window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname, location.hash, location.key, location.state]);

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
                    className="scroll-to-top fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border-0 bg-white text-slate-800 shadow-[0_6px_20px_rgba(15,23,42,0.10)] transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.16)] md:right-7"
                >
                    <ArrowUp className="h-6 w-6" aria-hidden="true" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export default ScrollToTop;
