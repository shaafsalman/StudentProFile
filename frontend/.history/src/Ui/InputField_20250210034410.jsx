import React, { useState } from 'react';

const InputField = ({ 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  className = '',
  rows,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = `
    w-full 
    px-3.5 py-2.5 
    rounded-lg 
    border 
    text-gray-900 dark:text-white 
    border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-800 
    transition-all duration-300
    outline-none
  `;

  const focusClasses = `
    ${isFocused 
      ? 'border-accent ring-2 ring-accent/30 dark:ring-accent/40' 
      : 'hover:border-gray-400 dark:hover:border-gray-500'
    }
  `;

  const commonProps = {
    value,
    placeholder,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: `${baseClasses} ${focusClasses} ${className}`,
    onChange: (e) => onChange(e.target.value),
    ...props
  };

  if (rows) {
    return (
      <textarea
        {...commonProps}
        rows={rows}
        className={`${commonProps.className} resize-none`}
      />
    );
  }

  return <input type={type} {...commonProps} />;
};

export default InputField;