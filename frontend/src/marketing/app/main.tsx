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

// Dashboard oldalak
import { DashboardPage } from '../../app/features/dashboard/DashboardPage'; 
import { ProfilePage } from '../../app/features/dashboard/profile/ProfilePage';
import { ShopPage } from '../../app/features/dashboard/shop/ShopPage';
import { SchoolPage } from '../../app/features/dashboard/school/SchoolPage';
import { MapPage } from '../../app/features/dashboard/map/MapPage';

// Auth Context és Route Védelem
import { AuthProvider } from '../../app/context/AuthContext';
import { ProtectedRoute } from '../../app/auth/ProtectedRoute';
import { AdminRoute } from '../../app/auth/AdminRoute'; // <--- ADMIN VÉDELEM IMPORT

// Admin Layout és Oldalak
import { AdminLayout } from '../../app/layouts/AdminLayout';
import { AdminProductsPage } from '../../app/features/admin/products/AdminProductsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        {/* A teljes app megkapja az AuthContextet */}
        <AuthProvider> 
            <BrowserRouter>
              <Routes>
                
                {/* --- PUBLIKUS OLDALAK --- */}
                <Route path="/" element={<MarketingApp />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* --- VÉDETT ÚTVONALAK (Bejelentkezés szükséges) --- */}
                <Route element={<ProtectedRoute />}>
                    
                    {/* USER DASHBOARD */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route index element={<DashboardPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="shop" element={<ShopPage />} />
                      <Route path="school" element={<SchoolPage />} />
                      <Route path="map" element={<MapPage />} />
                    </Route>

                    {/* ADMIN DASHBOARD (Dupla védelem: Login + Admin jog) */}
                    <Route element={<AdminRoute />}> {/* <--- ITT A VÉDELEM */}
                        <Route path="/admin" element={<AdminLayout />}>
                          {/* Placeholder a főoldalra */}
                          <Route index element={<div className="p-10 text-gray-500 font-medium">Üdv az Admin felületen! Válassz a menüből. ⬅️</div>} /> 
                          <Route path="products" element={<AdminProductsPage />} />
                        </Route>
                    </Route>

                </Route>

              </Routes>
            </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);