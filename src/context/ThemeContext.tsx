import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // ← one-click flip Light ↔ Dark
  effectiveTheme: "light" | "dark"; // ← what is actually applied right now
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  // Compute effective theme (what's actually on screen)
  const getEffectiveTheme = (): "light" | "dark" => {
    if (theme !== "system") return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(
    getEffectiveTheme()
  );

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove 'light' class just in case it was added previously and is causing issues
    root.classList.remove("light");

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const applySystem = () => {
        if (mediaQuery.matches) {
          root.classList.add("dark");
          setEffectiveTheme("dark");
        } else {
          root.classList.remove("dark");
          setEffectiveTheme("light");
        }
      };

      applySystem();

      const listener = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.add("dark");
          setEffectiveTheme("dark");
        } else {
          root.classList.remove("dark");
          setEffectiveTheme("light");
        }
      };

      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      if (theme === "dark") {
        root.classList.add("dark");
        setEffectiveTheme("dark");
      } else {
        root.classList.remove("dark");
        setEffectiveTheme("light");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    let current = theme;
    if (current === "system") {
      current = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    const newTheme = current === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    },
    toggleTheme,
    effectiveTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
