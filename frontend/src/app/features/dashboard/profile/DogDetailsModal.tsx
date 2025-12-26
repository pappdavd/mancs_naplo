import React, { useState } from 'react';
import { X, Dog, Activity, FileText, Calendar, Ruler, Fingerprint, Palette, Weight } from 'lucide-react';

interface DogDetailsModalProps {
  dog: any; // Itt a teljes kutya objektumot várjuk
  isOpen: boolean;
  onClose: () => void;
}

export const DogDetailsModal = ({ dog, isOpen, onClose }: DogDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'physical' | 'other'>('basic');

  if (!isOpen || !dog) return null;

  // Segédfüggvény a dátum formázásához
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nincs megadva';
    return new Date(dateString).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white text-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* FEJLÉC */}
        <div className="bg-orange-50 p-6 flex justify-between items-center border-b border-orange-100 shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full border-2 border-orange-200 overflow-hidden shadow-sm">
                    <img 
                        src={`https://source.unsplash.com/featured/?${dog.breed || 'dog'}`} 
                        onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&h=100")}
                        alt={dog.name} 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{dog.name}</h3>
                    <p className="text-sm text-gray-600">{dog.breed} {dog.is_mix ? '(Keverék)' : ''}</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-gray-900">
                <X size={20} />
            </button>
        </div>

        {/* TAB MENÜ */}
        <div className="flex border-b border-gray-200 bg-gray-50 shrink-0 overflow-x-auto">
            <button onClick={() => setActiveTab('basic')} className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'basic' ? 'bg-white text-orange-600 border-t-2 border-orange-500' : 'text-gray-500 hover:bg-gray-100'}`}>
                <Dog size={16} /> Alapadatok
            </button>
            <button onClick={() => setActiveTab('physical')} className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'physical' ? 'bg-white text-orange-600 border-t-2 border-orange-500' : 'text-gray-500 hover:bg-gray-100'}`}>
                <Activity size={16} /> Fizikum & ID
            </button>
            <button onClick={() => setActiveTab('other')} className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'other' ? 'bg-white text-orange-600 border-t-2 border-orange-500' : 'text-gray-500 hover:bg-gray-100'}`}>
                <FileText size={16} /> Egyéb
            </button>
        </div>

        {/* TARTALOM */}
        <div className="overflow-y-auto p-6 flex-1 bg-white">
            
            {/* --- 1. ALAPADATOK --- */}
            {activeTab === 'basic' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem label="Hivatalos Név" value={dog.name} />
                        <InfoItem label="Becenév" value={dog.nickname || '-'} />
                        <InfoItem label="Fajta" value={dog.breed || 'Ismeretlen'} />
                        <InfoItem label="Nem" value={dog.gender === 'male' ? 'Kan ♂' : 'Szuka ♀'} />
                        <InfoItem label="Születési dátum" value={formatDate(dog.birth_date)} icon={<Calendar size={16} />} />
                        <InfoItem 
                            label="Státusz" 
                            value={
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${dog.is_neutered ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {dog.is_neutered ? 'Ivartalanított ✅' : 'Nem ivartalanított'}
                                </span>
                            } 
                        />
                    </div>
                    {dog.is_mix && (
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <h4 className="font-bold text-orange-800 text-sm mb-1">Keverék részletek:</h4>
                            <p className="text-gray-700 text-sm">{dog.mix_details || 'Nincs részletezve.'}</p>
                        </div>
                    )}
                </div>
            )}

            {/* --- 2. FIZIKUM & ID --- */}
            {activeTab === 'physical' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-3"><Fingerprint size={18} /> Hivatalos Azonosítók</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem label="Mikrochip Szám" value={dog.microchip_number || 'Nincs megadva'} color="blue" />
                            <InfoItem label="Útlevél Szám" value={dog.passport_number || 'Nincs megadva'} color="blue" />
                        </div>
                     </div>

                     <h4 className="font-bold text-gray-800 border-b pb-2 mb-4">Fizikai Jellemzők</h4>
                     <div className="grid grid-cols-2 gap-6">
                        <InfoItem label="Testsúly" value={dog.weight ? `${dog.weight} kg` : '-'} icon={<Weight size={16}/>} />
                        <InfoItem label="Marmagasság" value={dog.height ? `${dog.height} cm` : '-'} icon={<Ruler size={16}/>} />
                        <InfoItem label="Szín" value={dog.color || '-'} icon={<Palette size={16}/>} />
                        <InfoItem label="Szőr típusa" value={dog.coat_type || '-'} />
                     </div>
                </div>
            )}

            {/* --- 3. EGYÉB --- */}
            {activeTab === 'other' && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">Megjegyzések</h4>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 min-h-[100px] text-gray-700 text-sm leading-relaxed">
                            {dog.notes ? dog.notes : <span className="text-gray-400 italic">Nincs megjegyzés.</span>}
                        </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-4 text-center">
                        Adatlap létrehozva: {formatDate(dog.created_at)}
                    </div>
                </div>
            )}

        </div>

        {/* LÁBLÉC */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end gap-3 shrink-0">
            <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors">
                Bezárás
            </button>
            {/* Ide jöhet majd a Szerkesztés gomb */}
        </div>

      </div>
    </div>
  );
};

// Segédkomponens egy adatmező megjelenítéséhez
const InfoItem = ({ label, value, icon, color = "gray" }: any) => (
    <div>
        <dt className={`text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1 text-${color}-500`}>
            {icon} {label}
        </dt>
        <dd className="text-gray-900 font-medium text-base break-words">
            {value}
        </dd>
    </div>
);