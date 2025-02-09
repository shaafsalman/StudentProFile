// Professional resume themes following industry standards
import React from 'react';
import {Check } from 'lucide-react';


// Theme Selector Component for Desktop
export const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="space-y-3 ">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-800">
        Select Theme
      </label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {Object.entries(resumeThemes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 ${
              currentTheme === key
                ? 'border-accent bg-accent text-white '
                : 'border-slate-200  hover:border-slate-300  text-slate-700 '
            }`}
          >
            {theme.name}
            {currentTheme === key && (
              <span className="absolute top-1 right-1">
                <Check size={12} className="text-accent dark:text-accent/10" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Theme Selector Dropdown for Mobile
export const ThemeSelectorDropdown = ({ currentTheme, onThemeChange }) => {
  return (
    <select
      value={currentTheme}
      onChange={(e) => onThemeChange(e.target.value)}
      className="w-full p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-accent dark:focus:ring-accent"
    >
      {Object.entries(resumeThemes).map(([key, theme]) => (
        <option key={key} value={key}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};

