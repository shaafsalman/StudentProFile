import React from 'react';
import { Trash2 } from 'lucide-react';

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
      shadow-sm
      ${className}
    `}
  >
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
      ">
        {title}
      </h3>
      {showDeleteButton && (
        <button 
          onClick={onDelete} 
          className="
            text-red-500 
            dark:text-red-400 
            p-1 
            rounded 
            transition-colors 
          "
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
    <div className="p-5 pt-4">
      {children}
    </div>
  </div>
);

export default ItemCard;