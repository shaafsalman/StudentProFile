import React, { useState } from 'react';
import { Download, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ThemeSelector, ConfigButtons } from './ThemeConfig';
import Editor from './Editor';
import Preview from './Preview';
import Button from '../Ui/Button';

const MainLayout = () => {
  const { theme } = useTheme();
  const appConfig = useAppConfig();
  
  const [data, setData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '', summary: '' },
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    setIsExporting(true);
    try {
      await generatePdf({
        element,
        filename: `${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
        options: { margin: 1, format: [800, 1130] },
      });
    } catch (error) {
      console.error('Export failed:', error);
    }
    setIsExporting(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-900 flex">
      {/* Left Panel - Editor with Header */}
      <div className={`h-full transition-all duration-300 relative flex flex-col ${
        isEditorCollapsed ? 'w-0 opacity-0' : 'w-[40%] opacity-100'
      }`}>
        {/* Header Section */}
        <div className={`shrink-0 p-5 ${
          theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        } border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <img 
                src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                alt={appConfig.appName}
                className="h-7 w-auto"
              />
              <div className={`h-6 w-px mx-1 ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
              }`} />
              <ThemeToggleButton />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {}} 
              >
                Templates
              </Button>
              <ConfigButtons data={data} onConfigLoad={setData} />
            </div>
          </div>
          <Button
            icon={Download}
            disabled={!data.personalInfo.name}
            isLoading={isExporting}
            fullWidth
            size="lg"
            onClick={handleDownload}
          >
            {isExporting ? 'Exporting...' : 'Export Resume'}
          </Button>
        </div>

        {/* Editor Section */}
        <div className={`grow overflow-hidden ${
          theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        }`}>
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            <Editor 
              data={data} 
              setData={setData}
              activeSection={activeSection}
            />
          </div>
        </div>

        {/* Collapse/Expand Button */}
        <Button
          variant="primary"
          size="sm"
          icon={isEditorCollapsed ? ChevronRight : ChevronLeft}
          className={`absolute top-1/2 ${
            isEditorCollapsed ? '-right-12' : '-right-3'
          } transform -translate-y-1/2 !p-2.5 rounded-full hover:scale-110`}
          onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
        />

        {/* Right Border */}
        <div className={`absolute right-0 top-0 bottom-0 w-px ${
          theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
        }`} />
      </div>

      {/* Right Panel - Preview */}
      <div className={`h-full transition-all duration-300 ${
        isEditorCollapsed ? 'w-full' : 'w-[60%]'
      }`}>
        <div className="h-full relative bg-slate-50 dark:bg-slate-900">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            <div className="max-w-4xl mx-auto p-8">
              <Preview data={data} theme={currentTheme} />
            </div>
          </div>

          <div className={`absolute bottom-6 right-6 ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          } rounded-xl shadow-lg p-4 border ${
            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
          } transition-transform duration-300 hover:scale-105`}>
            <ThemeSelector 
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;