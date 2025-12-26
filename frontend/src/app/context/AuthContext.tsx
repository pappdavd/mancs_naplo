import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  gazdi_nev: string;
  email: string;
  role: 'admin' | 'user';
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // <--- ÚJ: Hozzáadjuk a típushoz
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // <--- ÚJ: Kezdőérték true

  // Induláskor megnézzük, van-e mentett adat a LocalStorage-ban
  useEffect(() => {
    const checkUser = () => {
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
        
            if (storedToken && storedUser) {
              setToken(storedToken);
              setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Hiba a localStorage olvasásakor", error);
            // Ha hibás az adat (pl. sérült JSON), inkább töröljük
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setIsLoading(false); // <--- ÚJ: Mindenképp jelezzük, hogy végeztünk
        }
    };

    checkUser();
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};