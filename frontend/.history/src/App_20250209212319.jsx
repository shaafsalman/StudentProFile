import React, { useState } from 'react';
import { Download, FileText, Save, Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-white">
      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 lg:hidden">
        <button
          onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
          className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          {activeTab === 'edit' ? 'View' : 'Edit'}
        </button>
      </div>

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-16 bg-gray-900 flex flex-col items-center py-8 z-40">
        <FileText className="h-8 w-8 text-white mb-8" />
        <div className="flex-1 flex flex-col gap-6">
          <button
            onClick={() => setActiveTab('edit')}
            className={`p-3 rounded-xl transition-colors ${
              activeTab === 'edit'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="h-5 w-5" />
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`p-3 rounded-xl transition-colors ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Resume Builder</h1>
          <div className="flex items-center gap-3">
            {/* Theme Selector Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {/* Action Buttons */}
            <div className="flex gap-2">
              <ConfigButtons data={data} onConfigLoad={handleConfigLoad} />
              <button
                onClick={handleDownload}
                disabled={!data.personalInfo.name}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Theme Selector Panel */}
        <div
          className={`fixed right-0 top-16 w-72 bg-white border-l border-gray-100 h-full p-6 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } z-30`}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Theme Options</h2>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        </div>

        {/* Content Area */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Editor Panel */}
          <div
            className={`w-full lg:w-1/2 ${
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
            className={`w-full lg:w-1/2 bg-gray-50 ${
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
    </div>
  );
}

export default App;