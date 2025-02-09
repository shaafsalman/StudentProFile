import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const fontOptions = [
  { name: 'Inter', value: 'font-[\"Inter\"]' },
  { name: 'Roboto', value: 'font-[\"Roboto\"]' },
  { name: 'Open Sans', value: 'font-[\"Open_Sans\"]' },
  { name: 'Lato', value: 'font-[\"Lato\"]' },
  { name: 'Montserrat', value: 'font-[\"Montserrat\"]' }
];

export const accentColorOptions = [
  { name: 'Blue', value: 'text-blue-900 border-blue-500 bg-blue-50' },
  { name: 'Green', value: 'text-green-900 border-green-500 bg-green-50' },
  { name: 'Purple', value: 'text-purple-900 border-purple-500 bg-purple-50' },
  { name: 'Red', value: 'text-red-900 border-red-500 bg-red-50' },
  { name: 'Gray', value: 'text-gray-900 border-gray-500 bg-gray-50' }
];

export const ThemeSelector = ({ currentTheme, onThemeChange, currentFont, onFontChange, currentAccentColor, onAccentColorChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative space-y-4">
      {/* Theme Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Select Theme</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(resumeThemes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => onThemeChange(key)}
              className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 ${
                currentTheme === key ? 'border-accent bg-accent text-white' : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              {theme.name}
              {currentTheme === key && <Check size={12} className="absolute top-1 right-1 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Font & Color Toggle */}
      <div className="absolute top-2 right-2 flex items-center space-x-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`w-6 h-6 rounded-full border ${currentAccentColor}`} />
        <span className={`${currentFont} text-sm font-medium`}>A</span>
        <ChevronDown size={16} className="text-slate-700" />
      </div>

      {/* Hover Menu */}
      {menuOpen && (
        <div className="absolute top-10 right-2 w-40 bg-white border rounded-lg shadow-md p-2 space-y-3">
          {/* Font Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700">Font</label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map(font => (
                <button
                  key={font.value}
                  onClick={() => onFontChange(font.value)}
                  className={`relative p-1 rounded-md border text-xs font-medium transition-all duration-200 ${
                    currentFont === font.value ? 'border-accent bg-accent text-white' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  } ${font.value}`}
                >
                  {font.name}
                  {currentFont === font.value && <Check size={10} className="absolute top-1 right-1 text-white" />}
                </button>
              ))}
            </div>
          </div>
          {/* Accent Color Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700">Accent Color</label>
            <div className="flex space-x-2">
              {accentColorOptions.map(color => (
                <button
                  key={color.value}
                  onClick={() => onAccentColorChange(color.value)}
                  className={`w-6 h-6 rounded-full border ${color.value} ${currentAccentColor === color.value ? 'border-2 border-accent' : 'border-slate-300'}`}
                />
              ))}
            </div>
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