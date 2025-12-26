import { Outlet, Link, useLocation } from 'react-router-dom'; // React import törölve
import { Home, Map, GraduationCap, ShoppingBag, User } from 'lucide-react';
import MancsLogo from '../../marketing/shared/components/MancsLogo';

export const DashboardLayout = () => {
    // ... a kód többi része változatlan ...
    const location = useLocation();

    const navItems = [
      { icon: Home, label: 'Főoldal', path: '/dashboard' },
      { icon: Map, label: 'Térkép', path: '/dashboard/map' },
      { icon: GraduationCap, label: 'Suli', path: '/dashboard/school' },
      { icon: ShoppingBag, label: 'Shop', path: '/dashboard/shop' },
      { icon: User, label: 'Profil', path: '/dashboard/profile' },
    ];
  
    const isActive = (path: string) => location.pathname === path;
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        
        {/* --- DESKTOP SIDEBAR (Bal oldali sáv) --- */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
          <div className="p-6 flex items-center gap-2 border-b border-gray-100">
             <MancsLogo className="w-8 h-8 text-orange-600" />
             <span className="text-xl font-bold text-gray-800">Mancs<span className="text-orange-600">Napló</span></span>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive(item.path) 
                    ? 'bg-orange-50 text-orange-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500'
                }`}
              >
                <item.icon size={22} />
                {item.label}
              </Link>
            ))}
          </nav>
  
          <div className="p-4 border-t border-gray-100">
             <div className="bg-orange-500 rounded-xl p-4 text-white text-center">
                <p className="text-sm font-semibold">Prémium Tagság</p>
                <p className="text-xs opacity-90 mt-1">Még 12 napig érvényes</p>
             </div>
          </div>
        </aside>
  
        {/* --- FŐ TARTALOM (Változó rész) --- */}
        <main className="flex-1 overflow-y-auto h-screen pb-20 md:pb-0">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
             <Outlet /> {/* Ide töltődik be a DashboardPage */}
          </div>
        </main>
  
        {/* --- MOBILE BOTTOM NAV (Alsó menü) --- */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 safe-area-bottom">
          <div className="flex justify-around items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive(item.path) ? 'text-orange-600' : 'text-gray-400'
                }`}
              >
                <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    );
  };