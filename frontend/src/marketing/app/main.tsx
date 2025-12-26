import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// ThemeProvider importálása a teljes apphoz
import { ThemeProvider } from '../context/ThemeContext';

// Globális stílusok
import '../styles/tailwind.css';

// Oldalak és Layoutok importálása
import MarketingApp from './MarketingApp';
import { LoginPage } from '../../app/auth/LoginPage';
import { RegisterPage } from '../../app/auth/RegisterPage';
import { DashboardLayout } from '../../app/layouts/DashboardLayout';
import { DashboardPage } from '../../app/features/dashboard/DashboardPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {/* Az egész alkalmazás megkapja a Téma (Dark/Light mode) kontextust */}
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* --- PUBLIKUS OLDALAK --- */}
            <Route path="/" element={<MarketingApp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* --- VÉDETT (BELSŐ) DASHBOARD --- */}
            {/* A DashboardLayout adja a keretet (Oldalsáv / Alsó menü) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Az "index" jelentése: ez jelenik meg alapból a /dashboard címen */}
              <Route index element={<DashboardPage />} />
              
              {/* Később ide jönnek a további aloldalak, pl.: */}
              {/* <Route path="map" element={<MapPage />} /> */}
              {/* <Route path="shop" element={<ShopPage />} /> */}
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);