import React, { useState } from 'react';
import { Download, ChevronLeft, Maximize2, Minimize2, Settings } from 'lucide-react';
import generatePdf from 'react-to-pdf';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ThemeSelector, ConfigButtons } from './ThemeConfig';
import Editor from './Editor';
import Preview from './Preview';

const initialData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

const MainLayout = () => {
  const { theme } = useTheme();
  const appConfig = useAppConfig();
  
  const [data, setData] = useState(initialData);
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    const element = document.getElementById('resume-preview');
    if (element) {
      generatePdf({
        element,
        filename: `${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
        options: {
          margin: 1,
          format: [800, 1130],
        },
      });
    }
  };

  const handleConfigLoad = (config) => {
    setData(config);
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'dark' ? 'bg-card-dark/95' : 'bg-card-light/95'
      } backdrop-blur-lg shadow-glass`}>
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
              alt={appConfig.appName}
              className="h-8 w-auto"
            />
            <h1 className={`text-xl font-PublicaSans font-bold ${
              theme === 'dark' ? 'text-text-light' : 'text-text-dark'
            }`}>
              {appConfig.appName}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
            <button
              onClick={handleDownload}
              disabled={!data.personalInfo.name}
              className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accentHover text-text-light rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 flex h-[calc(100vh-64px)]">
        {/* Editor Section - 40% */}
        <div className={`w-[40%] transition-all duration-300 ${isFullscreen ? 'hidden' : ''}`}>
          <div className={`h-full ${
            theme === 'dark' ? 'bg-card-dark/95' : 'bg-card-light/95'
          } backdrop-blur-lg shadow-glass`}>
            {/* Editor Header */}
            <div className="p-4 border-b border-accent/10">
              <div className="flex items-center justify-between">
                <h2 className={`font-PublicaSans font-bold ${
                  theme === 'dark' ? 'text-text-light' : 'text-text-dark'
                }`}>
                  Editor
                </h2>
              </div>
            </div>
            
            {/* Editor Content */}
            <div className="p-6 h-[calc(100vh-140px)] overflow-y-auto">
              <Editor data={data} setData={setData} />
            </div>
          </div>
        </div>

        {/* Preview Section - 60% or full width */}
        <div className={`transition-all duration-300 ${
          isFullscreen ? 'w-full' : 'w-[60%]'
        }`}>
          <div className="relative h-full">
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 left-4 z-10 p-2 rounded-md bg-accent hover:bg-accentHover text-text-light transition-all duration-300"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            {/* Preview Content */}
            <div className={`h-full ${
              theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
            } backdrop-blur-lg shadow-glass`}>
              <div className="h-[calc(100vh-140px)] overflow-y-auto p-8" id="resume-preview">
                <Preview data={data} theme={currentTheme} />
              </div>

              {/* Theme Selector at Bottom */}
              {!isFullscreen && (
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-accent/10 backdrop-blur-sm">
                  <ThemeSelector 
                    currentTheme={currentTheme}
                    onThemeChange={setCurrentTheme}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default MainLayout;