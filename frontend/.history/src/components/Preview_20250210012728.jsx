import React, { useState } from 'react';
import { resumeThemes } from './ThemeConfig';
import { Palette, Pen, Maximize, Check } from 'lucide-react';

export default function Preview({ data }) {
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [currentFont, setCurrentFont] = useState('Inter');
  const [currentColorScheme, setCurrentColorScheme] = useState(null);
  const [currentLayout, setCurrentLayout] = useState('balanced');
  const [activeTab, setActiveTab] = useState('theme');

  const themeData = resumeThemes[currentTheme];

  // Determine color scheme
  const colorScheme = currentColorScheme || {
    key: 'default',
    primary: themeData.colorSchemes.default.primary,
    accent: themeData.colorSchemes.default.accent
  };

  // Helper function to truncate text based on layout
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const layoutLengths = {
      compact: 100,
      balanced: 200,
      detailed: 500
    };
    const length = maxLength || layoutLengths[currentLayout] || 200;
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  // Dynamic styling based on color scheme and layout
  const dynamicStyles = {
    container: `p-${currentLayout === 'compact' ? 4 : currentLayout === 'balanced' ? 6 : 8} 
      bg-white max-w-[800px] mx-auto font-[${currentFont}]`,
    name: `text-${currentLayout === 'compact' ? '2xl' : currentLayout === 'balanced' ? '3xl' : '4xl'} 
      font-bold mb-2 text-${colorScheme.primary}-900`,
    sectionTitle: `text-${currentLayout === 'compact' ? 'lg' : currentLayout === 'balanced' ? 'xl' : '2xl'} 
      font-bold border-b-2 border-${colorScheme.primary}-300 mb-3 
      text-${colorScheme.primary}-800`,
    itemTitle: `font-semibold text-${colorScheme.primary}-800`,
    skills: `bg-${colorScheme.accent}-100 px-2 py-1 
      rounded-${currentLayout === 'compact' ? 'sm' : currentLayout === 'balanced' ? 'md' : 'lg'} 
      text-${colorScheme.accent}-800`
  };

  // Render theme customization tabs
  const renderThemeTabs = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {Object.entries(resumeThemes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => setCurrentTheme(key)}
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
  );

  // Continue with the rest of the component code from the previous response...

  // Skills section (completing the unfinished part)
  const skillsList = data.skills.length > 0 ? data.skills : [
    'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'
  ];

  return (
    <div className="relative">
      {/* Theme Customization Tabs */}
      <div className="mb-4 bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-center space-x-4 border-b pb-2 mb-4">
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

      {/* Resume Preview */}
      <div 
        id="resume-preview"
        className={`${dynamicStyles.container} w-[210mm] min-h-[297mm] max-h-[297mm] 
          overflow-hidden text-[${currentLayout === 'compact' ? '10px' : currentLayout === 'balanced' ? '12px' : '14px'}] 
          leading-tight mx-auto shadow-lg`}
        style={{ fontFamily: currentFont }}
      >
        {/* Skills Section */}
        <section className={`${themeData.styles.sectionContainer} break-inside-avoid`}>
          <h2 className={dynamicStyles.sectionTitle}>Skills</h2>
          <div className="flex flex-wrap gap-1">
            {skillsList
              .slice(0, currentLayout === 'compact' ? 5 : currentLayout === 'balanced' ? 10 : 15)
              .map((skill, index) => (
                <span
                  key={index}
                  className={`${dynamicStyles.skills} text-[10px] mb-1`}
                >
                  {skill}
                </span>
              ))
            }
          </div>
        </section>
      </div>
    </div>
  );
}