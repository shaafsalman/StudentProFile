import React, { useState } from 'react';
import { PanelLeft } from 'lucide-react';
import { useAppConfig } from '../contexts/AppConfigContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ToolbarControls, ThemeSelector } from './ToolbarControls';
import Editor from './Editor';
import Preview from './Preview';
import Button from '../Ui/Button';

const MainLayout = () => {
  const appConfig = useAppConfig();
  const { theme } = useTheme();
  
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
    <div className="h-screen w-screen overflow-hidden flex">
      <div className={`h-full transition-all duration-300 relative flex flex-col ${
        isEditorCollapsed ? 'w-0 opacity-0' : 'w-[30%] opacity-100'
      }`}>
        <div className="shrink-0 backdrop-blur border-b">
          <div className="px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                  alt={appConfig.appName}
                  className="h-7 w-auto"
                />
                <div className="h-6 w-px" />
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

        <div className="grow overflow-hidden scrollbar-hide">
          <div className="h-full ">
            <Editor 
              data={data} 
              setData={setData}
              activeSection={activeSection}
            />
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-px" />
      </div>

      <div className={`h-full transition-all duration-300 relative ${
        isEditorCollapsed ? 'w-full' : 'w-70%]'
      }`}>
        <div className="absolute top-0 left-0 right-0 z-10 px-6 py-3 ">
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
            <h2 className="text-sm font-medium">
              Preview
            </h2>
          </div>
        </div>

        <div className="h-full flex flex-col">
          <div className="flex-grow overflow-y-auto pt-[3.25rem] scrollbar-thin">
            <div className="max-w-4xl mx-auto p-8">
              <Preview data={data} theme={currentTheme} />
            </div>
          </div>

          <div className="p-4 ">
            <div className="max-w-4xl mx-auto">
              <ThemeSelector 
                currentTheme={currentTheme} 
                onThemeChange={setCurrentTheme} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;