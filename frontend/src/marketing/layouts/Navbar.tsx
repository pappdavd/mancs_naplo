import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiSun, HiMoon, HiMusicNote, HiVolumeOff } from 'react-icons/hi';

// Context és komponensek importálása
import { useTheme } from '../context/ThemeContext';
import MancsLogo from '../shared/components/MancsLogo';

// Zene importálása
import musicUrl from '../assets/music.wav';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const location = useLocation();

  // --- GÖRGETÉS KEZELÉSE ---
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]); 

  // --- ZENE KEZELÉSE ---
  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.error("Audio error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Kezdőlap', path: '/' },
    { name: 'Funkciók', path: '/#funkciok' },
    { name: 'Árak', path: '/#arak' },
    { name: 'Kapcsolat', path: '/#kapcsolat' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false; 
    return location.pathname === path;
  };

  const iconBtnClass = "p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-500 transition-all duration-300 focus:outline-none";

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200/50 dark:border-gray-800/50 supports-backdrop-filter:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* --- LOGO --- */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group relative z-50" 
            onClick={handleScrollToTop}
          >
            <div className="relative">
                <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <MancsLogo className="w-8 h-8 text-orange-600 relative transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex items-center text-xl font-bold tracking-tight">
              <span className="text-gray-900 dark:text-white">Mancs</span>
              <span className="text-orange-600">Napló</span>
            </div>
          </Link>

          {/* --- DESKTOP MENÜ --- */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={link.path === '/' ? handleScrollToTop : undefined}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-orange-600 bg-orange-50 dark:bg-gray-900'
                    : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-3"></div>

            {/* Ikonok */}
            <div className="flex items-center gap-1">
                <button onClick={toggleMusic} className={iconBtnClass} title={isPlaying ? "Némítás" : "Zene lejátszása"}>
                {isPlaying ? <HiMusicNote className="w-5 h-5" /> : <HiVolumeOff className="w-5 h-5" />}
                </button>

                <button onClick={toggleTheme} className={iconBtnClass} title="Téma váltása">
                {theme === 'light' ? <HiMoon className="w-5 h-5" /> : <HiSun className="w-5 h-5" />}
                </button>
            </div>

            {/* JAVÍTOTT DESKTOP BELÉPÉS GOMB (Nincs benne <button>, maga a Link a gomb) */}
            <Link 
                to="/login" 
                onClick={handleScrollToTop}
                className="ml-4 group flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 active:scale-95"
            >
                <MancsLogo className="w-5 h-5 text-orange-200 group-hover:text-white transition-all group-hover:rotate-12" />
                <span>Belépés</span>
            </Link>
          </div>

          {/* --- MOBIL HAMBURGER --- */}
          <div className="md:hidden flex items-center gap-3">
             <button onClick={toggleTheme} className={iconBtnClass}>
                {theme === 'light' ? <HiMoon className="w-6 h-6" /> : <HiSun className="w-6 h-6" />}
             </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors focus:outline-none"
              aria-label="Menü megnyitása"
            >
              {isOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBIL MENÜ LENYÍLÓ --- */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <div className="grid gap-2">
            {navLinks.map((link) => (
                <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 transition-colors"
                onClick={link.path === '/' ? handleScrollToTop : () => setIsOpen(false)}
                >
                {link.name}
                </Link>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
            <button 
                onClick={toggleMusic} 
                className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            >
                {isPlaying ? <HiMusicNote className="w-5 h-5 text-orange-600" /> : <HiVolumeOff className="w-5 h-5" />}
                {isPlaying ? "Zene kikapcsolása" : "Háttérzene bekapcsolása"}
            </button>
            
            {/* JAVÍTOTT MOBIL BELÉPÉS GOMB (Nincs benne <button>) */}
            <Link 
                to="/login" 
                onClick={() => { setIsOpen(false); handleScrollToTop(); }}
                className="group w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
                <MancsLogo className="w-6 h-6 text-orange-200 group-hover:text-white transition-all group-hover:rotate-12" />
                <span>Belépés</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;