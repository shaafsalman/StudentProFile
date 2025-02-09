import React from 'react';
import { Plus, Move } from 'lucide-react';

const Section = ({ 
  title, 
  icon: Icon, 
  children, 
  onAdd, 
  addText,
  className = ''
}) => (
  <div className={`
    group relative
    bg-white dark:bg-gray-900 
    border border-dashed border-gray-200 dark:border-gray-700 
    rounded-2xl 
    shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] 
    hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] 
    transition-all duration-300 
    overflow-hidden
    mb-6
    ${className}
  `}>
    {/* Decorative Gradient */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent/70 to-accent/30 opacity-80 group-hover:opacity-100 transition-opacity"></div>

    {/* Section Header */}
    <div className="
      px-6 py-4 
      flex justify-between items-center 
      border-b border-gray-100 dark:border-gray-800
      bg-gray-50/50 dark:bg-gray-800/30
    ">
      <div className="flex items-center space-x-4">
        {Icon && (
          <div className="
            p-2 rounded-full 
            bg-accent/10 dark:bg-accent/20 
            text-accent
            group-hover:rotate-12 
            transition-transform
          ">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <h2 className="
          text-xl font-bold 
          text-gray-800 dark:text-gray-100
          tracking-tight
        ">
          {title}
        </h2>
      </div>

      {onAdd && (
        <button 
          onClick={onAdd} 
          className="
            flex items-center gap-2 
            px-4 py-2 
            bg-accent/10 dark:bg-accent/20 
            text-accent 
            rounded-lg 
            hover:bg-accent/20 dark:hover:bg-accent/30 
            transition-colors 
            group/add
          "
        >
          <Plus 
            className="
              group-hover/add:rotate-180 
              transition-transform 
              duration-300
            " 
            size={18} 
          />
          <span className="font-medium text-sm">{addText}</span>
        </button>
      )}
    </div>

    {/* Section Content */}
    <div className="p-6 pt-4 space-y-4">
      {children}
    </div>

    {/* Move Handle */}
    <div className="
      absolute bottom-2 right-2 
      text-gray-300 dark:text-gray-600 
      hover:text-gray-500 dark:hover:text-gray-400
      cursor-move
    ">
      <Move size={16} />
    </div>
  </div>
);

export default Section;