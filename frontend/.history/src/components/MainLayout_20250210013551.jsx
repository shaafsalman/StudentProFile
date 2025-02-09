import React, { useState } from 'react';
import { PanelLeft } from 'lucide-react';
import { useAppConfig } from '../contexts/AppConfigContext';
import { useTheme } from '../contexts/ThemeContext';
import { useRef } from 'react';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ToolbarControls } from './ToolbarControls';
import Editor from './Editor';
import Preview from './Preview';
import Button from '../Ui/Button';
import generatePdf from 'react-to-pdf';

const MainLayout = () => {
  const appConfig = useAppConfig();
  const { theme } = useTheme();
  const targetRef = useRef();
  
  const [data, setData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '', summary: '' },
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    try {
      generatePdf(() => targetRef.current, {
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
      alert('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <div className={`h-full transition-all duration-300 relative flex flex-col ${
        isEditorCollapsed ? 'w-0 opacity-0' : 'w-[35%] opacity-100'
      }`}>
        <div className="shrink-0 bg-transparent backdrop-blur-xl border-b-2 border-r">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                  alt={appConfig.appName}
                  className="h-8 w-auto"
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
        isEditorCollapsed ? 'w-full' : 'w-[65%]'
      }`}>
        <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 bg-gray-200 ">
          <div className="flex items-center gap-4">
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

        <div className="h-full flex flex-col relative">
          <div className="flex-grow overflow-y-auto pt-[3.25rem] scrollbar-hidden relative">
            <div className="max-w-4xl mx-auto" ref={targetRef}>
              <Preview data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;