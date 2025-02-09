// Header.jsx
import React from "react";
import { Layout } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAppConfig } from "../contexts/AppConfigContext";
import ThemeToggleButton from "../Ui/ThemeToggleButton";
import { ToolbarControls } from "./ToolbarControls";
import { ThemeSelector } from "./ThemeConfig";
import Button from "../Ui/Button";

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