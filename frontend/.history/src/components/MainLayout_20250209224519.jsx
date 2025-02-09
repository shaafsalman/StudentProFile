import React, { useState, useEffect } from 'react';
import { Download, ChevronRight, ChevronLeft,User, Maximize2, Minimize2, Settings, Menu, X, PanelLeftOpen, PanelLeftClose, Plus, Star, Mail, Phone, MapPin, Book, Briefcase, Code } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [progress, setProgress] = useState(0);

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

  // Calculate completion progress
  useEffect(() => {
    const totalFields = Object.keys(data.personalInfo).length + 
      data.education.length + data.experience.length + 
      data.projects.length + data.skills.length;
    const filledFields = Object.values(data.personalInfo).filter(Boolean).length +
      data.education.length + data.experience.length +
      data.projects.length + data.skills.length;
    setProgress((filledFields / totalFields) * 100);
  }, [data]);

  const navigationItems = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'bg-purple-500' },
    { id: 'education', label: 'Education', icon: Book, color: 'bg-blue-500' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'bg-green-500' },
    { id: 'projects', label: 'Projects', icon: Code, color: 'bg-yellow-500' },
    { id: 'skills', label: 'Skills', icon: Code, color: 'bg-red-500' }
  ];

  return (
    <div className={`h-screen w-screen overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* Dynamic Header with Progress */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className={`h-1 bg-gray-200 dark:bg-gray-700`}>
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={`px-6 py-4 ${
          theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'
        } backdrop-blur-lg border-b ${
          theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img 
                  src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                  alt={appConfig.appName}
                  className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Resume Progress:
                </span>
                <span className={`text-sm font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  showPreview 
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <ThemeToggleButton />
              <button
                onClick={handleDownload}
                disabled={!data.personalInfo.name}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Download size={18} />
                <span className="font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Dynamic Sections */}
      <main className="h-full pt-20">
        <div className="flex h-full">
          {/* Animated Navigation */}
          <nav className={`w-24 md:w-64 h-full ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          } border-r ${
            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : `hover:bg-slate-100 dark:hover:bg-slate-700 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`
                  }`}
                >
                  <div className={`flex-shrink-0 p-2 rounded-lg ${
                    activeSection === item.id
                      ? 'bg-white/20'
                      : item.color + ' bg-opacity-10'
                  }`}>
                    <item.icon size={20} className={activeSection === item.id ? 'text-white' : ''} />
                  </div>
                  <span className="hidden md:block font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRight size={16} className="hidden md:block ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Dynamic Content Area */}
          <div className="flex-1 flex">
            {/* Editor Panel */}
            <div className={`w-full lg:w-1/2 h-full ${
              theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
            } overflow-y-auto`}>
              <div className="max-w-2xl mx-auto p-6">
                <Editor 
                  data={data} 
                  setData={setData}
                  activeSection={activeSection}
                />
              </div>
            </div>

            {/* Preview Panel with Animation */}
            <div className={`fixed top-20 right-0 bottom-0 w-1/2 transform transition-transform duration-500 ${
              showPreview ? 'translate-x-0' : 'translate-x-full'
            } ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} border-l ${
              theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
            } shadow-2xl`}>
              <div className="h-full relative">
                <div className="h-full overflow-y-auto p-8" id="resume-preview">
                  <Preview data={data} theme={currentTheme} />
                </div>
                
                {/* Floating Theme Selector */}
                <div className={`absolute bottom-6 right-6 p-4 rounded-2xl ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                } shadow-xl border ${
                  theme === 'dark' ? 'border-slate-600' : 'border-slate-200'
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
      </main>
    </div>
  );
};

export default MainLayout;