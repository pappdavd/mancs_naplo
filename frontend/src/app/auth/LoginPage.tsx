import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../context/AuthContext';
import Button from '../../marketing/shared/components/Button';
import MancsLogo from '../../marketing/shared/components/MancsLogo';
import { useTheme } from '../../marketing/context/ThemeContext';

import dayBg from '../../marketing/assets/wallpaper_day.png';
import nightBg from '../../marketing/assets/wallpaper_night.png';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const containerRef = useRef(null);
  const formRef = useRef(null);
  
  // Itt tároljuk az adatokat egy objektumban
const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quote = {
    text: "A kutyának egyetlen célja van az életben: a szívét adni neked.",
    author: "J.R. Ackerley"
  };

  useGSAP(() => {
    gsap.from(".left-panel-content", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    });

    gsap.from(".login-item", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1, 
      delay: 0.5,
      ease: "back.out(1.7)"
    });
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Bekapcsoljuk a töltést

    try {
      // JAVÍTVA: Itt a "formData" objektumot küldjük el, 
      // mert abban van benne az email és a password.
      const response = await axios.post('http://localhost/pawpatrol/api/auth/login.php', formData);

      if (response.data.success) {
        const userData = {
            id: response.data.data.id, 
            gazdi_nev: response.data.data.gazdi_nev,
            email: response.data.data.email,
            role: response.data.data.role || 'user',
            avatar_url: response.data.data.avatar_url // Ha van avatar
        };

        login(response.data.token, userData);
        navigate('/dashboard');
      }
    } catch (err: any) {
       if (err.response && err.response.data) {
         setError(err.response.data.message);
       } else {
         setError('Nem sikerült csatlakozni a szerverhez.');
       }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex bg-white dark:bg-gray-900 transition-colors duration-500">
      
      {/* --- BAL OLDAL (Marketing & Háttér) --- */}
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

      {/* --- JOBB OLDAL (Login Form) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative">
        
        <div className="absolute top-6 right-6 flex items-center gap-4 login-item">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </div>

        <div className="lg:hidden absolute top-6 left-6 login-item">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 flex items-center gap-2">
                <ArrowLeft size={20} /> Kezdőlap
            </Link>
        </div>

        <div className="w-full max-w-md space-y-8" ref={formRef}>
          <div className="text-center login-item">
            <div className="lg:hidden flex justify-center mb-6 items-center gap-2">
                <MancsLogo className="w-10 h-10 text-orange-600" />
                <div className="flex items-center text-3xl font-bold tracking-tight">
                    <span className="text-gray-900 dark:text-white">Mancs</span>
                    <span className="text-orange-600">Napló</span>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Üdv újra itt! 👋</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Jelentkezz be a fiókodba a folytatáshoz.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 login-item">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-orange-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all"
                  placeholder="pelda@email.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-orange-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all"
                  placeholder="••••••••"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <Button 
                variant="primary" 
                className="w-full justify-center py-3.5 text-lg font-bold shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all bg-orange-600 hover:bg-orange-500" 
                disabled={isLoading}
            >
              {isLoading ? 'Betöltés...' : 'Bejelentkezés'}
            </Button>
          </form>

          <div className="text-center login-item">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Még nincs fiókod?{' '}
              <Link to="/register" className="font-bold text-orange-600 hover:text-orange-500 hover:underline">
                Csatlakozz a falkához!
              </Link>
            </p>
          </div>
        </div>
        
        <p className="absolute bottom-6 text-center text-gray-400 text-xs login-item">
            © 2025 MancsNapló. Minden jog fenntartva.
        </p>
      </div>
    </div>
  );
};