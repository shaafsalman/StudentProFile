import React, { useState, useEffect } from 'react';
import { Download, Palette, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
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
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        ? 'bg-background-dark' 
        : 'bg-background-light'
    }`}>
      {/* Dynamic Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `backdrop-blur-lg ${theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'} shadow-glass` 
          : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <img 
                src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                alt={appConfig.appName}
                className="h-8 w-auto transform transition-all duration-300 group-hover:scale-110"
              />
              <h1 className={`text-2xl font-PublicaSans font-bold ${
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
                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accentHover text-text-light rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                <Download size={18} className="animate-drift" />
                <span className="hidden md:inline">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sliding Theme Panel */}
      <div className={`fixed top-1/2 -translate-y-1/2 transition-transform duration-300 z-40
        ${showThemePanel ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className={`p-4 rounded-r-lg shadow-glass ${
          theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'
        }`}>
          <button 
            onClick={() => setShowThemePanel(!showThemePanel)}
            className="absolute -right-12 top-1/2 -translate-y-1/2 p-3 rounded-r-lg bg-accent hover:bg-accentHover text-text-light transition-all duration-300"
          >
            {showThemePanel ? <ChevronLeft size={20} /> : <Palette size={20} />}
          </button>
          <ThemeSelector 
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Preview Panel */}
          <div className={`flex-1 transition-all duration-300 ${isEditorOpen ? 'lg:ml-96' : 'lg:ml-0'}`}>
            <div className="sticky top-24">
              <div className={`rounded-lg shadow-glass overflow-hidden transition-transform hover:scale-105 ${
                theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'
              }`}>
                <div className="h-[800px] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-accent scrollbar-track-primary-light" id="resume-preview">
                  <Preview data={data} theme={currentTheme} />
                </div>
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className={`fixed top-24 bottom-0 left-0 w-96 transition-transform duration-300 z-30 
            ${isEditorOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className={`h-full rounded-r-lg shadow-glass ${
              theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'
            }`}>
              <div className="p-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-primary-light">
                <Editor data={data} setData={setData} />
              </div>
            </div>
          </div>

          {/* Editor Toggle */}
          <button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent hover:bg-accentHover text-text-light shadow-lg transition-all duration-300 hover:scale-110 group"
          >
            {isEditorOpen ? <ChevronLeft size={24} /> : <Edit3 size={24} />}
            <span className="absolute right-full mr-2 whitespace-nowrap bg-accent px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {isEditorOpen ? 'Hide Editor' : 'Show Editor'}
            </span>
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;