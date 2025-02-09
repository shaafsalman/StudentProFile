import React, { useState } from 'react';
import { Download } from 'lucide-react';
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Floating Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
        theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'
      } shadow-glass`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                alt={appConfig.appName}
                className="h-8 w-auto"
              />
              <h1 className={`text-2xl font-PublicaSans font-bold ${
                theme === 'dark' ? 'text-text-light' : 'text-text-dark'
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
                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accentHover text-text-light rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                <span className="hidden md:inline">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Preview Focus */}
      <main className="container mx-auto px-6 pt-24 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Preview */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <div className="mb-4">
                <ThemeSelector 
                  currentTheme={currentTheme}
                  onThemeChange={setCurrentTheme}
                />
              </div>
              <div className={`rounded-lg shadow-glass ${
                theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'
              }`}>
                <div className="h-[800px] overflow-y-auto p-6" id="resume-preview">
                  <Preview data={data} theme={currentTheme} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Editor */}
          <div className={`lg:w-96 order-1 lg:order-2 ${isEditorOpen ? '' : 'hidden lg:block'}`}>
            <div className={`rounded-lg shadow-glass ${
              theme === 'dark' ? 'bg-card-dark' : 'bg-card-light'
            }`}>
              <div className="p-6">
                <Editor data={data} setData={setData} />
              </div>
            </div>
          </div>

          {/* Mobile Editor Toggle */}
          <button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className="fixed bottom-6 right-6 lg:hidden z-50 p-4 rounded-full bg-accent hover:bg-accentHover text-text-light shadow-lg transition-all duration-300"
          >
            {isEditorOpen ? 'Preview' : 'Edit'}
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;