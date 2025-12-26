import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

// Képek importálása
import wallpaperDay from '../assets/wallpaper_day.png';
import wallpaperNight from '../assets/wallpaper_night.png';

interface MarketingLayoutProps {
  children?: ReactNode;
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  const { theme } = useTheme();

  // Háttérkép kiválasztása
  const backgroundImage = theme === 'dark' ? wallpaperNight : wallpaperDay;

  return (
    <div 
      className="flex flex-col min-h-screen transition-all duration-500 ease-in-out bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb' 
      }}
    >
      {/* Overlay: Ez sötétíti a hátteret és állítja be a globális sötét mód színeket */}
      <div className="flex flex-col min-h-screen w-full bg-white/60 dark:bg-gray-950/80 backdrop-blur-[2px] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        <Navbar />

        <main className="grow pt-4 pb-0">
          <div className="w-full">
            {children ? children : <Outlet />}
          </div>
        </main>

        <Footer />
        
      </div>
    </div>
  );
};

export default MarketingLayout;