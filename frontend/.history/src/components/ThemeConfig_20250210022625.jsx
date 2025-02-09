import React, { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const fontOptions = [
  { name: 'Inter', value: 'font-[\"Inter\"]' },
  { name: 'Roboto', value: 'font-[\"Roboto\"]' },
  { name: 'Open Sans', value: 'font-[\"Open_Sans\"]' },
  { name: 'Lato', value: 'font-[\"Lato\"]' },
  { name: 'Montserrat', value: 'font-[\"Montserrat\"]' }
];

export const accentColorOptions = [
  { name: 'Blue', value: 'text-blue-900 border-blue-500 bg-blue-100' },
  { name: 'Green', value: 'text-green-900 border-green-500 bg-green-100' },
  { name: 'Purple', value: 'text-purple-900 border-purple-500 bg-purple-100' },
  { name: 'Red', value: 'text-red-900 border-red-500 bg-red-100' },
  { name: 'Gray', value: 'text-gray-900 border-gray-500 bg-gray-100' },
  { name: 'Teal', value: 'text-teal-900 border-teal-500 bg-teal-100' },
  { name: 'Orange', value: 'text-orange-900 border-orange-500 bg-orange-100' },
  { name: 'Pink', value: 'text-pink-900 border-pink-500 bg-pink-100' },
  { name: 'Yellow', value: 'text-yellow-900 border-yellow-500 bg-yellow-100' },
  { name: 'Indigo', value: 'text-indigo-900 border-indigo-500 bg-indigo-100' },
  { name: 'Cyan', value: 'text-cyan-900 border-cyan-500 bg-cyan-100' },
  { name: 'Amber', value: 'text-amber-900 border-amber-500 bg-amber-100' },
  { name: 'Lime', value: 'text-lime-900 border-lime-500 bg-lime-100' },
  { name: 'Rose', value: 'text-rose-900 border-rose-500 bg-rose-100' },
  { name: 'Emerald', value: 'text-emerald-900 border-emerald-500 bg-emerald-100' }
];


export const ThemeSelector = ({ currentTheme, onThemeChange, currentFont, onFontChange, currentAccentColor, onAccentColorChange }) => {
  const [menuOpen, setMenuOpen] = useState({ theme: false, font: false, color: false });
  const [fontMenuOpen, setFontMenuOpen] = useState(false), [colorMenuOpen, setColorMenuOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-container')) setMenuOpen({ theme: false, font: false, color: false });
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  return (
    <div className="flex items-center space-x-4 ">
    {/* CV Theme Selector */}
    <div className="relative menu-container">
      <button onClick={() => setMenuOpen({ ...menuOpen, theme: !menuOpen.theme })} className="flex items-center ">
        <span className="font-medium">CV Theme</span> <ChevronDown size={18} className="ml-2" />
      </button>
      {menuOpen.theme && (
        <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
          {Object.entries(resumeThemes).map(([key, theme]) => (
            <button key={key} onClick={() => onThemeChange(key)} className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 ${currentTheme === key ? 'bg-accent text-white' : 'text-gray-800'}`}>
              {theme.name} {currentTheme === key && <Check size={14} className="inline ml-2" />}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Font Selector */}
    <div className="relative menu-container">
      <button onClick={() => setMenuOpen({ ...menuOpen, font: !menuOpen.font })} className="flex items-center ">
        <span className={`${currentFont} font-medium text-base`}>Font</span> <ChevronDown size={18} className="ml-2" />
      </button>
      {menuOpen.font && (
        <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
          {fontOptions.map(font => (
            <button key={font.value} onClick={() => onFontChange(font.value)} className={`block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-200 ${currentFont === font.value ? 'bg-accent text-white' : 'text-gray-800'} ${font.value}`}>
              {font.name} {currentFont === font.value && <Check size={14} className="inline ml-2" />}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Color Selector */}
    <div className="relative menu-container">
      <button onClick={() => setMenuOpen({ ...menuOpen, color: !menuOpen.color })} className="flex items-center ">
        <div className={`w-6 h-6 rounded-full border-2 ${currentAccentColor} mr-2`} /> <span className="font-medium">Color</span> <ChevronDown size={18} className="ml-2" />
      </button>
      {menuOpen.color && (
        <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 flex flex-wrap gap-2">
          {accentColorOptions.map(color => (
            <button key={color.value} onClick={() => onAccentColorChange(color.value)} className={`w-8 h-8 rounded-full border-2 hover:shadow-md ${color.value} ${currentAccentColor === color.value ? 'border-black shadow-md' : 'border-gray-300'}`} />
          ))}
        </div>
      )}
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