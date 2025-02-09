import React, { useState } from 'react';
import { Layout, X } from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";
import { useAppConfig } from "../contexts/AppConfigContext";
import ThemeToggleButton from "../Ui/ThemeToggleButton";
import { ToolbarControls } from "./ToolbarControls";
import Button from "../Ui/Button";
import { accentColorOptions, fontOptions, resumeThemes } from './ThemeConfig';

// Advanced Sidebar Menu Component
const AdvancedSidebarMenu = ({ 
  currentTheme, 
  onThemeChange, 
  currentFont, 
  onFontChange, 
  currentAccentColor, 
  onAccentColorChange,
  onClose
}) => {
  const [activeSection, setActiveSection] = useState('theme');

  const sections = [
    {
      id: 'theme',
      title: 'CV Templates',
      options: Object.entries(resumeThemes).map(([value, theme]) => ({ 
        value, 
        name: theme.name 
      })),
      currentValue: currentTheme,
      onSelect: onThemeChange,
      renderLabel: (value) => resumeThemes[value]?.name || 'Select Theme',
      renderOption: (option) => (
        <div className="flex items-center justify-between w-full">
          <span className="text-sm">{option.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Preview Template
          </span>
        </div>
      )
    },
    {
      id: 'font',
      title: 'Font Styles',
      options: fontOptions,
      currentValue: currentFont,
      onSelect: onFontChange,
      renderLabel: (value) => fontOptions.find(f => f.value === value)?.name || 'Select Font',
      renderOption: (option) => (
        <div className="flex items-center justify-between w-full">
          <span className={`${option.value} text-sm`}>{option.name}</span>
          <span className={`${option.value} text-xs text-gray-500 dark:text-gray-400`}>
            Aa
          </span>
        </div>
      )
    },
    {
      id: 'color',
      title: 'Accent Colors',
      options: accentColorOptions,
      currentValue: currentAccentColor,
      onSelect: onAccentColorChange,
      renderLabel: (value) => 'Accent Color',
      renderOption: (option) => (
        <div className="flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-3">
            <div 
              className={`w-6 h-6 rounded-full border ${option.value}`} 
            />
            <span className="text-sm">{option.name || 'Accent Color'}</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed top-0 left-0 bottom-0 w-[35%] bg-white dark:bg-gray-900 z-[99] shadow-2xl transform transition-transform duration-300 ease-in-out">
      {/* Header with Close Button */}
      <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Customize Your CV
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Select your preferred template, font, and accent color
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex h-[calc(100%-120px)]">
        {/* Sidebar Navigation */}
        <div className="w-24 border-r dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                w-full py-4 text-center border-b dark:border-gray-800
                ${activeSection === section.id 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}
              `}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {sections.map((section) => (
            activeSection === section.id && (
              <div key={section.id}>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => section.onSelect(option.value)}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg flex items-center justify-between 
                        hover:bg-gray-100 dark:hover:bg-gray-800 
                        transition-colors duration-150
                        ${section.currentValue === option.value 
                          ? 'bg-accent/10 text-accent-foreground' 
                          : 'text-gray-700 dark:text-gray-300'}
                      `}
                    >
                      {section.renderOption(option)}
                      {section.currentValue === option.value && (
                        <div className="w-4 h-4 bg-accent rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = ({
  data,
  setData,
  currentTheme,
  setCurrentTheme,
  currentFont,
  setCurrentFont,
  currentAccentColor,
  setCurrentAccentColor,
  isEditorCollapsed,
  setIsEditorCollapsed,
  handleDownload,
  isExporting
}) => {
  const { theme } = useTheme();
  const appConfig = useAppConfig();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Left Section: Logo & App Name */}
            <div className="flex items-center gap-4">
              <img 
                src={theme === "dark" ? appConfig.logo_white : appConfig.logo_black} 
                alt={appConfig.appName} 
                className="h-8 w-auto transition-all duration-200 hover:opacity-80"
              />
              <h1 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-200">
                {appConfig.appName}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                icon={Layout}
                onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {isEditorCollapsed ? "Show Editor" : "Hide Editor"}
              </Button>
            </div>

            {/* Right Section: Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsSidebarOpen(true)}
                className="text-sm px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Customize CV
              </Button>
              
              <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-3" />
              
              <div className="flex items-center gap-3">
                <ToolbarControls
                  data={data}
                  onConfigLoad={setData}
                  onExport={handleDownload}
                  isExporting={isExporting}
                  onToggleEditor={() => setIsEditorCollapsed(!isEditorCollapsed)}
                  isDisabled={!data.personalInfo.name}
                />
                
                <ThemeToggleButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <AdvancedSidebarMenu
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          currentFont={currentFont}
          onFontChange={setCurrentFont}
          currentAccentColor={currentAccentColor}
          onAccentColorChange={setCurrentAccentColor}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;