import React, { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const fontOptions = [
  { name: 'Inter', value: 'font-["Inter"]' },
  { name: 'Roboto', value: 'font-["Roboto"]' },
  { name: 'Open Sans', value: 'font-["Open_Sans"]' },
  { name: 'Lato', value: 'font-["Lato"]' },
  { name: 'Montserrat', value: 'font-["Montserrat"]' }
];

export const accentColorOptions = [
  { name: 'Blue', value: 'text-blue-900 border-blue-500 bg-blue-100' },
  { name: 'Green', value: 'text-green-900 border-green-500 bg-green-100' },
  { name: 'Purple', value: 'text-purple-900 border-purple-500 bg-purple-100' },
  { name: 'Red', value: 'text-red-900 border-red-500 bg-red-100' },
  { name: 'Gray', value: 'text-gray-900 border-gray-500 bg-gray-100' }
];

export const ThemeSelector = ({ currentTheme, onThemeChange, currentFont, onFontChange, currentAccentColor, onAccentColorChange }) => {
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-container')) {
        setFontMenuOpen(false);
        setColorMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-6 ">
      {/* Theme Selector */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-800">Select Theme</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(resumeThemes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => onThemeChange(key)}
              className={`relative p-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-md ${
                currentTheme === key ? 'border-accent bg-accent text-white shadow-md' : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              {theme.name}
              {currentTheme === key && <Check size={14} className="absolute top-1 right-1 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Font Selector Button */}
      <div className="absolute top-3 right-16 flex items-center space-x-3 cursor-pointer bg-gray-100 p-2 rounded-lg shadow-md hover:bg-gray-200 menu-container" onClick={() => setFontMenuOpen(!fontMenuOpen)}>
        <span className={`${currentFont} text-base font-semibold`}>A</span>
        <ChevronDown size={18} className="text-gray-700" />
      </div>

      {/* Font Menu */}
      {fontMenuOpen && (
        <div className="absolute bottom-12 right-16 w-48 bg-white border rounded-lg shadow-lg p-3 space-y-4 menu-container">
          <label className="block text-xs font-semibold text-gray-700">Font</label>
          <div className="grid grid-cols-2 gap-2">
            {fontOptions.map(font => (
              <button
                key={font.value}
                onClick={() => onFontChange(font.value)}
                className={`relative p-2 rounded-lg border text-xs font-medium transition-all duration-200 hover:shadow-md ${
                  currentFont === font.value ? 'border-accent bg-accent text-white' : 'border-gray-300 hover:border-gray-400 text-gray-700'
                } ${font.value}`}
              >
                {font.name}
                {currentFont === font.value && <Check size={12} className="absolute top-1 right-1 text-white" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector Button */}
      <div className="absolute top-3 right-3 flex items-center space-x-3 cursor-pointer bg-gray-100 p-2 rounded-lg shadow-md hover:bg-gray-200 menu-container" onClick={() => setColorMenuOpen(!colorMenuOpen)}>
        <div className={`w-7 h-7 rounded-full border ${currentAccentColor}`} />
        <ChevronDown size={18} className="text-gray-700" />
      </div>

      {/* Color Menu */}
      {colorMenuOpen && (
        <div className="absolute bottom-12 right-3 w-48 bg-white border rounded-lg shadow-lg p-3 space-y-4 menu-container">
          <label className="block text-xs font-semibold text-gray-700">Accent Color</label>
          <div className="flex space-x-2">
            {accentColorOptions.map(color => (
              <button
                key={color.value}
                onClick={() => onAccentColorChange(color.value)}
                className={`w-7 h-7 rounded-full border-2 transition-all duration-200 hover:shadow-md ${color.value} ${currentAccentColor === color.value ? 'border-accent shadow-md' : 'border-gray-300'}`}
              />
            ))}
          </div>
        </div>
      )}
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