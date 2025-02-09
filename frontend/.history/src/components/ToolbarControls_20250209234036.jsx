import React, { useRef } from 'react';
import { Download, Layout, Save, Upload, Check } from 'lucide-react';
import Button from '../Ui/Button';
import { useTheme } from '../contexts/ThemeContext';

// Theme configuration object
const resumeThemes = {
  classic: { name: 'Classic' },
  modern: { name: 'Modern' },
  minimal: { name: 'Minimal' },
  professional: { name: 'Professional' }
};

// Utility function for downloading configuration
const downloadJsonConfig = (data) => {
  const config = JSON.stringify(data, null, 2);
  const blob = new Blob([config], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resume-config-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Theme Selector Component for Desktop
export const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="space-y-3 bg-card-dark/80">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Select Theme
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(resumeThemes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`relative p-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
              currentTheme === key
                ? 'border-accent bg-accent/30 text-accent dark:bg-accent dark:text-accent/10'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
            }`}
          >
            {theme.name}
            {currentTheme === key && (
              <span className="absolute top-1 right-1">
                <Check size={12} className="text-accent dark:text-accent/10" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Theme Selector Dropdown for Mobile
export const ThemeSelectorDropdown = ({ currentTheme, onThemeChange }) => {
  return (
    <select
      value={currentTheme}
      onChange={(e) => onThemeChange(e.target.value)}
      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-accent dark:focus:ring-accent"
    >
      {Object.entries(resumeThemes).map(([key, theme]) => (
        <option key={key} value={key}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};

// Toolbar Controls Component
export const ToolbarControls = ({ 
  data,
  onConfigLoad,
  onExport,
  isExporting,
  onToggleEditor,
  isDisabled = false
}) => {
  const { theme } = useTheme();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target.result);
          
          // Validate the config has the expected structure
          const expectedKeys = ['personalInfo', 'education', 'experience', 'projects', 'skills'];
          const isValidConfig = expectedKeys.every(key => config.hasOwnProperty(key));
          
          if (isValidConfig) {
            onConfigLoad(config);
          } else {
            console.error('Invalid configuration file');
            alert('The uploaded file is not a valid resume configuration.');
          }
        } catch (error) {
          console.error('Error parsing config file:', error);
          alert('Failed to load the configuration file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadConfig = () => {
    downloadJsonConfig(data);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`h-6 mx-1 w-px ${
        theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
      }`} />

      <Button
        variant="ghost"
        size="sm"
        icon={Download}
        disabled={isDisabled}
        isLoading={isExporting}
        onClick={onExport}
      >
        Export
      </Button>

      <Button
        variant="ghost"
        size="sm"
        icon={Save}
        onClick={handleDownloadConfig}
      >
        Save
      </Button>

      <Button
        variant="ghost"
        size="sm"
        icon={Upload}
        onClick={triggerFileInput}
      >
        Load
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />

      <Button
        variant="ghost"
        size="sm"
        icon={Layout}
        onClick={onToggleEditor}
      />
    </div>
  );
};