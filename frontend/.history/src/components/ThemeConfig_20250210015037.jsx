// Professional resume themes following industry standards
import React ,{useState}from 'react';
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



export const ThemeSelector = ({ 
  currentTheme, 
  onThemeChange, 
  currentFont, 
  onFontChange, 
  currentAccentColor, 
  onAccentColorChange 
}) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const renderThemeSelector = () => (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {Object.entries(resumeThemes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => {
            onThemeChange(key);
            toggleSection(null);
          }}
          className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 group ${
            currentTheme === key
              ? 'border-blue-500 bg-blue-50 text-blue-800'
              : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="block truncate">{theme.name}</span>
          {currentTheme === key && (
            <span className="absolute top-1 right-1">
              <Check size={12} className="text-blue-600" />
            </span>
          )}
        </button>
      ))}
    </div>
  );

  const renderFontSelector = () => (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {fontOptions.map((font) => (
        <button
          key={font.value}
          onClick={() => {
            onFontChange(font.value);
            toggleSection(null);
          }}
          className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 group ${
            currentFont === font.value
              ? 'border-blue-500 bg-blue-50 text-blue-800'
              : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
          } ${font.value}`}
        >
          <span className="block truncate">{font.name}</span>
          {currentFont === font.value && (
            <span className="absolute top-1 right-1">
              <Check size={12} className="text-blue-600" />
            </span>
          )}
        </button>
      ))}
    </div>
  );

  const renderAccentColorSelector = () => (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {accentColorOptions.map((color) => {
        // Extract base color from the color classes
        const baseColorClass = color.value.split(' ').find(cls => cls.startsWith('text-')) || 'text-gray-900';
        const baseColor = baseColorClass.replace('text-', '').split('-')[0];

        return (
          <button
            key={color.value}
            onClick={() => {
              onAccentColorChange(color.value);
              toggleSection(null);
            }}
            className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 group ${
              currentAccentColor === color.value
                ? `border-2 border-${baseColor}-500 bg-${baseColor}-50`
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            } ${color.value}`}
          >
            <span className="block truncate">{color.name}</span>
            {currentAccentColor === color.value && (
              <span className="absolute top-1 right-1">
                <Check size={12} className={`text-${baseColor}-600`} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  const SectionHeader = ({ title, section, isOpen }) => (
    <button 
      onClick={() => toggleSection(section)}
      className="w-full flex justify-between items-center p-3 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
    >
      <span className="text-sm font-medium text-slate-700">{title}</span>
      {isOpen ? <ChevronUp size={16} className="text-slate-600" /> : <ChevronDown size={16} className="text-slate-600" />}
    </button>
  );

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="space-y-3">
        <SectionHeader 
          title="Select Theme" 
          section="theme" 
          isOpen={openSection === 'theme'}
        />
        {openSection === 'theme' && renderThemeSelector()}
      </div>

      <div className="space-y-3">
        <SectionHeader 
          title="Select Font" 
          section="font" 
          isOpen={openSection === 'font'}
        />
        {openSection === 'font' && renderFontSelector()}
      </div>

      <div className="space-y-3">
        <SectionHeader 
          title="Select Accent Color" 
          section="color" 
          isOpen={openSection === 'color'}
        />
        {openSection === 'color' && renderAccentColorSelector()}
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