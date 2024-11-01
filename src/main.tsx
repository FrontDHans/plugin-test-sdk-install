import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { FrontContextProvider } from './providers/FrontProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FrontContextProvider>
      <App />
    </FrontContextProvider>
  </StrictMode>
);
