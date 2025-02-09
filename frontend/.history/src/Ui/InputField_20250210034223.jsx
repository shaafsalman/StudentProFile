import React from 'react';

const InputField = ({ 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  className = '',
  rows,
  ...props 
}) => {
  // If rows is provided, render a textarea
  if (rows) {
    return (
      <textarea
        placeholder={placeholder}
        className={`
          w-full p-2.5 rounded-lg border 
          text-gray-950 dark:text-white 
          border-slate-200 dark:border-slate-700 
          bg-white dark:bg-slate-800 
          focus:ring-2 focus:ring-accent 
          dark:focus:ring-accent 
          transition-all duration-200 
          resize-none
          ${className}
        `}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    );
  }

  // Otherwise, render a standard input
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        w-full p-2.5 rounded-lg border 
        text-gray-950 dark:text-white 
        border-slate-200 dark:border-slate-700 
        bg-white dark:bg-slate-800 
        focus:ring-2 focus:ring-accent 
        dark:focus:ring-accent 
        transition-all duration-200
        ${className}
      `}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
};

export default InputField;