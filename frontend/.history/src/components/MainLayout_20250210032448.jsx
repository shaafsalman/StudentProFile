// MainLayout.jsx
import React, { useState, useRef } from "react";
import generatePdf from "react-to-pdf";
import Editor from "./Editor";
import Preview from "./Preview";
import Header from "./Header";

const MainLayout = () => {
  const targetRef = useRef();

  const [data, setData] = useState({
    personalInfo: { name: "", email: "", phone: "", location: "", summary: "" },
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });

  const [currentTheme, setCurrentTheme] = useState("classic");
  const [currentFont, setCurrentFont] = useState('font-["Publica"]');
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
      <Header
        data={data}
        setData={setData}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        currentFont={currentFont}
        setCurrentFont={setCurrentFont}
        currentAccentColor={currentAccentColor}
        setCurrentAccentColor={setCurrentAccentColor}
        isEditorCollapsed={isEditorCollapsed}
        setIsEditorCollapsed={setIsEditorCollapsed}
        handleDownload={handleDownload}
        isExporting={isExporting}
      />

      {/* Main Layout */}
      <div className="h-full w-full flex overflow-hidden pt-[4.5rem]">
        {/* Editor Panel */}
        <div 
          className={`h-full transition-all duration-300 relative flex flex-col
            ${isEditorCollapsed ? "w-0 opacity-0" : "w-[35%] opacity-100"}
          `}
        >
          <Editor data={data} setData={setData} />
        </div>

        {/* Preview Section */}
        <div 
          className={`h-full transition-all duration-300 relative
            ${isEditorCollapsed ? "w-full" : "w-[65%]"}
          `}
        >
          <div className="h-full flex flex-col">
            <div className="flex-grow overflow-y-auto scrollbar-hidden">
              <div className={`max-w-4xl mx-auto ${currentFont}`} ref={targetRef}>
                <Preview 
                  data={data} 
                  theme={currentTheme} 
                  accentColor={currentAccentColor} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;