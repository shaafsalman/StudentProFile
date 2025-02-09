// Professional resume themes following industry standards
import React from 'react';
import {Check } from 'lucide-react';


export const fontOptions = [
  { name: 'Inter', value: 'font-["Inter"]' },
  { name: 'Roboto', value: 'font-["Roboto"]' },
  { name: 'Open Sans', value: 'font-["Open_Sans"]' },
  { name: 'Lato', value: 'font-["Lato"]' },
  { name: 'Montserrat', value: 'font-["Montserrat"]' }
];

// Accent color options
export const accentColorOptions = [
  { name: 'Blue', value: 'text-blue-900 border-blue-500 bg-blue-50' },
  { name: 'Green', value: 'text-green-900 border-green-500 bg-green-50' },
  { name: 'Purple', value: 'text-purple-900 border-purple-500 bg-purple-50' },
  { name: 'Red', value: 'text-red-900 border-red-500 bg-red-50' },
  { name: 'Gray', value: 'text-gray-900 border-gray-500 bg-gray-50' }
];



// Theme Selector Component for Desktop
export const ThemeSelector = ({ 
  currentTheme, 
  onThemeChange, 
  currentFont, 
  onFontChange, 
  currentAccentColor, 
  onAccentColorChange 
}) => {
  return (
    <div className="space-y-4">
      {/* Theme Selector */}
      <div className="space-y-3">
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
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 '
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

      {/* Font Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-800">
          Select Font
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {fontOptions.map((font) => (
            <button
              key={font.value}
              onClick={() => onFontChange(font.value)}
              className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 ${
                currentFont === font.value
                  ? 'border-accent bg-accent text-white'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              } ${font.value}`}
            >
              {font.name}
              {currentFont === font.value && (
                <span className="absolute top-1 right-1">
                  <Check size={12} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-800">
          Select Accent Color
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {accentColorOptions.map((color) => (
            <button
              key={color.value}
              onClick={() => onAccentColorChange(color.value)}
              className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 ${
                currentAccentColor === color.value
                  ? 'border-2 border-accent'
                  : 'border-slate-200 hover:border-slate-300'
              } ${color.value}`}
            >
              {color.name}
              {currentAccentColor === color.value && (
                <span className="absolute top-1 right-1">
                  <Check size={12} className="text-current" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Theme Selector Dropdown for Mobile
export const ThemeSelectorDropdown = ({ 
  currentTheme, 
  onThemeChange, 
  currentFont, 
  onFontChange, 
  currentAccentColor, 
  onAccentColorChange 
}) => {
  return (
    <div className="space-y-4">
      {/* Theme Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Theme</label>
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
      </div>

      {/* Font Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Font</label>
        <select
          value={currentFont}
          onChange={(e) => onFontChange(e.target.value)}
          className="w-full p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-accent dark:focus:ring-accent"
        >
          {fontOptions.map((font) => (
            <option key={font.value} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Accent Color Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-1">Accent Color</label>
        <select
          value={currentAccentColor}
          onChange={(e) => onAccentColorChange(e.target.value)}
          className="w-full p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-accent dark:focus:ring-accent"
        >
          {accentColorOptions.map((color) => (
            <option key={color.value} value={color.value}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Resume Themes
export const resumeThemes = {
  classic: {
    name: 'Classic',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold mb-2 text-gray-900',
      contact: 'text-gray-600 space-y-1',
      sectionTitle: 'text-xl font-bold border-b-2 border-gray-300 mb-3 text-gray-800',
      sectionContainer: 'mb-6',
      itemTitle: 'font-semibold text-gray-800',
      itemSubtitle: 'text-gray-700 font-medium',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-600 mt-1',
      skills: 'bg-gray-100 px-3 py-1 rounded-full text-gray-700'
    }
  },
  modern: {
    name: 'Modern',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8',
      name: 'text-4xl font-bold mb-2 text-blue-900',
      contact: 'text-gray-700 space-y-1',
      sectionTitle: 'text-xl font-bold mb-3 text-blue-900 uppercase tracking-wider',
      sectionContainer: 'mb-6',
      itemTitle: 'font-semibold text-gray-900',
      itemSubtitle: 'text-blue-800 font-medium',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-700 mt-1',
      skills: 'bg-blue-50 px-3 py-1 rounded-md text-blue-800'
    }
  },
  minimal: {
    name: 'Minimal',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8',
      name: 'text-3xl font-light mb-2 text-gray-900',
      contact: 'text-gray-600 space-y-1',
      sectionTitle: 'text-lg font-medium mb-3 text-gray-900 uppercase',
      sectionContainer: 'mb-6',
      itemTitle: 'font-medium text-gray-900',
      itemSubtitle: 'text-gray-700',
      dates: 'text-gray-500 text-sm',
      description: 'text-gray-600 mt-1',
      skills: 'bg-gray-50 px-3 py-1 rounded-sm text-gray-700'
    }
  },
  professional: {
    name: 'Professional',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8 border-b-4 border-gray-800 pb-4',
      name: 'text-3xl font-bold mb-2 text-gray-900',
      contact: 'text-gray-700 space-y-1',
      sectionTitle: 'text-xl font-bold mb-3 text-gray-900 border-b-2 border-gray-400',
      sectionContainer: 'mb-6',
      itemTitle: 'font-bold text-gray-800',
      itemSubtitle: 'text-gray-700 font-semibold',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-600 mt-1',
      skills: 'bg-gray-200 px-3 py-1 rounded-none text-gray-800'
    }
  },
  executive: {
    name: 'Executive',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8 border-b border-gray-300 pb-4',
      name: 'text-4xl font-bold mb-2 text-gray-900',
      contact: 'text-gray-700 space-y-1 font-medium',
      sectionTitle: 'text-xl font-bold mb-3 text-gray-900 uppercase',
      sectionContainer: 'mb-6',
      itemTitle: 'font-bold text-gray-900',
      itemSubtitle: 'text-gray-800 font-semibold',
      dates: 'text-gray-700 text-sm font-medium',
      description: 'text-gray-700 mt-1',
      skills: 'bg-gray-100 px-4 py-2 rounded-md text-gray-800 font-medium'
    }
  }
};