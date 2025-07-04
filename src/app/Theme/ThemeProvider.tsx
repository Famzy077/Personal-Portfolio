"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from "react";
import { MoonIcon, SunIcon } from "../Icon/Icons";

// Define the types for our theme context
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// 1. Create the context with a more specific type
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Create a custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 3. Create the ThemeProvider component
export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // Use the specific 'Theme' type for the state
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const root = window.document.documentElement;
        // A simpler way to toggle the class
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 4. Create the ThemeToggle component
const ThemeToggle: FC = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <SunIcon/> : <MoonIcon />}
        </button>
    );
};

export default ThemeToggle;
