import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Ha nincs belépve, irány a Login oldal
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Ha be van lépve, mehet a tartalom
  return <Outlet />;
};