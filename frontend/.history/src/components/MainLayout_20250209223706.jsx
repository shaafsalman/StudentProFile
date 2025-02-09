import React, { useState, useEffect } from 'react';
import { Download, Palette, ChevronLeft, ChevronRight, Edit3, Maximize2, Minimize2, Settings, Eye, EyeOff } from 'lucide-react';
import generatePdf from 'react-to-pdf';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ThemeSelector, ConfigButtons } from './ThemeConfig';
import Editor from './Editor';
import Preview from './Preview';
import Footer from './Footer';

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
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

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
      theme === 'dark' 
        ? 'bg-gradient-to-br from-background-dark via-primary-dark to-background-dark' 
        : 'bg-gradient-to-br from-background-light via-primary-light/5 to-background-light'
    }`}>
      {/* Floating Action Center */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        showControls ? 'translate-y-0' : '-translate-y-24'
      }`}>
        <div className={`flex items-center gap-2 p-2 rounded-lg backdrop-blur-lg ${
          theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
        } shadow-glass`}>
          <div className="flex items-center gap-3 px-3">
            <img 
              src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
              alt={appConfig.appName}
              className="h-8 w-auto"
            />
            <span className={`text-lg font-PublicaSans font-bold ${
              theme === 'dark' ? 'text-text-light' : 'text-text-dark'
            }`}>
              {appConfig.appName}
            </span>
          </div>

          <div className="h-8 w-px bg-accent/20"></div>

          <ThemeToggleButton />
          <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-md hover:bg-accent/10 transition-colors"
          >
            {isFullscreen ? 
              <Minimize2 size={20} className="text-accent" /> : 
              <Maximize2 size={20} className="text-accent" />
            }
          </button>

          <button
            onClick={handleDownload}
            disabled={!data.personalInfo.name}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accentHover text-text-light rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} className="animate-drift" />
            <span className="hidden md:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Show/Hide Controls Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full bg-accent hover:bg-accentHover text-text-light shadow-lg transition-all duration-300 ${
          showControls ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        }`}
      >
        {showControls ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>

      {/* Main Workspace */}
      <main className={`transition-all duration-300 ${
        isFullscreen ? 'pt-4' : 'pt-24'
      } pb-8`}>
        <div className="flex min-h-screen">
          {/* Editor Panel - Left Side */}
          <div className={`fixed left-0 top-0 h-full w-96 transition-transform duration-300 z-30 ${
            isEditorOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
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
                  <button
                    onClick={() => setIsEditorOpen(false)}
                    className="p-2 rounded-md hover:bg-accent/10 transition-colors"
                  >
                    <ChevronLeft size={20} className="text-accent" />
                  </button>
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
                <Editor data={data} setData={setData} />
              </div>
            </div>
          </div>

          {/* Preview Area - Center/Right */}
          <div className={`flex-1 transition-all duration-300 ${
            isEditorOpen ? 'ml-96' : 'ml-0'
          }`}>
            {/* Theme Selector Bar */}
            <div className={`fixed top-24 right-6 z-40 transition-all duration-300 ${
              isFullscreen ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
              } backdrop-blur-lg shadow-glass`}>
                <ThemeSelector 
                  currentTheme={currentTheme}
                  onThemeChange={setCurrentTheme}
                />
              </div>
            </div>

            {/* Preview Content */}
            <div className={`mx-auto transition-all duration-300 ${
              isFullscreen ? 'container px-4' : 'max-w-4xl px-6'
            }`}>
              <div className={`rounded-lg overflow-hidden ${
                theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
              } backdrop-blur-lg shadow-glass transition-transform hover:scale-[1.01]`}>
                <div className="h-[800px] overflow-y-auto p-8" id="resume-preview">
                  <Preview data={data} theme={currentTheme} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Toggle Button - Mobile/Tablet */}
        {!isEditorOpen && (
          <button
            onClick={() => setIsEditorOpen(true)}
            className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-accent hover:bg-accentHover text-text-light shadow-lg transition-all duration-300 lg:hidden"
          >
            <Edit3 size={24} />
          </button>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;