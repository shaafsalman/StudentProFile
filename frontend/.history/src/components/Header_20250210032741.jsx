import React, { useState, useRef, useEffect } from 'react';
import { Layout, Check, ChevronDown } from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";
import { useAppConfig } from "../contexts/AppConfigContext";
import ThemeToggleButton from "../Ui/ThemeToggleButton";
import { ToolbarControls } from "./ToolbarControls";
import Button from "../Ui/Button";
import { accentColorOptions, fontOptions, resumeThemes } from './ThemeConfig';

// Advanced Dropdown Component
const AdvancedDropdown = ({ 
  label, 
  options, 
  currentValue, 
  renderLabel, 
  renderOption, 
  onSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {renderLabel(currentValue)}
        <ChevronDown size={16} className="text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2.5 flex items-center justify-between 
                  hover:bg-gray-100 dark:hover:bg-gray-700 
                  ${currentValue === option.value 
                    ? 'bg-accent/10 text-accent-foreground' 
                    : 'text-gray-700 dark:text-gray-300'}
                `}
              >
                {renderOption(option)}
                {currentValue === option.value && (
                  <Check size={16} className="text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Theme Selector with Advanced Dropdown
const ThemeSelector = ({ 
  currentTheme, 
  onThemeChange, 
  currentFont, 
  onFontChange, 
  currentAccentColor, 
  onAccentColorChange 
}) => {
  return (
    <div className="flex items-center space-x-4">
      {/* CV Theme Selector */}
      <AdvancedDropdown
        label="CV Theme"
        options={Object.entries(resumeThemes).map(([value, theme]) => ({ 
          value, 
          name: theme.name 
        }))}
        currentValue={currentTheme}
        renderLabel={(value) => (
          <span className="font-medium text-sm">
            {resumeThemes[value]?.name || 'Select Theme'}
          </span>
        )}
        renderOption={(option) => (
          <span className="text-sm">{option.name}</span>
        )}
        onSelect={onThemeChange}
      />

      {/* Font Selector */}
      <AdvancedDropdown
        label="Font"
        options={fontOptions}
        currentValue={currentFont}
        renderLabel={(value) => (
          <span className={`${value} font-medium text-sm`}>
            {fontOptions.find(f => f.value === value)?.name || 'Select Font'}
          </span>
        )}
        renderOption={(option) => (
          <span className={`${option.value} text-sm`}>{option.name}</span>
        )}
        onSelect={onFontChange}
      />

      {/* Color Selector */}
      <AdvancedDropdown
        label="Color"
        options={accentColorOptions}
        currentValue={currentAccentColor}
        renderLabel={(value) => (
          <div className="flex items-center gap-2">
            <div 
              className={`w-5 h-5 rounded-full border ${value}`} 
            />
            <span className="text-sm font-medium">Color</span>
          </div>
        )}
        renderOption={(option) => (
          <div className="flex items-center gap-3">
            <div 
              className={`w-6 h-6 rounded-full border ${option.value}`} 
            />
            <span className="text-sm">{option.name || 'Accent Color'}</span>
          </div>
        )}
        onSelect={onAccentColorChange}
      />
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

  return (
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
          </div>

          {/* Center Section: Editor Toggle */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
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
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
              currentFont={currentFont}
              onFontChange={setCurrentFont}
              currentAccentColor={currentAccentColor}
              onAccentColorChange={setCurrentAccentColor}
            />
            
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
  );
};

export default Header;