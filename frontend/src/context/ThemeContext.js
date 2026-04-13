import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        // Persist preference across reloads
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');

        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
            document.body.style.backgroundColor = "#0a192f";
            if (themeColorMeta) {
                themeColorMeta.setAttribute("content", "#0a192f");
            }
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
            document.body.style.backgroundColor = "#f5f5f7";
            if (themeColorMeta) {
                themeColorMeta.setAttribute("content", "#f5f5f7");
            }
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
