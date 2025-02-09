import React, { useState } from 'react';
import { PanelLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ToolbarControls, ThemeSelector } from './ToolbarControls';
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
      {/* Left Panel */}
      <div className={`h-full transition-all duration-300 relative flex flex-col ${
        isEditorCollapsed ? 'w-0 opacity-0' : 'w-[40%] opacity-100'
      }`}>
        {/* Header */}
        <div className={`shrink-0 ${
          theme === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'
        } backdrop-blur border-b ${
          theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'
        }`}>
          <div className="px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                  alt={appConfig.appName}
                  className="h-7 w-auto"
                />
                <div className={`h-6 w-px ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                }`} />
                <ThemeToggleButton />
              </div>
              <ToolbarControls 
                data={data}
                onConfigLoad={setData}
                onExport={handleDownload}
                isExporting={isExporting}
                onToggleEditor={() => setIsEditorCollapsed(!isEditorCollapsed)}
                isDisabled={!data.personalInfo.name}
              />
            </div>
          </div>
        </div>

        {/* Editor */}
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

        {/* Right Border */}
        <div className={`absolute right-0 top-0 bottom-0 w-px ${
          theme === 'dark' ? 'bg-slate-700/50' : 'border-slate-200/50'
        }`} />
      </div>

      {/* Right Panel */}
      <div className={`h-full transition-all duration-300 relative ${
        isEditorCollapsed ? 'w-full' : 'w-[60%]'
      }`}>
        {/* Preview Header */}
        <div className={`absolute top-0 left-0 right-0 z-10 px-6 py-3 ${
          theme === 'dark' ? 'bg-slate-900/95' : 'bg-slate-50/95'
        } backdrop-blur border-b ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-200/50'
        }`}>
          <div className="flex items-center gap-3">
            {isEditorCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                icon={PanelLeft}
                onClick={() => setIsEditorCollapsed(false)}
              >
                Show Editor
              </Button>
            )}
            <h2 className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Preview
            </h2>
          </div>
        </div>

        {/* Preview Content */}
        <div className="h-full bg-slate-50 dark:bg-slate-900">
          <div className="h-[calc(100%-5rem)] pt-[3.25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            <div className="max-w-4xl mx-auto p-8">
              <Preview data={data} theme={currentTheme} />
            </div>
          </div>

          {/* Theme Selector */}
          <ThemeSelector 
            currentTheme={currentTheme} 
            onThemeChange={setCurrentTheme} 
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;