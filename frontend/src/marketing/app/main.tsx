import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import MarketingApp from './MarketingApp';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/tailwind.css'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <MarketingApp />
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}