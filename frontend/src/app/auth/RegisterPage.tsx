import { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Sun, Moon, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Button from '../../marketing/shared/components/Button';
import MancsLogo from '../../marketing/shared/components/MancsLogo';
import { useTheme } from '../../marketing/context/ThemeContext';

import dayBg from '../../marketing/assets/wallpaper_day.png';
import nightBg from '../../marketing/assets/wallpaper_night.png';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    gazdi_nev: '',
    email: '',
    password: ''
    // KIVETTÜK: kutya_nev (majd a profilban hozzáadja)
  });
  
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const quote = {
    text: "Mindenki azt hiszi, hogy neki van a legjobb kutyája. És egyikük sem téved.",
    author: "W.R. Purche"
  };

  useGSAP(() => {
    gsap.from(".left-panel-content", {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    });

    gsap.from(".register-item", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      delay: 0.4,
      ease: "back.out(1.7)"
    });
  }, { scope: containerRef });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost/pawpatrol/api/register.php', formData);
      
      if (response.data.success) {
        setMessage({ text: 'Sikeres regisztráció! Máris átirányítunk...', type: 'success' });
        setTimeout(() => {
            navigate('/login');
        }, 2000);
      } else {
        setMessage({ text: response.data.message || 'Hiba történt.', type: 'error' });
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Nem sikerült csatlakozni a szerverhez.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex bg-white dark:bg-gray-900 transition-colors duration-500">
      
      {/* --- BAL OLDAL --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gray-900">
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${theme === 'dark' ? nightBg : dayBg})` }}
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-10 w-full h-full p-12 flex flex-col justify-between left-panel-content">
          <Link to="/" className="flex items-center gap-2 group w-fit">
             <div className="relative">
                <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <MancsLogo className="w-8 h-8 text-orange-600 relative transition-transform duration-300 group-hover:scale-110" />
             </div>
             <div className="flex items-center text-2xl font-bold tracking-tight">
                <span className="text-white">Mancs</span>
                <span className="text-orange-600">Napló</span>
             </div>
          </Link>

          <div className="max-w-md">
            <p className="text-2xl font-medium text-white italic leading-relaxed">
              "{quote.text}"
            </p>
            <p className="mt-4 text-orange-300 font-semibold">— {quote.author}</p>
          </div>
        </div>
      </div>

      {/* --- JOBB OLDAL --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative">
        
        <div className="absolute top-6 right-6 flex items-center gap-4 register-item">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </div>

        <div className="lg:hidden absolute top-6 left-6 register-item">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 flex items-center gap-2">
                <ArrowLeft size={20} />
            </Link>
        </div>

        <div className="w-full max-w-lg space-y-6">
          <div className="text-center register-item">
            <div className="lg:hidden flex justify-center mb-6 items-center gap-2">
                <MancsLogo className="w-10 h-10 text-orange-600" />
                <div className="flex items-center text-3xl font-bold tracking-tight">
                    <span className="text-gray-900 dark:text-white">Mancs</span>
                    <span className="text-orange-600">Napló</span>
                </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hozd létre a profilod!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              A kutyusodat (vagy kutyáidat) ráérsz később hozzáadni.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 register-item">
            
            {/* Gazdi Neve */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-orange-600 transition-colors">
                    <User size={20} />
                </div>
                <input
                    name="gazdi_nev"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all"
                    placeholder="A te teljes neved"
                    onChange={handleChange}
                />
            </div>

            {/* Email */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-orange-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all"
                  placeholder="Email címed"
                  onChange={handleChange}
                />
            </div>

            {/* Jelszó */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-orange-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all"
                  placeholder="Jelszó (min. 6 karakter)"
                  onChange={handleChange}
                />
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
                    message.type === 'error' 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800' 
                    : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800'
                }`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <span>⚠️</span>}
                    {message.text}
                </div>
            )}

            <Button 
                variant="primary" 
                className="w-full justify-center py-3.5 text-lg font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all mt-4 bg-orange-600 hover:bg-orange-500" 
                disabled={isLoading}
            >
              {isLoading ? 'Feldolgozás...' : 'Regisztráció'}
            </Button>
            
          </form>

          <div className="text-center mt-6 register-item">
             <p className="text-gray-600 dark:text-gray-400 text-sm">
               Már van fiókod?{' '}
               <Link to="/login" className="font-bold text-orange-600 hover:text-orange-500 hover:underline">
                 Jelentkezz be itt!
               </Link>
             </p>
          </div>
        </div>
        
         <p className="absolute bottom-6 text-center text-gray-400 text-xs register-item">
            © 2024 MancsNapló.
        </p>
      </div>
    </div>
  );
};