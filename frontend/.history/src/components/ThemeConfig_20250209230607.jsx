import React from 'react';



// Theme selector component
export const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium  mb-2">
        Select Theme
      </label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {Object.entries(resumeThemes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemeChange(key)}
            className={`p-2 rounded border ${
              currentTheme === key
                ? 'border-blue-500 bg-blue-50 text-accent'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Config management functions
export const downloadConfig = (data) => {
  const config = JSON.stringify(data, null, 2);
  const blob = new Blob([config], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resume-config-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const ConfigButtons = ({ data, onConfigLoad }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          onConfigLoad(config);
        } catch (error) {
          console.error('Error parsing config file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => downloadConfig(data)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Save Config
      </button>
      <label className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
        Load Config
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};