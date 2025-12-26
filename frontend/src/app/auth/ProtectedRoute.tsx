import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PawPrint } from 'lucide-react'; // Opcionális: ikon a töltőképernyőhöz

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth(); // <--- isLoading használata

  // 1. Ha még nem tudjuk, ki vagy (mert olvassuk a localStorage-t), mutassunk töltőképernyőt
  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                    <PawPrint size={32} />
                </div>
                <p className="text-gray-500 font-medium">Bejelentkezés ellenőrzése...</p>
            </div>
        </div>
    );
  }

  // 2. Ha már betöltött, és még sincs user -> Akkor tényleg Loginra küldjük
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Ha minden oké -> Mehet a tartalom
  return <Outlet />;
};