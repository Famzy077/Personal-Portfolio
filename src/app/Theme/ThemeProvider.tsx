/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { MoonIcon, SunIcon } from "../Icon/Icons";

export const ThemeContext = createContext({ theme: "dark", setTheme: (t: string) => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === "dark" ? "light" : "dark");
        root.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

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
