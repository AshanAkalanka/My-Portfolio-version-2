import { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        // Persist preference across reloads
        return localStorage.getItem("theme") === "dark";
    });

    useLayoutEffect(() => {
        const root = document.documentElement;
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        const pageColor = isDark ? "#162338" : "#f4f4f4";

        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        root.style.backgroundColor = pageColor;
        document.body.style.backgroundColor = pageColor;

        if (themeColorMeta) {
            themeColorMeta.setAttribute("content", pageColor);
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
