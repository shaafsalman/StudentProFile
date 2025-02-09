// Professional resume themes following industry standards
import React from 'react';
import { Check, Palette, Pen, Maximize } from 'lucide-react';

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



export const ThemeSelector = ({ 
  currentTheme, 
  onThemeChange,
  currentFont,
  onFontChange,
  currentColorScheme,
  onColorSchemeChange,
  currentLayout,
  onLayoutChange
}) => {
  const [activeTab, setActiveTab] = useState('theme');

  const renderThemeTabs = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {Object.entries(resumeThemes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`relative p-2.5 rounded-md border text-sm font-medium transition-all duration-200 ${
              currentTheme === key
                ? 'border-accent bg-accent text-white'
                : 'border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            {theme.name}
            {currentTheme === key && (
              <span className="absolute top-1 right-1">
                <Check size={12} className="text-white" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderFontTabs = () => {
    const currentThemeData = resumeThemes[currentTheme];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {currentThemeData.fonts.map((font) => (
            <button
              key={font}
              onClick={() => onFontChange(font)}
              className={`p-2.5 rounded-md border text-sm transition-all duration-200 ${
                currentFont === font
                  ? 'border-accent bg-accent text-white'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
              style={{ fontFamily: font }}
            >
              {font}
              {currentFont === font && (
                <span className="absolute top-1 right-1">
                  <Check size={12} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderColorSchemeTabs = () => {
    const currentThemeData = resumeThemes[currentTheme];
    const colorSchemes = [
      { key: 'default', label: 'Default' },
      ...(currentThemeData.colorSchemes.alternative || [])
        .map((scheme, index) => ({ 
          key: `alt-${index}`, 
          label: `Alternative ${index + 1}`,
          ...scheme 
        }))
    ];

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.key}
              onClick={() => onColorSchemeChange(scheme)}
              className={`relative p-2.5 rounded-md border text-sm transition-all duration-200 ${
                currentColorScheme.key === scheme.key
                  ? 'border-accent bg-accent text-white'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <div 
                  className={`w-4 h-4 rounded-full bg-${scheme.primary}-500`}
                />
                <div 
                  className={`w-4 h-4 rounded-full bg-${scheme.accent}-500`}
                />
                <span>{scheme.label}</span>
              </div>
              {currentColorScheme.key === scheme.key && (
                <span className="absolute top-1 right-1">
                  <Check size={12} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderLayoutTabs = () => {
    const currentThemeData = resumeThemes[currentTheme];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {currentThemeData.layoutOptions.map((layout) => (
            <button
              key={layout}
              onClick={() => onLayoutChange(layout)}
              className={`p-2.5 rounded-md border text-sm capitalize transition-all duration-200 ${
                currentLayout === layout
                  ? 'border-accent bg-accent text-white'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              {layout}
              {currentLayout === layout && (
                <span className="absolute top-1 right-1">
                  <Check size={12} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 border-b pb-2">
        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2 ${
            activeTab === 'theme' ? 'text-accent font-semibold' : 'text-slate-600'
          }`}
        >
          <Palette size={16} />
          Theme
        </button>
        <button
          onClick={() => setActiveTab('font')}
          className={`flex items-center gap-2 ${
            activeTab === 'font' ? 'text-accent font-semibold' : 'text-slate-600'
          }`}
        >
          <Pen size={16} />
          Font
        </button>
        <button
          onClick={() => setActiveTab('color')}
          className={`flex items-center gap-2 ${
            activeTab === 'color' ? 'text-accent font-semibold' : 'text-slate-600'
          }`}
        >
          <Palette size={16} />
          Color
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center gap-2 ${
            activeTab === 'layout' ? 'text-accent font-semibold' : 'text-slate-600'
          }`}
        >
          <Maximize size={16} />
          Layout
        </button>
      </div>

      <div>
        {activeTab === 'theme' && renderThemeTabs()}
        {activeTab === 'font' && renderFontTabs()}
        {activeTab === 'color' && renderColorSchemeTabs()}
        {activeTab === 'layout' && renderLayoutTabs()}
      </div>
    </div>
  );
};

// Mobile-friendly Theme Selector Dropdown
export const ThemeSelectorDropdown = ({ 
  currentTheme, 
  onThemeChange,
  currentFont,
  onFontChange,
  currentColorScheme,
  onColorSchemeChange,
  currentLayout,
  onLayoutChange
}) => {
  return (
    <div className="space-y-2">
      {/* Theme Selector */}
      <select
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value)}
        className="w-full p-2 rounded-md border"
      >
        {Object.entries(resumeThemes).map(([key, theme]) => (
          <option key={key} value={key}>
            {theme.name}
          </option>
        ))}
      </select>

      {/* Font Selector */}
      <select
        value={currentFont}
        onChange={(e) => onFontChange(e.target.value)}
        className="w-full p-2 rounded-md border"
      >
        {resumeThemes[currentTheme].fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      {/* Layout Selector */}
      <select
        value={currentLayout}
        onChange={(e) => onLayoutChange(e.target.value)}
        className="w-full p-2 rounded-md border"
      >
        {resumeThemes[currentTheme].layoutOptions.map((layout) => (
          <option key={layout} value={layout}>
            {layout}
          </option>
        ))}
      </select>
    </div>
  );
};