import React, { useRef, useState } from 'react';
import { Download, Layout, Save, Upload } from 'lucide-react';
import Button from '../Ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import generatePdf from 'react-to-pdf';

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
  const [isLoading, setIsLoading] = useState({
    export: false,
    load: false,
    save: false
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(prev => ({ ...prev, load: true }));
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
        } finally {
          setIsLoading(prev => ({ ...prev, load: false }));
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadConfig = () => {
    setIsLoading(prev => ({ ...prev, save: true }));
    try {
      downloadJsonConfig(data);
    } catch (error) {
      console.error('Error downloading config:', error);
      alert('Failed to download configuration.');
    } finally {
      setIsLoading(prev => ({ ...prev, save: false }));
    }
  };

  const handleExportPdf = () => {
    setIsLoading(prev => ({ ...prev, export: true }));
    try {
      generatePdf(() => document.getElementById('resume-preview'), {
        filename: `${data.personalInfo.name || 'resume'}-${Date.now()}.pdf`,
        method: 'save',
        resolution: 2,
        page: {
          margin: 10,
          format: 'a4',
          orientation: 'portrait'
        }
      });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please check your browser compatibility.');
    } finally {
      setIsLoading(prev => ({ ...prev, export: false }));
    }
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
        disabled={isDisabled || isLoading.export}
        isLoading={isLoading.export}
        onClick={handleExportPdf}
      >
        Export PDF
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        icon={Upload}
        disabled={isLoading.load}
        isLoading={isLoading.load}
        onClick={triggerFileInput}
      >
        Load
      </Button>

      <Button
        variant="ghost"
        size="sm"
        icon={Save}
        disabled={isDisabled || isLoading.save}
        isLoading={isLoading.save}
        onClick={handleDownloadConfig}
      >
        Save Config
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
      >
      </Button>
    </div>
  );
};