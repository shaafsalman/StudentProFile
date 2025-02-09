import React from 'react';
import MainLayout from './components/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppConfigProvider } from './contexts/AppConfigContext';

function App() {
  return (
    <AppConfigProvider>
      <ThemeProvider>
        <div className='font-Publica bg-background dark:bg-slate-900'>
           <MainLayout />
        </div>
      </ThemeProvider>
    </AppConfigProvider>
  );
}

export default App;