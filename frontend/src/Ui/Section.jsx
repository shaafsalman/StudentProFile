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
    relative
    bg-white dark:bg-gray-900 
    border border-gray-200 dark:border-gray-700 
    rounded-2xl 
    shadow-sm
    overflow-hidden
    mb-6
    ${className}
  `}>
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
            transition-colors 
          "
        >
          <Plus size={18} />
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
      cursor-move
    ">
      <Move size={16} />
    </div>
  </div>
);

export default Section;