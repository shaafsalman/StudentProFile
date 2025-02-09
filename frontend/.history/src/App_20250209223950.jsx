import React from 'react';
import MainLayout from './components/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppConfigProvider } from './contexts/AppConfigContext';

function App() {
  return (
    <AppConfigProvider>
      <ThemeProvider>
        <div className='font-Publica'>
           <MainLayout />
        </div>
      </ThemeProvider>
    </AppConfigProvider>
  );
}

export default App;