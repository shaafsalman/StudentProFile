import React from 'react';
import {  Trash2 } from 'lucide-react';


const ItemCard = ({ title, onDelete, children }) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-slate-700 dark:text-slate-300">{title}</h3>
        <button onClick={onDelete} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
      {children}
    </div>
  );
  
export default ItemCard;