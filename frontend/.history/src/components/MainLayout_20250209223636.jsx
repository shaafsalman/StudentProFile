import React, { useState, useEffect } from 'react';
import { Download, ZapOff, Zap, Palette, Sparkles, Eye, EyeOff, Command, Hexagon, Plus, X } from 'lucide-react';
import generatePdf from 'react-to-pdf';
import { useTheme } from '../contexts/ThemeContext';
import { useAppConfig } from '../contexts/AppConfigContext';
import ThemeToggleButton from '../Ui/ThemeToggleButton';
import { ThemeSelector, ConfigButtons } from './ThemeConfig';
import Editor from './Editor';
import Preview from './Preview';
import Footer from './Footer';

const initialData = {
  personalInfo: { name: '', email: '', phone: '', location: '', summary: '' },
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

const MainLayout = () => {
  const { theme } = useTheme();
  const appConfig = useAppConfig();
  
  const [data, setData] = useState(initialData);
  const [activeZone, setActiveZone] = useState('center'); // left, right, center
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [powerMode, setPowerMode] = useState(false);
  const [showCommandCenter, setShowCommandCenter] = useState(false);

  const handleDownload = () => {
    const element = document.getElementById('resume-preview');
    if (element) {
      generatePdf({
        element,
        filename: `${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
        options: { margin: 1, format: [800, 1130] },
      });
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${
      theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'
    }`}>
      {/* Hexagonal Command Center */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
        transition-all duration-700 ${showCommandCenter ? 'scale-100' : 'scale-0'}`}>
        <div className="relative">
          <div className="absolute -top-40 -left-40 w-80 h-80">
            <div className={`w-full h-full rounded-full ${
              theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
            } backdrop-blur-xl shadow-glass flex items-center justify-center`}>
              <div className="grid grid-cols-2 gap-6">
                <ThemeToggleButton />
                <ConfigButtons data={data} onConfigLoad={setData} />
                <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
                <button
                  onClick={() => setPowerMode(!powerMode)}
                  className="p-4 rounded-xl bg-accent hover:bg-accentHover text-text-light transition-all duration-300"
                >
                  {powerMode ? <ZapOff size={24} /> : <Zap size={24} />}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowCommandCenter(!showCommandCenter)}
            className="absolute -top-12 -left-12 p-6 bg-accent hover:bg-accentHover text-text-light rounded-full shadow-lg 
              transform transition-all duration-300 hover:scale-110 hover:rotate-180"
          >
            {showCommandCenter ? <X size={24} /> : <Command size={24} />}
          </button>
        </div>
      </div>

      {/* Interactive Workspace */}
      <main className="h-screen flex items-stretch">
        {/* Left Zone - Editor */}
        <div className={`flex-1 transform transition-all duration-700 ${
          activeZone === 'left' ? 'scale-100 translate-x-0' : 
          activeZone === 'center' ? '-translate-x-1/4 scale-75 opacity-50' : 
          '-translate-x-full scale-50 opacity-0'
        }`}>
          <div className={`h-full ${
            theme === 'dark' ? 'bg-card-dark/80' : 'bg-card-light/80'
          } backdrop-blur-xl p-8`}>
            <Editor data={data} setData={setData} />
          </div>
        </div>

        {/* Center Zone - Preview */}
        <div className={`flex-1 transform transition-all duration-700 ${
          activeZone === 'center' ? 'scale-110 translate-x-0' : 
          activeZone === 'left' ? 'translate-x-1/4 scale-75 opacity-50' : 
          'translate-x-1/4 scale-75 opacity-50'
        }`}>
          <div className={`h-full ${
            theme === 'dark' ? 'bg-card-dark/90' : 'bg-card-light/90'
          } backdrop-blur-xl p-8 shadow-glass`} id="resume-preview">
            <Preview data={data} theme={currentTheme} />
          </div>
        </div>

        {/* Right Zone - Actions */}
        <div className={`flex-1 transform transition-all duration-700 ${
          activeZone === 'right' ? 'scale-100 translate-x-0' : 
          activeZone === 'center' ? 'translate-x-1/4 scale-75 opacity-50' : 
          'translate-x-full scale-50 opacity-0'
        }`}>
          <div className={`h-full ${
            theme === 'dark' ? 'bg-card-dark/80' : 'bg-card-light/80'
          } backdrop-blur-xl p-8 flex flex-col gap-6`}>
            {/* Action Tiles */}
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={handleDownload}
                className="aspect-square rounded-2xl bg-accent/20 hover:bg-accent p-8 group transition-all duration-300
                  flex flex-col items-center justify-center gap-4"
              >
                <Download size={32} className="text-text-light group-hover:scale-110 transition-transform" />
                <span className="text-text-light font-medium">Export PDF</span>
              </button>
              {/* Add more action tiles here */}
            </div>
          </div>
        </div>
      </main>

      {/* Zone Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        <button
          onClick={() => setActiveZone('left')}
          className={`p-4 rounded-xl transition-all duration-300 ${
            activeZone === 'left' ? 'bg-accent text-text-light scale-110' : 
            'bg-card-dark/50 text-text-light/50 hover:bg-accent/50'
          }`}
        >
          <Edit3 size={24} />
        </button>
        <button
          onClick={() => setActiveZone('center')}
          className={`p-4 rounded-xl transition-all duration-300 ${
            activeZone === 'center' ? 'bg-accent text-text-light scale-110' : 
            'bg-card-dark/50 text-text-light/50 hover:bg-accent/50'
          }`}
        >
          <Eye size={24} />
        </button>
        <button
          onClick={() => setActiveZone('right')}
          className={`p-4 rounded-xl transition-all duration-300 ${
            activeZone === 'right' ? 'bg-accent text-text-light scale-110' : 
            'bg-card-dark/50 text-text-light/50 hover:bg-accent/50'
          }`}
        >
          <Sparkles size={24} />
        </button>
      </div>

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {powerMode && (
          <>
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-accent animate-drift`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${4 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/50 to-transparent" />
          </>
        )}
      </div>
    </div>
  );
};

export default MainLayout;