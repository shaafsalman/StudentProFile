import React, { useState, useRef } from "react";
import { PanelLeft } from "lucide-react";
import { useAppConfig } from "../contexts/AppConfigContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggleButton from "../Ui/ThemeToggleButton";
import { ToolbarControls } from "./ToolbarControls";
import { ThemeSelector } from "./ThemeConfig";
import Editor from "./Editor";
import Preview from "./Preview";
import Button from "../Ui/Button";
import generatePdf from "react-to-pdf";

const MainLayout = () => {
  const appConfig = useAppConfig();
  const { theme } = useTheme();
  const targetRef = useRef();

  const [data, setData] = useState({
    personalInfo: { name: "", email: "", phone: "", location: "", summary: "" },
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });

  const [currentTheme, setCurrentTheme] = useState("classic");
  const [currentFont, setCurrentFont] = useState('font-["Inter"]');
  const [currentAccentColor, setCurrentAccentColor] = useState("text-blue-900 border-blue-500 bg-blue-50");
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    try {
      generatePdf(() => targetRef.current, {
        filename: `${data.personalInfo.name || "resume"}-${Date.now()}.pdf`,
        method: "save",
        resolution: 2,
        page: { margin: 10, format: "a4", orientation: "portrait" },
      });
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo & App Name */}
          <div className="flex items-center gap-4">
            <img src={theme === "dark" ? appConfig.logo_white : appConfig.logo_black} alt={appConfig.appName} className="h-8 w-auto" />
            <h1 className="text-lg font-semibold">{appConfig.appName}</h1>
          </div>

          {/* Theme Selector */}
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
            currentFont={currentFont}
            onFontChange={setCurrentFont}
            currentAccentColor={currentAccentColor}
            onAccentColorChange={setCurrentAccentColor}
          />

          {/* Toolbar Controls */}
          <ToolbarControls
            data={data}
            onConfigLoad={setData}
            onExport={handleDownload}
            isExporting={isExporting}
            onToggleEditor={() => setIsEditorCollapsed(!isEditorCollapsed)}
            isDisabled={!data.personalInfo.name}
          />
        </div>
      </header>

      {/* Main Layout */}
      <div className="h-full w-full flex overflow-hidden pt-[4rem]">
        {/* Editor Panel */}
        <div className={`h-full transition-all duration-300 relative flex flex-col ${isEditorCollapsed ? "w-0 opacity-0" : "w-[35%] opacity-100"}`}>
          <Editor data={data} setData={setData} />
        </div>

        {/* Preview Section */}
        <div className={`h-full transition-all duration-300 relative ${isEditorCollapsed ? "w-full" : "w-[65%]"}`}>
          <div className="h-full flex flex-col">
            <div className="flex-grow overflow-y-auto scrollbar-hidden">
              <div className={`max-w-4xl mx-auto ${currentFont}`} ref={targetRef}>
                <Preview data={data} theme={currentTheme} accentColor={currentAccentColor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
