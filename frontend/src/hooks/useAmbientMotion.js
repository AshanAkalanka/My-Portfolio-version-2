import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import usePageVisibility from "./usePageVisibility";

// Decorative motion is reserved for desktop devices with precise hover input.
export default function useAmbientMotion(targetRef) {
    const prefersReducedMotion = useReducedMotion();
    const isPageVisible = usePageVisibility();
    const fallbackRef = useRef(null);
    const isInView = useInView(targetRef || fallbackRef, { amount: 0.15 });
    const [hasFinePointer, setHasFinePointer] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
        const update = () => setHasFinePointer(media.matches);

        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return hasFinePointer && !prefersReducedMotion && isPageVisible && (!targetRef || isInView);
}
