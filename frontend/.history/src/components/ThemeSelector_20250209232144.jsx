import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const themes = [
  { id: 'classic', name: 'Classic', color: 'bg-blue-500' },
  { id: 'modern', name: 'Modern', color: 'bg-emerald-500' },
  { id: 'minimal', name: 'Minimal', color: 'bg-violet-500' },
  { id: 'professional', name: 'Professional', color: 'bg-amber-500' },
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const { theme } = useTheme();

  return (
    <div className={`h-20 border-t ${
      theme === 'dark' ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'
    } backdrop-blur-sm`}>
      <div className="h-full px-6 overflow-x-auto flex items-center gap-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        {themes.map(({ id, name, color }) => (
          <button
            key={id}
            onClick={() => onThemeChange(id)}
            className={`flex-none relative px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
              currentTheme === id
                ? `border-${color} bg-${color}/10`
                : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700'
            }`}
          >
            <div className={`h-2 w-2 rounded-full ${color} mb-2`} />
            <span className={`text-sm font-medium ${
              currentTheme === id
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400'
            }`}>
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;