import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Decorative motion is reserved for desktop devices with precise hover input.
export default function useAmbientMotion() {
    const prefersReducedMotion = useReducedMotion();
    const [hasFinePointer, setHasFinePointer] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
        const update = () => setHasFinePointer(media.matches);

        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return hasFinePointer && !prefersReducedMotion;
}
