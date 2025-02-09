import React from 'react';
import { Download, Layout, Save, Upload } from 'lucide-react';
import Button from '../Ui/Button';
import { useTheme } from '../contexts/ThemeContext';

export const ToolbarControls = ({ 
  data,
  onConfigLoad,
  onExport,
  isExporting,
  currentTheme,
  onThemeChange,
  onToggleEditor,
  isDisabled
}) => {
    const { theme } = useTheme();

  const downloadConfig = () => {
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          onConfigLoad(config);
        } catch (error) {
          console.error('Error parsing config file:', error);
        }
      };
      reader.readAsText(file);
    }
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
        onClick={downloadConfig}
      >
        Save
      </Button>

      <label className="contents">
        <Button
          variant="ghost"
          size="sm"
          icon={Upload}
          as="span"
        >
          Load
        </Button>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      <Button
        variant="ghost"
        size="sm"
        icon={Layout}
        onClick={onToggleEditor}
      />
    </div>
  );
};