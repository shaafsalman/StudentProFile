import React from 'react';


const InputField = ({ value, onChange, placeholder, type = "text", rows }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full p-2.0 border text-gray-950 dark:text-white border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-accent dark:focus:ring-accent transition-all duration-200"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
export default InputField;