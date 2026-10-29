import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import usePageVisibility from "../hooks/usePageVisibility";

function sample(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
}

function position(index) {
    const seed = (index + 1) * 31;
    return {
        left: 3 + sample(seed) * 94,
        top: 8 + sample(seed + 1) * 86,
        size: 1.2 + sample(seed + 2) * 1.6,
        brightness: 0.35 + sample(seed + 3) * 0.5,
    };
}

const initialStars = Array.from({ length: 160 }, (_, index) => ({
    ...position(index),
    duration: 4 + sample(index + 21) * 5,
    delay: -sample(index + 71) * 9,
}));

export default function HeroStars() {
    const layerRef = useRef(null);
    const { isDark } = useTheme();
    const inView = useInView(layerRef, { amount: 0.1 });
    const pageVisible = usePageVisibility();
    const reducedMotion = useReducedMotion();
    const running = isDark && inView && pageVisible && !reducedMotion;

    return (
        <div ref={layerRef} className="hero-stars" data-running={running} aria-hidden="true">
            {initialStars.map((star, index) => (
                <span key={index} className="hero-star" style={{
                    left: star.left + "%",
                    top: star.top + "%",
                    "--star-size": star.size + "px",
                    "--star-brightness": star.brightness,
                    "--star-duration": star.duration + "s",
                    "--star-delay": star.delay + "s",
                }} />
            ))}
        </div>
    );
}
