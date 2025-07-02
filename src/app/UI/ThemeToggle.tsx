"use client";
import { useContext } from "react";
import { ThemeContext } from "../Theme/ThemeProvider";

import { MoonIcon, SunIcon } from "../Icon/Icons";

const ThemeToggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

export default ThemeToggle;
