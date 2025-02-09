import React, { useState, useRef, useEffect } from 'react';
import { PanelLeft, ChevronDown } from 'lucide-react';
import { useAppConfig } from '../contexts/AppConfigContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ToolbarControls, ThemeSelector } from './ToolbarControls';
import Editor from './Editor';
import Preview from './Preview';
import Button from '../Ui/Button';

const ScrollDownButton = ({ targetRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollDown = () => {
    if (targetRef.current) {
      targetRef.current.scrollBy({
        top: targetRef.current.clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const checkVisibility = () => {
      if (targetRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = targetRef.current;
        setIsVisible(scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 50);
      }
    };

    const currentRef = targetRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkVisibility);
      checkVisibility();
      return () => currentRef.removeEventListener('scroll', checkVisibility);
    }
  }, [targetRef]);

  if (!isVisible) return null;

  return (
    <button 
      onClick={handleScrollDown}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white/90 dark:hover:bg-black/90 transition-all"
    >
      <ChevronDown className="h-5 w-5" />
    </button>
  );
};

const MainLayout = () => {
  const appConfig = useAppConfig();
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  
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
        isEditorCollapsed ? 'w-0 opacity-0' : 'w-[40%] opacity-100'
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

        <div className="grow overflow-hidden relative">
          <div 
            ref={editorRef}
            className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <Editor 
              data={data} 
              setData={setData}
              activeSection={activeSection}
            />
          </div>
          <ScrollDownButton targetRef={editorRef} />
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-px" />
      </div>

      <div className={`h-full transition-all duration-300 relative ${
        isEditorCollapsed ? 'w-full' : 'w-[60%]'
      }`}>
        <div className="absolute top-0 left-0 right-0 z-10 px-6 py-3 backdrop-blur border-b">
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
          <div className="flex-grow overflow-y-auto pt-[3.25rem] relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div ref={previewRef} className="max-w-4xl mx-auto p-8">
              <Preview data={data} theme={currentTheme} />
            </div>
            <ScrollDownButton targetRef={previewRef} />
          </div>

          <div className="p-4 border-t">
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