import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  Settings, 
  Eye, 
  Edit2, 
  Save, 
  Upload,
  ChevronLeft,
  Layout,
  Moon,
  Sun
} from 'lucide-react';
import generatePdf from 'react-to-pdf';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { ThemeSelector, ConfigButtons } from './components/ThemeConfig';

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

function App() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('edit');
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Improved Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-40
          ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            {!isSidebarCollapsed && (
              <span className="text-lg font-semibold text-gray-800 dark:text-white">Resume Builder</span>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className={`h-5 w-5 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <div className="space-y-2 px-3">
              <button
                onClick={() => setActiveTab('edit')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${activeTab === 'edit' 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <Edit2 className="h-5 w-5" />
                {!isSidebarCollapsed && <span>Edit Resume</span>}
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${activeTab === 'preview' 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <Eye className="h-5 w-5" />
                {!isSidebarCollapsed && <span>Preview</span>}
              </button>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <div className="space-y-2">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 
                  dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="h-5 w-5" />
                {!isSidebarCollapsed && <span>Settings</span>}
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 
                  dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {!isSidebarCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Bar */}
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {activeTab === 'edit' ? 'Edit Resume' : 'Preview Resume'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
              <button
                onClick={handleDownload}
                disabled={!data.personalInfo.name}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h2>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Theme</h3>
                  <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Editor Panel */}
          <div
            className={`w-full lg:w-1/2 bg-white dark:bg-gray-900 ${
              activeTab === 'preview' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="h-full overflow-y-auto">
              <div className="max-w-2xl mx-auto px-6 py-8">
                <Editor data={data} setData={setData} />
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div
            className={`w-full lg:w-1/2 bg-gray-50 dark:bg-gray-800 ${
              activeTab === 'edit' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="h-full overflow-y-auto" id="resume-preview">
              <div className="max-w-[800px] mx-auto p-8">
                <Preview data={data} theme={currentTheme} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button
          onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
          className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center 
            hover:bg-blue-700 transition-colors"
        >
          {activeTab === 'edit' ? <Eye className="h-6 w-6" /> : <Edit2 className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}

export default App;