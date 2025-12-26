import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  // 1. Ha még töltődik a user (F5 után), várunk
  if (isLoading) {
    return <div className="p-10 text-center">Jogosultság ellenőrzése...</div>;
  }

  // 2. Ha nincs bejelentkezve, irány a Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. A LÉNYEG: Ha be van lépve, DE nem admin -> Irány a Dashboard
  if (user.role !== 'admin') {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
            <ShieldAlert size={64} className="text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Hozzáférés megtagadva! ⛔</h1>
            <p className="text-gray-600 mb-6 max-w-md">
                Hoppá! Ide csak adminisztrátorok léphetnek be. 
                Te <strong>{user.role}</strong> jogosultsággal rendelkezel.
            </p>
            {/* Automatikus átirányítás vagy gomb */}
            <Navigate to="/dashboard" replace />
        </div>
    );
  }

  // 4. Ha minden oké (admin), mehet tovább
  return <Outlet />;
};