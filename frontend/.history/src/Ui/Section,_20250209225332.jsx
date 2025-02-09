import React from 'react';

const Section = ({ title, icon: Icon, children, onAdd, addText }) => (
  <section className="p-4 space-y-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />}
        <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200">{title}</h2>
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
          <Plus size={14} /> {addText}
        </button>
      )}
    </div>
    {children}
  </section>
);
