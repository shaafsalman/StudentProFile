import React, { useState } from 'react';
import { Download, ChevronLeft, Maximize2, Minimize2, Settings } from 'lucide-react';
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
      theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'
      } backdrop-blur-md border-b ${
        theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
      }`}>
        <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
              alt={appConfig.appName}
              className="h-8 w-auto transition-all duration-300 hover:opacity-80"
            />
            <h1 className={`text-xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {appConfig.appName}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
            <button
              onClick={handleDownload}
              disabled={!data.personalInfo.name}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Download size={18} />
              <span className="hidden md:inline font-medium">Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Refined Main Content */}
      <main className="pt-20 flex h-[calc(100vh-80px)]">
        {/* Editor Section with improved styling */}
        <div className={`transition-all duration-300 ${
          isFullscreen ? 'hidden' : 'w-2/5'
        }`}>
          <div className={`h-full ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          } shadow-lg`}>
            <div className={`p-4 border-b ${
              theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Resume Editor
                </h2>
              </div>
            </div>
            
            <div className="p-6 h-[calc(100vh-160px)] overflow-y-auto">
              <Editor data={data} setData={setData} />
            </div>
          </div>
        </div>

        {/* Preview Section with enhanced visuals */}
        <div className={`transition-all duration-300 ${
          isFullscreen ? 'w-full' : 'w-3/5'
        }`}>
          <div className="relative h-full">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 shadow-sm"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            <div className={`h-full ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            } shadow-lg`}>
              <div className="h-[calc(100vh-160px)] overflow-y-auto p-8 relative" id="resume-preview">
                <Preview data={data} theme={currentTheme} />
              </div>

              {!isFullscreen && (
                <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
                  theme === 'dark' ? 'border-slate-700 bg-slate-800/95' : 'border-slate-200 bg-white/95'
                } backdrop-blur-md`}>
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