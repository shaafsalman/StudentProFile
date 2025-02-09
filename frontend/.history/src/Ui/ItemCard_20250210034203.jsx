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
      p-4 bg-card-dark/5 dark:bg-card-dark/10 
      rounded-xl border border-slate-200 dark:border-slate-700 
      space-y-4 shadow-sm hover:shadow-md 
      transition-all duration-300
      ${className}
    `}
  >
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
        {title}
      </h3>
      {showDeleteButton && (
        <button 
          onClick={onDelete} 
          className="
            text-red-500 hover:text-red-600 
            dark:text-red-400 dark:hover:text-red-300 
            transition-colors 
            hover:bg-red-50 dark:hover:bg-red-950 
            p-1.5 rounded-full
          "
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
    {children}
  </div>
);

export default ItemCard;