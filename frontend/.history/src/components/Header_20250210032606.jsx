// Header.jsx
import React from "react";
import { Layout } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAppConfig } from "../contexts/AppConfigContext";
import ThemeToggleButton from "../Ui/ThemeToggleButton";
import { ToolbarControls } from "./ToolbarControls";
import { ThemeSelector } from "./ThemeConfig";
import Button from "../Ui/Button";
import { Check, ChevronDown } from 'lucide-react';



const ThemeSelector = ({ currentTheme, onThemeChange, currentFont, onFontChange, currentAccentColor, onAccentColorChange }) => {
    const [menuOpen, setMenuOpen] = useState({ theme: false, font: false, color: false });
    const [fontMenuOpen, setFontMenuOpen] = useState(false), [colorMenuOpen, setColorMenuOpen] = useState(false);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.menu-container')) setMenuOpen({ theme: false, font: false, color: false });
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    return (
      <div className="flex items-center space-x-4 ">
      {/* CV Theme Selector */}
      <div className="relative menu-container">
        <button onClick={() => setMenuOpen({ ...menuOpen, theme: !menuOpen.theme })} className="flex items-center ">
          <span className="font-medium">CV Theme</span> <ChevronDown size={18} className="ml-2" />
        </button>
        {menuOpen.theme && (
          <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
            {Object.entries(resumeThemes).map(([key, theme]) => (
              <button key={key} onClick={() => onThemeChange(key)} className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 ${currentTheme === key ? 'bg-accent text-white' : 'text-gray-800'}`}>
                {theme.name} {currentTheme === key && <Check size={14} className="inline ml-2" />}
              </button>
            ))}
          </div>
        )}
      </div>
  
      {/* Font Selector */}
      <div className="relative menu-container">
        <button onClick={() => setMenuOpen({ ...menuOpen, font: !menuOpen.font })} className="flex items-center ">
          <span className={`${currentFont} font-medium text-base`}>Font</span> <ChevronDown size={18} className="ml-2" />
        </button>
        {menuOpen.font && (
          <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
            {fontOptions.map(font => (
              <button key={font.value} onClick={() => onFontChange(font.value)} className={`block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-200 ${currentFont === font.value ? 'bg-accent text-white' : 'text-gray-800'} ${font.value}`}>
                {font.name} {currentFont === font.value && <Check size={14} className="inline ml-2" />}
              </button>
            ))}
          </div>
        )}
      </div>
  
      {/* Color Selector */}
      <div className="relative menu-container">
        <button onClick={() => setMenuOpen({ ...menuOpen, color: !menuOpen.color })} className="flex items-center ">
          <div className={`w-6 h-6 rounded-full border-2 ${currentAccentColor} mr-2`} /> <span className="font-medium">Color</span> <ChevronDown size={18} className="ml-2" />
        </button>
        {menuOpen.color && (
          <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 flex flex-wrap gap-2">
            {accentColorOptions.map(color => (
              <button key={color.value} onClick={() => onAccentColorChange(color.value)} className={`w-8 h-8 rounded-full border-2 hover:shadow-md ${color.value} ${currentAccentColor === color.value ? 'border-black shadow-md' : 'border-gray-300'}`} />
            ))}
          </div>
        )}
      </div>
    </div>
    );
  };

const Header = ({
  data,
  setData,
  currentTheme,
  setCurrentTheme,
  currentFont,
  setCurrentFont,
  currentAccentColor,
  setCurrentAccentColor,
  isEditorCollapsed,
  setIsEditorCollapsed,
  handleDownload,
  isExporting
}) => {
  const { theme } = useTheme();
  const appConfig = useAppConfig();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          {/* Left Section: Logo & App Name */}
          <div className="flex items-center gap-4">
            <img 
              src={theme === "dark" ? appConfig.logo_white : appConfig.logo_black} 
              alt={appConfig.appName} 
              className="h-8 w-auto transition-all duration-200 hover:opacity-80"
            />
            <h1 className="text-lg font-semibold tracking-tight">{appConfig.appName}</h1>
          </div>

          {/* Center Section: Editor Toggle */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Button
              variant="ghost"
              size="sm"
              icon={Layout}
              onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isEditorCollapsed ? "Show Editor" : "Hide Editor"}
            </Button>
          </div>

          {/* Right Section: Controls */}
          <div className="flex items-center gap-4">
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
              currentFont={currentFont}
              onFontChange={setCurrentFont}
              currentAccentColor={currentAccentColor}
              onAccentColorChange={setCurrentAccentColor}
            />
            
            <ToolbarControls
              data={data}
              onConfigLoad={setData}
              onExport={handleDownload}
              isExporting={isExporting}
              onToggleEditor={() => setIsEditorCollapsed(!isEditorCollapsed)}
              isDisabled={!data.personalInfo.name}
            />
            
            <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />
            
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;