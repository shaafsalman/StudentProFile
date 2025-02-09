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
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Left Panel - Editor with Header */}
      <div className={`h-full transition-all duration-300 ${
        isEditorCollapsed ? 'w-0' : 'w-[40%]'
      } relative ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} border-r ${
        theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
      }`}>
        {/* Header Section */}
        <div className={`p-4 border-b ${
          theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <img 
              src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
              alt={appConfig.appName}
              className="h-8 w-auto transition-transform hover:scale-105"
            />
            <div className="flex items-center gap-3">
              <ThemeToggleButton />
              <ConfigButtons data={data} onConfigLoad={setData} />
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={!data.personalInfo.name}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:-translate-y-0.5"
          >
            <Download size={18} />
            <span className="font-medium">Export Resume</span>
          </button>
        </div>

        {/* Editor Section */}
        <div className="h-[calc(100%-7.5rem)] overflow-y-auto">
          <Editor 
            data={data} 
            setData={setData}
            activeSection={activeSection}
          />
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

      {/* Right Panel - Preview */}
      <div className={`h-full transition-all duration-300 ${
        isEditorCollapsed ? 'w-full' : 'w-[60%]'
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
    </div>
  );
};

export default MainLayout;