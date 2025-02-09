import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  Settings, 
  Eye, 
  Edit3, 
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
  const [isLoading, setIsLoading] = useState(false);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDownload = async () => {
    setIsLoading(true);
    const element = document.getElementById('resume-preview');
    if (element) {
      try {
        await generatePdf({
          element,
          filename: `${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
          options: {
            margin: 1,
            format: [800, 1130],
          },
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
    setIsLoading(false);
  };

  const handleConfigLoad = (config) => {
    setData(config);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Fixed Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30 flex items-center px-4 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Layout size={20} />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Resume Builder</h1>
          </div>
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
          
          <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
          
          <button
            onClick={handleDownload}
            disabled={!data.personalInfo.name || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <Download size={16} />
            )}
            Export PDF
          </button>
          
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
              isSettingsOpen ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="pt-16 flex h-screen">
        {/* Left Sidebar */}
        <div
          className={`fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-200 ${
            isSidebarCollapsed ? 'w-16' : 'w-64'
          } z-20`}
        >
          <div className="flex flex-col h-full p-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Edit3 size={20} />
                {!isSidebarCollapsed && <span>Edit Resume</span>}
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Eye size={20} />
                {!isSidebarCollapsed && <span>Preview</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-200 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="h-full flex">
            {/* Editor Panel */}
            <div
              className={`w-full lg:w-1/2 ${
                activeTab === 'preview' ? 'hidden lg:block' : ''
              } bg-white dark:bg-gray-900 transition-colors duration-200`}
            >
              <div className="h-full overflow-y-auto">
                <div className="max-w-2xl mx-auto p-6">
                  <Editor data={data} setData={setData} />
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div
              className={`w-full lg:w-1/2 ${
                activeTab === 'edit' ? 'hidden lg:block' : ''
              } bg-gray-100 dark:bg-gray-800 transition-colors duration-200`}
            >
              <div className="h-full overflow-y-auto" id="resume-preview">
                <div className="max-w-[800px] mx-auto p-8">
                  <Preview data={data} theme={currentTheme} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div
          className={`fixed right-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
            isSettingsOpen ? 'translate-x-0' : 'translate-x-full'
          } z-20`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Theme Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;