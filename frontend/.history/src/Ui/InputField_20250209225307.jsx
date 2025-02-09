import React from 'react';


const InputField = ({ value, onChange, placeholder, type = "text", rows }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
export default InputField;