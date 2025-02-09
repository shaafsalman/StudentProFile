import React from 'react';
import {  Plus } from 'lucide-react';

const Section = ({ title, icon: Icon, children, onAdd, addText }) => (
  <section className="p-4 space-y-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
        <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200">{title}</h2>
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 dark:bg-accent/70 text-accent dark:text-accent/30 rounded-lg hover:bg-accent/10 dark:hover:bg-accent/30 transition-colors">
          <Plus size={14} /> {addText}
        </button>
      )}
    </div>
    {children}
  </section>
);
export default Section;