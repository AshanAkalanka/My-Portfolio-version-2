import { useEffect, useState } from "react";

export default function usePageVisibility() {
    const [isVisible, setIsVisible] = useState(() => !document.hidden);

    useEffect(() => {
        const update = () => setIsVisible(!document.hidden);
        document.addEventListener("visibilitychange", update);
        return () => document.removeEventListener("visibilitychange", update);
    }, []);

    return isVisible;
}
