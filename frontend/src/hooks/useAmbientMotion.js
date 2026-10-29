import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import usePageVisibility from "./usePageVisibility";

// Decorative motion defaults to desktop; focused details can opt in on mobile.
export default function useAmbientMotion(targetRef, { allowMobile = false } = {}) {
    const prefersReducedMotion = useReducedMotion();
    const isPageVisible = usePageVisibility();
    const fallbackRef = useRef(null);
    const isInView = useInView(targetRef || fallbackRef, { amount: 0.15 });
    const [canAnimate, setCanAnimate] = useState(false);

    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
        const mobile = window.matchMedia("(max-width: 767px)");
        const update = () => setCanAnimate(desktop.matches || (allowMobile && mobile.matches));

        update();
        desktop.addEventListener("change", update);
        mobile.addEventListener("change", update);
        return () => {
            desktop.removeEventListener("change", update);
            mobile.removeEventListener("change", update);
        };
    }, [allowMobile]);

    return canAnimate && !prefersReducedMotion && isPageVisible && (!targetRef || isInView);
}
