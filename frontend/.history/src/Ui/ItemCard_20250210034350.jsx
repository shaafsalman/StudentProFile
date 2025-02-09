import React from 'react';
import { Trash2, Grip } from 'lucide-react';

const ItemCard = ({ 
  title, 
  onDelete, 
  children, 
  showDeleteButton = true,
  className = ''
}) => (
  <div 
    className={`
      relative
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700 
      rounded-xl 
      shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04)] 
      hover:shadow-[0_12px_16px_-4px_rgba(0,0,0,0.1)] 
      transition-all duration-300
      group
      ${className}
    `}
  >
    {/* Subtle Gradient Border */}
    <div className="
      absolute -inset-0.5 
      bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 
      rounded-[11px] 
      opacity-0 
      group-hover:opacity-50 
      transition-opacity
      pointer-events-none
    "></div>

    <div className="
      px-5 py-4 
      flex justify-between items-center 
      border-b border-gray-100 dark:border-gray-700
      relative z-10
    ">
      <h3 className="
        font-bold 
        text-gray-800 dark:text-gray-100 
        tracking-tight
        flex items-center gap-3
      ">
        <Grip 
          size={16} 
          className="
            text-gray-300 dark:text-gray-600 
            cursor-move 
            group-hover:text-accent 
            transition-colors
          " 
        />
        {title}
      </h3>
      {showDeleteButton && (
        <button 
          onClick={onDelete} 
          className="
            text-red-500 hover:text-red-600 
            dark:text-red-400 dark:hover:text-red-300 
            bg-red-50 dark:bg-red-950 
            p-2 rounded-full 
            hover:bg-red-100 dark:hover:bg-red-900 
            transition-colors 
            group/delete
          "
        >
          <Trash2 
            size={16} 
            className="
              group-hover/delete:rotate-12 
              transition-transform
            " 
          />
        </button>
      )}
    </div>
    <div className="p-5 pt-4">
      {children}
    </div>
  </div>
);

export default ItemCard;