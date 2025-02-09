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
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'text-center mb-8',
      name: 'text-4xl font-bold mb-3 text-gray-900',
      contact: 'text-gray-600 space-y-1.5',
      sectionTitle: 'text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800 uppercase tracking-wider',
      sectionContainer: 'mb-8',
      itemTitle: 'font-semibold text-lg text-gray-800',
      itemSubtitle: 'text-gray-700 font-medium',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-600 mt-2 leading-relaxed',
      skills: 'bg-gray-100 px-4 py-1.5 rounded-sm text-gray-700'
    }
  },
  modern: {
    name: 'Modern Split',
    styles: {
      container: 'grid grid-cols-3 bg-white max-w-[800px] mx-auto',
      header: 'col-span-3 bg-gray-50 p-8 mb-0',
      name: 'text-4xl font-bold mb-3',
      contact: 'text-gray-600 space-y-1.5 flex flex-col items-center',
      sectionTitle: 'text-lg font-bold mb-4 uppercase tracking-wider border-l-4 pl-3',
      sectionContainer: 'mb-8 px-6 py-4',
      itemTitle: 'font-semibold text-lg',
      itemSubtitle: 'font-medium',
      dates: 'text-gray-600 text-sm bg-gray-100 px-2 py-0.5 rounded inline-block',
      description: 'mt-2 leading-relaxed',
      skills: 'px-3 py-1.5 border rounded-full text-sm font-medium',
      sidebar: 'col-span-1 bg-gray-50 p-6',
      main: 'col-span-2 p-6'
    }
  },
  minimal: {
    name: 'Swiss Minimal',
    styles: {
      container: 'p-12 bg-white max-w-[800px] mx-auto',
      header: 'mb-12 border-b border-gray-200 pb-8',
      name: 'text-5xl font-light mb-6 tracking-tight',
      contact: 'text-gray-600 space-x-4 flex items-center justify-center',
      sectionTitle: 'text-base font-medium mb-6 uppercase tracking-widest text-gray-400',
      sectionContainer: 'mb-12',
      itemTitle: 'font-medium text-lg',
      itemSubtitle: 'text-gray-600',
      dates: 'text-gray-400 text-sm tracking-wider',
      description: 'text-gray-600 mt-3 leading-relaxed',
      skills: 'text-gray-600 border-b border-gray-200 pb-1 inline-block mr-6'
    }
  },
  professional: {
    name: 'Executive Bold',
    styles: {
      container: 'bg-white max-w-[800px] mx-auto',
      header: 'bg-gray-900 text-white p-10 mb-8',
      name: 'text-5xl font-bold mb-4 tracking-tight',
      contact: 'text-gray-300 space-y-1.5 font-medium',
      sectionTitle: 'text-2xl font-bold mb-6 flex items-center gap-3 before:content-[""] before:block before:w-6 before:h-1 before:bg-current',
      sectionContainer: 'mb-10 px-10',
      itemTitle: 'font-bold text-xl',
      itemSubtitle: 'text-lg font-medium',
      dates: 'text-gray-500 text-sm font-medium uppercase tracking-wider',
      description: 'mt-3 leading-relaxed text-gray-600',
      skills: 'bg-gray-900 text-white px-4 py-2 inline-block mr-2 mb-2'
    }
  },
  creative: {
    name: 'Creative Grid',
    styles: {
      container: 'grid grid-cols-12 gap-6 bg-white max-w-[800px] mx-auto p-8',
      header: 'col-span-12 mb-6 relative',
      name: 'text-6xl font-black mb-3 tracking-tight leading-none',
      contact: 'text-gray-600 space-y-1.5 absolute top-2 right-0 text-right',
      sectionTitle: 'text-sm font-bold mb-4 uppercase tracking-widest col-span-3 pt-1',
      sectionContainer: 'mb-12 contents',
      itemTitle: 'font-bold text-xl mb-2',
      itemSubtitle: 'font-medium text-gray-600',
      dates: 'text-gray-400 text-sm mb-2',
      description: 'text-gray-600 leading-relaxed',
      skills: 'bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium',
      mainContent: 'col-span-9'
    }
  },
  compact: {
    name: 'Compact Modern',
    styles: {
      container: 'p-6 bg-white max-w-[800px] mx-auto',
      header: 'flex justify-between items-start mb-8 border-l-8 pl-4 py-2',
      name: 'text-3xl font-bold tracking-tight',
      contact: 'text-right text-sm text-gray-600 space-y-0.5',
      sectionTitle: 'text-lg font-bold mb-3 flex items-center gap-2',
      sectionContainer: 'mb-6',
      itemTitle: 'font-semibold',
      itemSubtitle: 'text-gray-600 text-sm',
      dates: 'text-gray-500 text-xs uppercase tracking-wider',
      description: 'text-gray-600 mt-1 text-sm leading-relaxed',
      skills: 'inline-block mr-2 last:mr-0 text-sm font-medium after:content-["•"] after:ml-2 last:after:content-none'
    }
  },
  professionalPlus: {
    name: 'Professional Plus',
    styles: {
      container: 'grid grid-cols-4 bg-white max-w-[800px] mx-auto min-h-[1000px]',
      header: 'col-span-3 p-8 pl-12',
      name: 'text-4xl font-bold mb-3 tracking-tight',
      contact: 'text-gray-600 space-y-1.5',
      sectionTitle: 'text-xl font-bold mb-4 uppercase tracking-wide border-b-2 pb-1',
      sectionContainer: 'mb-8',
      itemTitle: 'font-bold text-lg',
      itemSubtitle: 'font-medium text-gray-700',
      dates: 'text-gray-500 text-sm font-medium',
      description: 'text-gray-600 mt-2 leading-relaxed',
      skills: 'bg-gray-100 px-3 py-1.5 rounded-md text-gray-700 text-sm',
      sidebar: 'bg-gray-900 text-white p-8 flex flex-col gap-6',
      main: 'p-8 pl-12',
      sidebarTitle: 'text-sm font-bold uppercase tracking-widest text-gray-400 mb-3',
      sidebarContent: 'text-gray-300 text-sm leading-relaxed'
    }
  },
  minimalistCards: {
    name: 'Minimalist Cards',
    styles: {
      container: 'p-8 bg-gray-50 max-w-[800px] mx-auto',
      header: 'bg-white rounded-lg p-8 mb-6 shadow-sm',
      name: 'text-5xl font-light mb-4 tracking-tight',
      contact: 'text-gray-500 flex items-center gap-4 flex-wrap',
      sectionTitle: 'text-lg font-medium mb-4 text-gray-900',
      sectionContainer: 'bg-white rounded-lg p-6 mb-6 shadow-sm',
      itemTitle: 'font-medium text-gray-900',
      itemSubtitle: 'text-gray-600',
      dates: 'text-gray-400 text-sm',
      description: 'text-gray-600 mt-2 leading-relaxed',
      skills: 'border border-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-50 transition-colors',
      cardHeader: 'flex justify-between items-start mb-4 pb-4 border-b',
      cardTitle: 'font-medium text-gray-400 uppercase tracking-wide text-sm'
    }
  }
};