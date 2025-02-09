import React, { useState, useEffect } from 'react';
import { Download, ChevronRight, ChevronLeft, Maximize2, Minimize2, Settings, Menu, X, User, Book, Briefcase, Code, Tool } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ThemeSelector, ConfigButtons } from './ThemeConfig';
import Editor from './Editor';
import Preview from './Preview';

const MainLayout = () => {
  const { theme } = useTheme();
  const appConfig = useAppConfig();
  
  const [data, setData] = useState(initialData);
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showTooltip, setShowTooltip] = useState(false);

  const navigationItems = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'bg-blue-500' },
    { id: 'education', label: 'Education', icon: Book, color: 'bg-emerald-500' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'bg-violet-500' },
    { id: 'projects', label: 'Projects', icon: Code, color: 'bg-amber-500' },
    { id: 'skills', label: 'Skills', icon: Tool, color: 'bg-rose-500' }
  ];

  const handleEditorToggle = () => {
    setIsEditorCollapsed(!isEditorCollapsed);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className={`h-screen w-screen overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      {/* Enhanced Floating Header */}
      <header className={`fixed top-4 left-4 right-4 z-50 ${
        theme === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'
      } rounded-xl shadow-lg backdrop-blur-lg border ${
        theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'
      }`}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative group cursor-pointer">
              <img 
                src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                alt={appConfig.appName}
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2 items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    activeSection === item.id
                      ? `${item.color} text-white shadow-md`
                      : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <item.icon size={18} />
                </button>
              ))}
            </div>
            <ThemeToggleButton />
            <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
            <button
              onClick={handleDownload}
              disabled={!data.personalInfo.name}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
        <div className="flex-1 flex">
          {/* Editor Panel */}
          <div className={`h-[calc(100vh-5rem)] transition-all duration-500 ${
            isEditorCollapsed ? 'w-0' : 'w-full lg:w-2/5'
          } ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} relative overflow-hidden border-r ${
            theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200/50'
          }`}>
            <div className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
              <Editor 
                data={data} 
                setData={setData}
                activeSection={activeSection}
              />
            </div>
            
            {/* Enhanced Collapse Toggle */}
            <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
              <button
                onClick={handleEditorToggle}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-110"
              >
                {isEditorCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
              {showTooltip && (
                <div className={`absolute top-full mt-2 ${isEditorCollapsed ? 'left-0' : 'right-0'} 
                  px-2 py-1 text-xs font-medium text-white bg-slate-800 rounded shadow-lg whitespace-nowrap`}>
                  {isEditorCollapsed ? 'Show Editor' : 'Hide Editor'}
                </div>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`h-[calc(100vh-5rem)] transition-all duration-500 ${
            isEditorCollapsed ? 'w-full' : 'hidden lg:block lg:w-3/5'
          } ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}>
            <div className="h-full relative">
              <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600" 
                id="resume-preview">
                <Preview data={data} theme={currentTheme} />
              </div>

              {/* Enhanced Theme Selector */}
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
      </div>
    </div>
  );
};

export default MainLayout;