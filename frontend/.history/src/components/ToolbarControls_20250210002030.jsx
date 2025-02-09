import React, { useRef } from 'react';
import { Download, Layout, Save, Upload, Check } from 'lucide-react';
import Button from '../Ui/Button';
import { useTheme } from '../contexts/ThemeContext';


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
        icon={Upload}
        onClick={triggerFileInput}
      >
        Load
      </Button>

      <Button
        variant="ghost"
        size="sm"
        icon={Save}
        onClick={handleDownloadConfig}
      >
        Save
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