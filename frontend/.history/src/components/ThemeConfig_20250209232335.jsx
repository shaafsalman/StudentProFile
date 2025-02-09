import React from 'react';



// Professional resume themes following industry standards
export const resumeThemes = {
  classic: {
    name: 'Classic',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold mb-2 text-gray-900',
      contact: 'text-gray-600 space-y-1',
      sectionTitle: 'text-xl font-bold border-b-2 border-gray-300 mb-3 text-gray-800',
      sectionContainer: 'mb-6',
      itemTitle: 'font-semibold text-gray-800',
      itemSubtitle: 'text-gray-700 font-medium',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-600 mt-1',
      skills: 'bg-gray-100 px-3 py-1 rounded-full text-gray-700'
    }
  },
  modern: {
    name: 'Modern',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8',
      name: 'text-4xl font-bold mb-2 text-blue-900',
      contact: 'text-gray-700 space-y-1',
      sectionTitle: 'text-xl font-bold mb-3 text-blue-900 uppercase tracking-wider',
      sectionContainer: 'mb-6',
      itemTitle: 'font-semibold text-gray-900',
      itemSubtitle: 'text-blue-800 font-medium',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-700 mt-1',
      skills: 'bg-blue-50 px-3 py-1 rounded-md text-blue-800'
    }
  },
  minimal: {
    name: 'Minimal',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8',
      name: 'text-3xl font-light mb-2 text-gray-900',
      contact: 'text-gray-600 space-y-1',
      sectionTitle: 'text-lg font-medium mb-3 text-gray-900 uppercase',
      sectionContainer: 'mb-6',
      itemTitle: 'font-medium text-gray-900',
      itemSubtitle: 'text-gray-700',
      dates: 'text-gray-500 text-sm',
      description: 'text-gray-600 mt-1',
      skills: 'bg-gray-50 px-3 py-1 rounded-sm text-gray-700'
    }
  },
  professional: {
    name: 'Professional',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8 border-b-4 border-gray-800 pb-4',
      name: 'text-3xl font-bold mb-2 text-gray-900',
      contact: 'text-gray-700 space-y-1',
      sectionTitle: 'text-xl font-bold mb-3 text-gray-900 border-b-2 border-gray-400',
      sectionContainer: 'mb-6',
      itemTitle: 'font-bold text-gray-800',
      itemSubtitle: 'text-gray-700 font-semibold',
      dates: 'text-gray-600 text-sm',
      description: 'text-gray-600 mt-1',
      skills: 'bg-gray-200 px-3 py-1 rounded-none text-gray-800'
    }
  },
  executive: {
    name: 'Executive',
    styles: {
      container: 'p-8 bg-white max-w-[800px] mx-auto',
      header: 'mb-8 border-b border-gray-300 pb-4',
      name: 'text-4xl font-bold mb-2 text-gray-900',
      contact: 'text-gray-700 space-y-1 font-medium',
      sectionTitle: 'text-xl font-bold mb-3 text-gray-900 uppercase',
      sectionContainer: 'mb-6',
      itemTitle: 'font-bold text-gray-900',
      itemSubtitle: 'text-gray-800 font-semibold',
      dates: 'text-gray-700 text-sm font-medium',
      description: 'text-gray-700 mt-1',
      skills: 'bg-gray-100 px-4 py-2 rounded-lg text-gray-800 font-medium'
    }
  }
};