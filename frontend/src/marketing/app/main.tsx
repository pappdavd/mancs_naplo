import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// ThemeProvider importálása
import { ThemeProvider } from '../context/ThemeContext';

import '../styles/tailwind.css';

import MarketingApp from './MarketingApp';
import { LoginPage } from '../../app/auth/LoginPage';
import { RegisterPage } from '../../app/auth/RegisterPage';

const DashboardPlaceholder = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold text-orange-600">Üdv a MancsNaplóban! 🐶</h1>
    <p>Ez a belső felület (Dashboard) hamarosan elkészül.</p>
    <a href="/" className="text-blue-500 underline mt-4 block">Kijelentkezés</a>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {/* FONTOS: Itt öleljük át az egész appot a ThemeProvider-rel */}
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MarketingApp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPlaceholder />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);