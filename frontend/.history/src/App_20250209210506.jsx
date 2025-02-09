import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import  generatePdf  from 'react-to-pdf';
import Editor from './components/Editor';
import Preview from './components/Preview';

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
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
            </div>
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
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden container mx-auto px-4 py-4">
        <div className="flex rounded-lg bg-white shadow-sm p-1">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === 'edit'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === 'preview'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className={`${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Resume Details</h2>
                <p className="text-sm text-gray-600 mt-1">Fill in your information below</p>
              </div>
              <Editor data={data} setData={setData} />
            </div>
          </div>

          {/* Preview */}
          <div className={`${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Resume Preview</h2>
                <p className="text-sm text-gray-600 mt-1">This is how your resume will look</p>
              </div>
              <div className="h-[800px] overflow-y-auto" id="resume-preview">
                <Preview data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600">
            Build your professional resume with ease. Download as PDF when you're ready.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;