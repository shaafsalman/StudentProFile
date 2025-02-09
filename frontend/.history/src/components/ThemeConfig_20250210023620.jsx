import React, { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const fontOptions = [
  { name: 'Publica', value: 'font-["Publica"]' },
  { name: 'Inter', value: 'font-["Inter"]' },
  { name: 'Roboto', value: 'font-["Roboto"]' },
  { name: 'Open Sans', value: 'font-["Open_Sans"]' },
  { name: 'Lato', value: 'font-["Lato"]' },
  { name: 'Montserrat', value: 'font-["Montserrat"]' },
  { name: 'Poppins', value: 'font-["Poppins"]' },
  { name: 'Nunito', value: 'font-["Nunito"]' },
  { name: 'Merriweather', value: 'font-["Merriweather"]' },
  { name: 'Work Sans', value: 'font-["Work_Sans"]' },
  { name: 'Quicksand', value: 'font-["Quicksand"]' },
  { name: 'Raleway', value: 'font-["Raleway"]' },
  { name: 'Josefin Sans', value: 'font-["Josefin_Sans"]' },
  { name: 'DM Sans', value: 'font-["DM_Sans"]' },
  { name: 'Fira Sans', value: 'font-["Fira_Sans"]' },
  { name: 'Source Sans Pro', value: 'font-["Source_Sans_Pro"]' }
];


export const accentColorOptions = [
  { name: 'Blue', value: 'text-blue-900 border-blue-500 bg-blue-100' },
  { name: 'Red', value: 'text-red-900 border-red-500 bg-red-100' },
  { name: 'Gray', value: 'text-gray-900 border-gray-500 bg-gray-100' },
  { name: 'Teal', value: 'text-teal-900 border-teal-500 bg-teal-100' },
  { name: 'Indigo', value: 'text-indigo-900 border-indigo-500 bg-indigo-100' },
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



export const resumeThemes = {
  classic: {
    name: 'Classic',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto shadow-sm',
      header: 'text-center mb-8',
      name: 'text-4xl font-bold mb-3 text-gray-900',
      contact: 'text-gray-600 space-y-1',
      sectionTitle: 'text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800',
      sectionContainer: 'mb-8',
      itemTitle: 'font-semibold text-lg text-gray-800',
      itemSubtitle: 'text-gray-700 font-medium',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-600 mt-2 leading-relaxed',
      skills: 'bg-gray-100 px-4 py-1.5 rounded-full text-gray-700'
    }
  },
  modern: {
    name: 'Modern',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto shadow-md',
      header: 'mb-8 border-l-4 border-blue-600 pl-4',
      name: 'text-4xl font-bold mb-3',
      contact: 'text-gray-700 space-y-1',
      sectionTitle: 'text-2xl font-bold mb-4 uppercase tracking-wide',
      sectionContainer: 'mb-8',
      itemTitle: 'font-semibold text-lg',
      itemSubtitle: 'font-medium',
      dates: 'text-gray-600 text-sm tracking-wider',
      description: 'mt-2 leading-relaxed',
      skills: 'bg-opacity-10 px-4 py-1.5 rounded-md font-medium'
    }
  },
  minimal: {
    name: 'Minimal',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8',
      name: 'text-4xl font-light mb-3 tracking-tight',
      contact: 'text-gray-600 space-y-1',
      sectionTitle: 'text-xl font-medium mb-4 uppercase tracking-widest',
      sectionContainer: 'mb-8',
      itemTitle: 'font-medium text-lg',
      itemSubtitle: 'text-gray-700',
      dates: 'text-gray-500 text-sm',
      description: 'text-gray-600 mt-2 leading-relaxed',
      skills: 'border border-gray-200 px-4 py-1.5 rounded-sm'
    }
  },
  professional: {
    name: 'Professional',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto shadow-lg',
      header: 'mb-8 border-b-4 pb-4',
      name: 'text-4xl font-bold mb-3',
      contact: 'text-gray-700 space-y-1',
      sectionTitle: 'text-2xl font-bold mb-4 border-b-2 pb-2',
      sectionContainer: 'mb-8',
      itemTitle: 'font-bold text-lg',
      itemSubtitle: 'font-semibold',
      dates: 'text-gray-600 text-sm font-medium',
      description: 'mt-2 leading-relaxed',
      skills: 'bg-gray-100 px-4 py-2 font-medium'
    }
  },
  executive: {
    name: 'Executive',
    styles: {
      container: 'p-10 bg-white max-w-[800px] mx-auto shadow-xl',
      header: 'mb-10 border-b border-gray-300 pb-6',
      name: 'text-5xl font-bold mb-4 tracking-tight',
      contact: 'text-gray-700 space-y-1.5 font-medium',
      sectionTitle: 'text-2xl font-bold mb-6 uppercase tracking-wide',
      sectionContainer: 'mb-10',
      itemTitle: 'font-bold text-xl',
      itemSubtitle: 'text-lg font-semibold',
      dates: 'text-gray-700 text-sm font-medium tracking-wide',
      description: 'mt-3 leading-relaxed text-gray-700',
      skills: 'bg-gray-100 px-6 py-2.5 rounded-lg font-medium text-gray-800'
    }
  }
};