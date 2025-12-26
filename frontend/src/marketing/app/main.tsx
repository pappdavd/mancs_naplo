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

// Fontos: Itt már a helyes, mappába rendezett útvonalat használjuk
import { DashboardPage } from '../../app/features/dashboard/DashboardPage'; 
import { ProfilePage } from '../../app/features/dashboard/profile/ProfilePage';
import { ShopPage } from '../../app/features/dashboard/shop/ShopPage';
import { SchoolPage } from '../../app/features/dashboard/school/SchoolPage';
import { MapPage } from '../../app/features/dashboard/map/MapPage';

import { AuthProvider } from '../../app/context/AuthContext'; // <--- ÚJ
import { ProtectedRoute } from '../../app/auth/ProtectedRoute'; // <--- ÚJ


import { AdminLayout } from '../../app/layouts/AdminLayout';
import { AdminProductsPage } from '../../app/features/admin/products/AdminProductsPage';

// Egy egyszerű placeholder a fő admin dashboardhoz (hogy ne legyen üres)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        {/* A teljes app megkapja az AuthContextet */}
        <AuthProvider> 
            <BrowserRouter>
              <Routes>
                
                {/* Publikus oldalak */}
                <Route path="/" element={<MarketingApp />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* --- VÉDETT ÚTVONALAK --- */}
                <Route element={<ProtectedRoute />}>
                    
                    {/* User Dashboard */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route index element={<DashboardPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="shop" element={<ShopPage />} />
                      <Route path="school" element={<SchoolPage />} />
                      <Route path="map" element={<MapPage />} />
                    </Route>

                    {/* Admin Dashboard */}
                    <Route path="/admin" element={<AdminLayout />}>
                      {/* Ide akár tehetnénk egy extra ellenőrzést, hogy user.role === 'admin' */}
                      <Route index element={<div>Admin Home</div>} /> 
                      <Route path="products" element={<AdminProductsPage />} />
                    </Route>

                </Route>

              </Routes>
            </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);