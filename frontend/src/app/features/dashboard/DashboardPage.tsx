import { useState } from 'react'; // React import törölve, csak a hookok kellenek
import { Footprints, Utensils, Zap, Heart, Bell, CheckCircle, ShoppingBag } from 'lucide-react';
import { logActivity } from '../../services/logger';
import Button from '../../../marketing/shared/components/Button';

const MOCK_USER = {
  id: 1,
  dogName: "Bodri",
  breed: "Magyar Vizsla",
  level: 5,
  stats: {
    happiness: 80,
    energy: 40,
    health: 95
  }
};

export const DashboardPage = () => {
  const [stats, setStats] = useState(MOCK_USER.stats);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAction = async (action: 'walk' | 'feed') => {
    setIsAnimating(true);
    
    // Logolás
    logActivity(
        MOCK_USER.id, 
        action, 
        action === 'walk' ? 'Séta indítva a Dashboardról' : 'Kutya megetetve'
    );

    // Állapot frissítés
    if (action === 'walk') {
      setStats(prev => ({ 
          ...prev, 
          happiness: Math.min(100, prev.happiness + 15), 
          energy: Math.max(0, prev.energy - 20) 
      }));
    } else {
      setStats(prev => ({ 
          ...prev, 
          energy: Math.min(100, prev.energy + 30), 
          health: Math.min(100, prev.health + 5) 
      }));
    }

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      
      {/* FEJLÉC */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jó reggelt, Gazdi! ☀️</h1>
          <p className="text-gray-500">Itt a napi összefoglalód.</p>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100 relative hover:bg-gray-50 transition-colors">
           <Bell size={20} className="text-gray-600" />
           <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      </div>

      {/* TAMAGOTCHI KÁRTYA */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-orange-500/10 border border-orange-100 relative overflow-hidden transition-all hover:shadow-orange-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
           <div className={`relative w-32 h-32 rounded-full border-4 border-orange-100 shadow-inner overflow-hidden transition-transform duration-500 ${isAnimating ? 'scale-110 rotate-3' : ''}`}>
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300&h=300" 
                alt="Bodri" 
                className="w-full h-full object-cover"
              />
           </div>

           <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-end">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900">{MOCK_USER.dogName}</h2>
                    <p className="text-sm text-gray-500">{MOCK_USER.breed} • Szint: {MOCK_USER.level}</p>
                 </div>
                 <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                       Egészséges 🐾
                    </span>
                 </div>
              </div>

              <div className="space-y-3">
                 <StatBar label="Boldogság" value={stats.happiness} color="bg-orange-500" icon={Heart} />
                 <StatBar label="Energia" value={stats.energy} color="bg-blue-500" icon={Zap} />
              </div>
           </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
           <Button 
             onClick={() => handleAction('walk')}
             className="flex items-center justify-center gap-2 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
           >
              <Footprints size={20} /> <span className="font-bold">Séta</span>
           </Button>
           <Button 
             onClick={() => handleAction('feed')}
             className="flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
           >
              <Utensils size={20} /> <span className="font-bold">Etetés</span>
           </Button>
        </div>
      </div>

      {/* WIDGETEK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-orange-500" />
                Mai Teendők
            </h3>
            <div className="space-y-3">
               <TaskItem label="Reggeli séta (30p)" isDone={true} />
               <TaskItem label="Trükk gyakorlás: Ül" isDone={false} />
               <TaskItem label="Esti vacsora" isDone={false} />
            </div>
         </div>

         <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="relative z-10">
               <h3 className="font-bold text-lg mb-1">Hétvégi Szuper Ajánlat!</h3>
               <p className="text-indigo-100 text-sm mb-4">A vizslák imádják ezt az új labdát.</p>
               <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors shadow-md">
                  Megnézem a Shopban
               </button>
            </div>
            <ShoppingBag className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-10 rotate-12 group-hover:rotate-6 transition-transform duration-500" />
         </div>
      </div>
    </div>
  );
};

// JAVÍTVA: A 'label' ki lett véve a destructuringból, mert nem használtuk,
// VAGY használjuk a title attribútumban (én most betettem a title-be, így valid)
const StatBar = ({ label, value, color, icon: Icon }: any) => (
   <div className="flex items-center gap-3" title={label}>
      <Icon size={18} className="text-gray-400" />
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
         <div 
            className={`h-full ${color} transition-all duration-1000 ease-out relative`} 
            style={{ width: `${value}%` }}
         >
            <div className="absolute top-0 left-0 w-full h-full bg-white/20"></div>
         </div>
      </div>
      <span className="text-xs font-bold text-gray-500 w-8 text-right">{value}%</span>
   </div>
);

const TaskItem = ({ label, isDone }: { label: string, isDone: boolean }) => (
   <div className="flex items-center gap-3 group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-orange-400'}`}>
         {isDone && <CheckCircle size={14} className="text-white" />}
      </div>
      <span className={`text-sm font-medium ${isDone ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{label}</span>
   </div>
);