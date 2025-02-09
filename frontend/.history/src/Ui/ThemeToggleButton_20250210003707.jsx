import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-1 rounded-full transition-all duration-300 ease-in-out transform hover:scale-360 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 bg-accent text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-gray-700 hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-orange-600 dark:hover:to-yellow-500 shadow-inner hover:shadow-xl group white"
      aria-label="Toggle theme"
    >
      <span className="absolute inset-0 bg-transparent animate-ripple" />

      {theme === "dark" ? (
        <Sun
          className="w-4 h-4 text-white transition-all duration-300 ease-in-out transform group-hover:rotate-180 group-hover:text-white"
        />
      ) : (
        <Moon
          className="w-4 h-4 text- transition-all duration-300 ease-in-out transform group-hover:rotate-180 group-hover:text-white"
        />
      )}
    </button>
  );
};

export default ThemeToggleButton;
