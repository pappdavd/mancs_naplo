import { useState, useEffect } from 'react';
import { User, Mail, Shield, Camera, Plus, Save, ExternalLink } from 'lucide-react';
import axios from 'axios';
import Button from '../../../../marketing/shared/components/Button';
import { AddDogModal } from './AddDogModal';
import { DogDetailsModal } from './DogDetailsModal'; // <--- ÚJ IMPORT
import { useAuth } from '../../../context/AuthContext';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal állapotok
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<any>(null); // <--- Kiválasztott kutya a részletekhez

  useEffect(() => {
    if (user && user.id) {
        fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost/pawpatrol/api/user/get_profile.php?id=${user?.id}`);
      if (response.data.success) {
        setProfile(response.data.user);
        setDogs(response.data.dogs);
      }
    } catch (error) {
      console.error("Hiba a profil betöltésekor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center text-gray-600 font-medium">Profil betöltése...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0 text-gray-900">
      
      {/* 1. FEJLÉC (Változatlan) */}
      <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-md border border-gray-200 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-orange-400 to-orange-600 opacity-90"></div>
        <div className="relative mt-12 md:mt-0 z-10">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
             {profile?.avatar_url ? (
               <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <User size={48} className="text-gray-400" />
             )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 transition-colors">
            <Camera size={18} />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left pt-8 md:pt-4 z-10">
           <h1 className="text-3xl font-bold text-gray-900">{profile?.gazdi_nev}</h1>
           <p className="text-gray-600 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
             <Mail size={18} className="text-orange-500" /> {profile?.email}
           </p>
           <div className="mt-4">
             <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                profile?.role === 'admin' ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-gray-100 text-gray-700 border border-gray-300'
             }`}>
                <Shield size={12} />
                {profile?.role === 'admin' ? 'Adminisztrátor' : 'Felhasználó'}
             </span>
           </div>
        </div>
      </div>

      {/* 2. KUTYÁK SZEKCIÓ */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-gray-800">Kutyusaim 🐶</h2>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="text-sm text-orange-600 font-bold hover:text-orange-700 hover:underline flex items-center gap-1"
            >
                <Plus size={18} /> Új hozzáadása
            </button>
        </div>

        {dogs.length === 0 ? (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
                <p className="text-gray-700 font-medium mb-4">Még nem adtál hozzá kutyust a profilodhoz.</p>
                <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
                    Kutya hozzáadása most
                </Button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dogs.map((dog, index) => (
                    <div 
                        key={index} 
                        // JAVÍTÁS: A kártya mostantól kattintható!
                        onClick={() => setSelectedDog(dog)}
                        className="bg-white text-gray-900 p-4 rounded-2xl border border-gray-300 shadow-sm flex items-center gap-4 hover:shadow-md hover:border-orange-300 hover:bg-orange-50/30 transition-all cursor-pointer group"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 group-hover:scale-105 transition-transform">
                            <img 
                                src={`https://source.unsplash.com/featured/?${dog.breed || 'dog'}`} 
                                onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&h=100")}
                                alt="Dog" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 flex items-center justify-between">
                                {dog.name}
                                <ExternalLink size={16} className="text-gray-400 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
                            </h3>
                            <p className="text-sm text-gray-600 font-medium">
                                {dog.breed || 'Ismeretlen fajta'} {dog.age ? `• ${dog.age} éves` : ''}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* 3. SZERKESZTÉS FORM (Változatlan) */}
      <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-md border border-gray-200">
         <h2 className="text-xl font-bold text-gray-800 mb-6">Adataim szerkesztése</h2>
         <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Teljes név</label>
                    <input type="text" defaultValue={profile?.gazdi_nev} className="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email cím</label>
                    <input type="email" defaultValue={profile?.email} disabled className="w-full px-4 py-2.5 border border-gray-300 bg-gray-100 text-gray-500 rounded-xl cursor-not-allowed font-medium" />
                </div>
            </div>
            <div className="pt-4 flex justify-end">
                <Button variant="secondary" className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700">
                    <Save size={18} /> Módosítások mentése
                </Button>
            </div>
         </form>
      </div>

      {/* --- MODALOK --- */}
      
      {/* 1. HOZZÁADÁS */}
      {user && (
          <AddDogModal 
            userId={user.id} 
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={() => fetchProfile()} 
          />
      )}

      {/* 2. RÉSZLETEK (Ha van kiválasztott kutya) */}
      <DogDetailsModal 
        dog={selectedDog}
        isOpen={!!selectedDog}
        onClose={() => setSelectedDog(null)}
      />

    </div>
  );
};