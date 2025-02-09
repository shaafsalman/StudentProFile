import React, { useState } from 'react';
import { Download, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ThemeSelector, ConfigButtons } from './ThemeConfig';
import Editor from './Editor';
import Preview from './Preview';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const handleDownload = () => {
    const element = document.getElementById('resume-preview');
    element && generatePdf({
      element,
      filename: `${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
      options: { margin: 1, format: [800, 1130] },
    });
  };

  return (
    <div className={`min-h-screen w-full overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 ${
        theme === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'
      } shadow-md backdrop-blur-sm border-b ${
        theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'
      }`}>
        <div className="max-w-[2000px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <img 
              src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
              alt={appConfig.appName}
              className="h-8 w-auto transition-transform hover:scale-105"
            />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            <ConfigButtons data={data} onConfigLoad={setData} />
            <button
              onClick={handleDownload}
              disabled={!data.personalInfo.name}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:-translate-y-0.5"
            >
              <Download size={18} />
              <span className="hidden md:inline font-medium">Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex h-[calc(100vh-4rem)] pt-16">
        {/* Editor Panel */}
        <div className={`h-full transition-all duration-300 relative ${
          isEditorCollapsed ? 'w-0' : 'w-full lg:w-[45%]'
        }`}>
          <div className={`h-full ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          } border-r ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className={`h-full overflow-y-auto transition-all duration-300 ${
              isEditorCollapsed ? 'opacity-0' : 'opacity-100'
            }`}>
              <Editor 
                data={data} 
                setData={setData}
                activeSection={activeSection}
              />
            </div>
          </div>
          
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
            className={`absolute top-1/2 ${
              isEditorCollapsed ? '-right-12' : '-right-3'
            } transform -translate-y-1/2 p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg z-10 transition-all duration-300 hover:scale-110`}
          >
            {isEditorCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Preview Panel */}
        <div className={`h-full transition-all duration-300 ${
          isEditorCollapsed ? 'w-full' : 'w-[55%]'
        } ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}>
          <div className="h-full relative">
            <div className="h-full overflow-y-auto" id="resume-preview">
              <div className="max-w-4xl mx-auto p-8">
                <Preview data={data} theme={currentTheme} />
              </div>
            </div>

            <div className={`absolute bottom-6 right-6 ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            } rounded-xl shadow-lg p-4 border ${
              theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
            } transition-transform duration-300 hover:scale-105`}>
              <ThemeSelector 
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;