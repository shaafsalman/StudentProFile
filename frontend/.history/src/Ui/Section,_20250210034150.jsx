import React from 'react';
import { Plus } from 'lucide-react';

const Section = ({ 
  title, 
  icon: Icon, 
  children, 
  onAdd, 
  addText,
  className = ''
}) => (
  <section 
    className={`
      p-4 space-y-4 border-b border-slate-200 dark:border-slate-700 last:border-0 
      ${className}
    `}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon 
            className="h-6 w-6 text-slate-600 dark:text-slate-400 
            transition-colors group-hover:text-accent"
          />
        )}
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </h2>
      </div>
      {onAdd && (
        <button 
          onClick={onAdd} 
          className="
            flex items-center gap-2 px-3.5 py-2 rounded-lg 
            bg-accent/10 dark:bg-accent/20 
            text-accent dark:text-white 
            hover:bg-accent/20 dark:hover:bg-accent/30 
            transition-colors group
          "
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          <span className="text-sm font-medium">{addText}</span>
        </button>
      )}
    </div>
    {children}
  </section>
);

export default Section;