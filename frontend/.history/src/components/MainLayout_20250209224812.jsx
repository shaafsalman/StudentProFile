import React, { useState } from 'react';
import { Download, ChevronRight, ChevronLeft, Maximize2, Minimize2, Settings, Menu, X, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
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
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

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

  const navigationItems = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' }
  ];

  return (
    <div className={`h-screen w-screen overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      {/* Floating Header */}
      <header className={`fixed top-4 left-4 right-4 z-50 ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
      } rounded-xl shadow-lg border ${
        theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
      }`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <img 
              src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
              alt={appConfig.appName}
              className="h-8 w-auto"
            />
          </div>

          <div className="flex items-center gap-3">
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

      {/* Main Content */}
      <div className="h-full pt-20 flex">
       

        {/* Dynamic Content Area */}
        <div className="flex-1 lg:ml-64">
          <div className="h-full flex">
            {/* Editor Panel */}
            <div className={`h-[calc(100vh-5rem)] transition-all duration-300 ${
              isEditorCollapsed ? 'w-0' : 'w-full lg:w-2/5'
            } ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} relative overflow-hidden`}>
              <div className="h-full overflow-y-auto p-6">
                <Editor 
                  data={data} 
                  setData={setData}
                  activeSection={activeSection}
                />
              </div>
              
              {/* Collapse Toggle */}
              <button
                onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
                className="absolute top-1/2 -right-3 transform -translate-y-1/2 p-2 rounded-full bg-indigo-600 text-white shadow-lg z-10"
              >
                {isEditorCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>

            {/* Preview Panel */}
            <div className={`h-[calc(100vh-5rem)] transition-all duration-300 ${
              isEditorCollapsed ? 'w-full' : 'hidden lg:block lg:w-3/5'
            } ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <div className="h-full relative">
                <div className="h-full overflow-y-auto p-8" id="resume-preview">
                  <Preview data={data} theme={currentTheme} />
                </div>

                {/* Theme Selector Floating Panel */}
                <div className={`absolute bottom-4 right-4 ${
                  theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                } rounded-lg shadow-lg p-4 border ${
                  theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
                }`}>
                  <ThemeSelector 
                    currentTheme={currentTheme}
                    onThemeChange={setCurrentTheme}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;