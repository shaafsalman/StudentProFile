import React, { useState, useEffect } from 'react';
import { Download, Palette, Edit3, Eye, EyeOff, Grid, Menu, X, Zap, Sparkles, Layers } from 'lucide-react';
import generatePdf from 'react-to-pdf';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
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
  
  const [data, setData] = useState(initialData);
  const [viewMode, setViewMode] = useState('split'); // split, preview, edit
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUI, setShowUI] = useState(true);

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
    <div className={`min-h-screen overflow-hidden ${
      theme === 'dark' 
        ? 'bg-background-dark' 
        : 'bg-background-light'
    }`}>
      {/* Radial Navigation Menu */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        menuOpen ? 'scale-100' : 'scale-0'
      }`}>
        <div className="relative">
          {/* Circular Menu Items */}
          <div className="absolute -top-32 -left-32 w-64 h-64">
            <div className="relative w-full h-full">
              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={!data.personalInfo.name}
                className="absolute top-0 left-1/2 -translate-x-1/2 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-accent hover:bg-accentHover text-text-light p-4 rounded-2xl shadow-lg flex items-center gap-2">
                  <Download size={20} />
                  <span>Export</span>
                </div>
              </button>
              
              {/* View Mode Toggle */}
              <button
                onClick={() => setViewMode(viewMode === 'split' ? 'preview' : viewMode === 'preview' ? 'edit' : 'split')}
                className="absolute top-1/4 right-0 transform hover:-translate-x-2 transition-all duration-300"
              >
                <div className="bg-accent hover:bg-accentHover text-text-light p-4 rounded-2xl shadow-lg flex items-center gap-2">
                  <Grid size={20} />
                  <span>{viewMode === 'split' ? 'Preview' : viewMode === 'preview' ? 'Edit' : 'Split'}</span>
                </div>
              </button>
              
              {/* Theme Toggle */}
              <button className="absolute bottom-1/4 right-0 transform hover:-translate-x-2 transition-all duration-300">
                <div className="bg-accent hover:bg-accentHover text-text-light p-4 rounded-2xl shadow-lg">
                  <ThemeToggleButton />
                </div>
              </button>
              
              {/* UI Toggle */}
              <button
                onClick={() => setShowUI(!showUI)}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 transform hover:translate-y-2 transition-all duration-300"
              >
                <div className="bg-accent hover:bg-accentHover text-text-light p-4 rounded-2xl shadow-lg flex items-center gap-2">
                  {showUI ? <EyeOff size={20} /> : <Eye size={20} />}
                  <span>{showUI ? 'Hide UI' : 'Show UI'}</span>
                </div>
              </button>
              
              {/* Config */}
              <button className="absolute top-1/4 left-0 transform hover:translate-x-2 transition-all duration-300">
                <div className="bg-accent hover:bg-accentHover text-text-light p-4 rounded-2xl shadow-lg">
                  <ConfigButtons data={data} onConfigLoad={(config) => setData(config)} />
                </div>
              </button>
            </div>
          </div>
          
          {/* Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute -top-8 -left-8 p-4 bg-accent hover:bg-accentHover text-text-light rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-110"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Floating Theme Selector */}
      {showUI && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
          viewMode === 'preview' ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className={`p-3 rounded-2xl backdrop-blur-xl ${
            theme === 'dark' ? 'bg-card-dark/70' : 'bg-card-light/70'
          } shadow-glass`}>
            <ThemeSelector 
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="h-screen flex items-center justify-center p-8">
        <div className={`w-full h-full flex gap-8 transition-all duration-500 ${
          viewMode === 'preview' ? 'scale-110' : viewMode === 'edit' ? 'scale-90' : 'scale-100'
        }`}>
          {/* Editor Panel */}
          <div className={`transition-all duration-500 ${
            viewMode === 'preview' ? 'w-0 opacity-0' : 
            viewMode === 'split' ? 'w-1/2' : 'w-full'
          }`}>
            {(viewMode === 'split' || viewMode === 'edit') && (
              <div className={`h-full rounded-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
              } backdrop-blur-xl shadow-glass`}>
                <div className="p-8 h-full overflow-y-auto">
                  <Editor data={data} setData={setData} />
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className={`transition-all duration-500 ${
            viewMode === 'edit' ? 'w-0 opacity-0' : 
            viewMode === 'split' ? 'w-1/2' : 'w-full'
          }`}>
            {(viewMode === 'split' || viewMode === 'preview') && (
              <div className={`h-full rounded-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
              } backdrop-blur-xl shadow-glass transform transition-transform hover:scale-[1.02]`}>
                <div className="h-full overflow-y-auto p-8" id="resume-preview">
                  <Preview data={data} theme={currentTheme} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-accent/5' : 'bg-accent/10'
        } blur-3xl animate-drift`}></div>
        <div className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-primary-dark/10' : 'bg-primary-light/20'
        } blur-3xl animate-drift`}></div>
      </div>
    </div>
  );
};

export default MainLayout;