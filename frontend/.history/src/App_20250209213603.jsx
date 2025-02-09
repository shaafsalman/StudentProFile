import React from 'react';
import MainLayout from './components/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppConfigProvider } from './contexts/AppConfigContext';

function App() {
  return (
    <AppConfigProvider>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </AppConfigProvider>
  );
}

export default App;