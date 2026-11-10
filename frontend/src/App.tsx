import React from 'react';
import { AppProvider } from './context/AppContext';
import { MobileShell } from './components/layout/MobileShell';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MobileShell />
    </AppProvider>
  );
};

export default App;
