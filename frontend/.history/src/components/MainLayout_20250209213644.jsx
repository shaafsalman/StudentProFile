import React, { useState } from 'react';
import { Download } from 'lucide-react';
import generatePdf from 'react-to-pdf';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';



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
  
  // State management
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('edit');
  const [currentTheme, setCurrentTheme] = useState('classic');

  // Handlers
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src={theme === 'dark' ? appConfig.logo_white : appConfig.logo_black} 
                alt={appConfig.appName}
                className="h-8 w-auto"
              />
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {appConfig.appName}
              </h1>
            </div>
            <div className="flex gap-2">
              <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
              <button
                onClick={handleDownload}
                disabled={!data.personalInfo.name}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden container mx-auto px-4 py-4">
        <div className={`flex rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm p-1`}>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === 'edit'
                ? 'bg-blue-100 text-blue-700'
                : theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === 'preview'
                ? 'bg-blue-100 text-blue-700'
                : theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Theme Selector */}
        <div className="mb-8">
          <ThemeSelector 
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className={`${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            <Editor data={data} setData={setData} />
          </div>

          {/* Preview */}
          <div className={`${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
            <div className="h-[800px] overflow-y-auto" id="resume-preview">
              <Preview data={data} theme={currentTheme} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;