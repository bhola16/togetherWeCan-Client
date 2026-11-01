"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-gray-200" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-700 shadow-sm transition duration-300 hover:scale-105 hover:bg-green-100"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
};

export default ThemeToggle;