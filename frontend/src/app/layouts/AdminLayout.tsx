
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, BookOpen, Users, LogOut } from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Áttekintés', path: '/admin' },
    { icon: ShoppingBag, label: 'Termékek (Shop)', path: '/admin/products' },
    { icon: BookOpen, label: 'Tananyagok (Suli)', path: '/admin/lessons' },
    { icon: Users, label: 'Felhasználók', path: '/admin/users' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-700">
           <span className="text-xl font-bold tracking-tight text-white">
             Mancs<span className="text-orange-500">Admin</span> 🛡️
           </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive(item.path) 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
           <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors">
              <LogOut size={20} /> Vissza a Shopba
           </Link>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
         <Outlet />
      </main>
    </div>
  );
};