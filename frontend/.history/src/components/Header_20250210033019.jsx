import React, { useState, useRef, useEffect } from 'react';
import { Layout, Check, ChevronDown, X } from 'lucide-react';
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
  onSelect,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(currentValue);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Only close if a selection has been made
        if (selectedOption !== currentValue) {
          onSelect(selectedOption);
        }
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedOption, currentValue, onSelect]);

  const handleSelect = (value) => {
    // Update local state to keep dropdown open
    setSelectedOption(value);
  };

  const handleClose = () => {
    // When explicitly closed, commit the selection
    onSelect(selectedOption);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {renderLabel(currentValue)}
        <ChevronDown size={16} className="text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-2xl overflow-hidden z-50">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center px-4 py-2.5 border-b dark:border-gray-700">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
              {label}
            </span>
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Options List */}
          <div className="max-h-96 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full text-left px-4 py-2.5 flex items-center justify-between 
                  hover:bg-gray-100 dark:hover:bg-gray-700 
                  transition-colors duration-150
                  ${selectedOption === option.value 
                    ? 'bg-accent/10 text-accent-foreground' 
                    : 'text-gray-700 dark:text-gray-300'}
                `}
              >
                {renderOption(option)}
                {selectedOption === option.value && (
                  <Check size={16} className="text-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Footer with Apply Button */}
          {selectedOption !== currentValue && (
            <div className="px-4 py-2.5 border-t dark:border-gray-700 flex justify-end">
              <button
                onClick={handleClose}
                className="bg-accent text-white px-4 py-1.5 rounded-md text-sm 
                  hover:bg-accent-hover transition-colors"
              >
                Apply
              </button>
            </div>
          )}
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
          <div className="flex items-center justify-between w-full">
            <span className="text-sm">{option.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Preview Available
            </span>
          </div>
        )}
        onSelect={onThemeChange}
      />

      {/* Font Selector */}
      <AdvancedDropdown
        label="Select Font"
        options={fontOptions}
        currentValue={currentFont}
        renderLabel={(value) => (
          <span className={`${value} font-medium text-sm`}>
            {fontOptions.find(f => f.value === value)?.name || 'Select Font'}
          </span>
        )}
        renderOption={(option) => (
          <div className="flex items-center justify-between w-full">
            <span className={`${option.value} text-sm`}>{option.name}</span>
            <span className={`${option.value} text-xs text-gray-500 dark:text-gray-400`}>
              Aa
            </span>
          </div>
        )}
        onSelect={onFontChange}
      />

      {/* Color Selector */}
      <AdvancedDropdown
        label="Accent Color"
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
          <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-3">
              <div 
                className={`w-6 h-6 rounded-full border ${option.value}`} 
              />
              <span className="text-sm">{option.name || 'Accent Color'}</span>
            </div>
            <Check 
              size={16} 
              className={`${option.value}`} 
            />
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