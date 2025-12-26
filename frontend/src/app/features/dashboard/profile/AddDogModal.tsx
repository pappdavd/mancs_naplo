import React, { useState } from 'react';
import axios from 'axios';
import { X, Dog, Ruler, Fingerprint, FileText, Calendar, Activity, Palette } from 'lucide-react';
import Button from '../../../../marketing/shared/components/Button';

interface AddDogModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Típusdefiníció a bővített adatokhoz
interface DogFormData {
  name: string;
  nickname: string;
  breed: string;
  is_mix: boolean;
  mix_details: string;
  gender: 'male' | 'female';
  birth_date: string;
  color: string;
  coat_type: string;
  is_neutered: boolean;
  neutered_date: string;
  microchip_number: string;
  passport_number: string;
  weight: string;
  height: string;
  notes: string;
}

export const AddDogModal = ({ userId, isOpen, onClose, onSuccess }: AddDogModalProps) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'physical' | 'other'>('basic');
  const [isLoading, setIsLoading] = useState(false);

  // Bővített state az összes új mezővel
  const [formData, setFormData] = useState<DogFormData>({
    name: '',
    nickname: '',
    breed: '',
    is_mix: false,
    mix_details: '',
    gender: 'male',
    birth_date: '',
    color: '',
    coat_type: '',
    is_neutered: false,
    neutered_date: '',
    microchip_number: '',
    passport_number: '',
    weight: '',
    height: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Checkbox kezelése
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Itt küldjük el a teljes, bővített adatcsomagot
      const response = await axios.post('http://localhost/pawpatrol/api/user/add_dog.php', {
        user_id: userId,
        ...formData
      });

      if (response.data.success) {
        onSuccess();
        onClose();
        // Reset form
        setFormData({
            name: '', nickname: '', breed: '', is_mix: false, mix_details: '',
            gender: 'male', birth_date: '', color: '', coat_type: '',
            is_neutered: false, neutered_date: '', microchip_number: '',
            passport_number: '', weight: '', height: '', notes: ''
        });
        setActiveTab('basic');
      } else {
        alert('Hiba: ' + response.data.message);
      }
    } catch (error) {
      console.error("Hiba a hozzáadáskor:", error);
      alert('Nem sikerült hozzáadni a kutyust.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white text-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Fejléc */}
        <div className="bg-orange-50 p-6 flex justify-between items-center border-b border-orange-100 shrink-0">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Dog className="text-orange-600" /> Új kutyus adatlapja
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-gray-900">
                <X size={20} />
            </button>
        </div>

        {/* TAB Menü */}
        <div className="flex border-b border-gray-200 bg-gray-50 shrink-0 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('basic')}
                className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'basic' ? 'bg-white text-orange-600 border-t-2 border-orange-500' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
                <Dog size={16} /> Alapadatok
            </button>
            <button 
                onClick={() => setActiveTab('physical')}
                className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'physical' ? 'bg-white text-orange-600 border-t-2 border-orange-500' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
                <Activity size={16} /> Fizikum & Azonosítás
            </button>
            <button 
                onClick={() => setActiveTab('other')}
                className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'other' ? 'bg-white text-orange-600 border-t-2 border-orange-500' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
                <FileText size={16} /> Egyéb
            </button>
        </div>

        {/* Űrlap Tartalom (Scrollable) */}
        <div className="overflow-y-auto p-6 flex-1">
            <form id="dogForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* --- 1. TAB: ALAPADATOK --- */}
                {activeTab === 'basic' && (
                    <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Hivatalos Név *</label>
                                <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                    value={formData.name} onChange={handleChange} placeholder="Pl. Báró von Bodri" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Becenév</label>
                                <input type="text" name="nickname" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                    value={formData.nickname} onChange={handleChange} placeholder="Pl. Bodri" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Fajta</label>
                                <input type="text" name="breed" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                    value={formData.breed} onChange={handleChange} placeholder="Pl. Vizsla" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Születési dátum</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type="date" name="birth_date" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                        value={formData.birth_date} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                             <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_mix" name="is_mix" checked={formData.is_mix} onChange={handleChange} className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
                                <label htmlFor="is_mix" className="text-sm font-bold text-gray-700 cursor-pointer">Keverék?</label>
                             </div>
                             {formData.is_mix && (
                                <input type="text" name="mix_details" className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm" 
                                    value={formData.mix_details} onChange={handleChange} placeholder="Milyen fajtákból?" />
                             )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nem</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none bg-white">
                                    <option value="male">Kan ♂</option>
                                    <option value="female">Szuka ♀</option>
                                </select>
                             </div>
                             <div className="flex items-center justify-start pt-6 gap-2">
                                <input type="checkbox" id="is_neutered" name="is_neutered" checked={formData.is_neutered} onChange={handleChange} className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
                                <label htmlFor="is_neutered" className="text-sm font-bold text-gray-700 cursor-pointer">Ivartalanított</label>
                             </div>
                        </div>
                    </div>
                )}

                {/* --- 2. TAB: FIZIKUM & AZONOSÍTÁS --- */}
                {activeTab === 'physical' && (
                    <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
                         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                            <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2"><Fingerprint size={18} /> Azonosítás</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-blue-700 mb-1">Mikrochip Szám</label>
                                    <input type="text" name="microchip_number" className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:border-blue-500 outline-none" 
                                        value={formData.microchip_number} onChange={handleChange} placeholder="15 jegyű szám" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-blue-700 mb-1">Útlevél Szám</label>
                                    <input type="text" name="passport_number" className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:border-blue-500 outline-none" 
                                        value={formData.passport_number} onChange={handleChange} placeholder="HU..." />
                                </div>
                            </div>
                         </div>

                         <h4 className="font-bold text-gray-800 flex items-center gap-2"><Ruler size={18} /> Fizikai adatok</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Testsúly (kg)</label>
                                <input type="number" step="0.1" name="weight" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                    value={formData.weight} onChange={handleChange} placeholder="25.5" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Marmagasság (cm)</label>
                                <input type="number" step="0.1" name="height" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                    value={formData.height} onChange={handleChange} placeholder="60" />
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Szín</label>
                                <div className="relative">
                                    <Palette className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type="text" name="color" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                        value={formData.color} onChange={handleChange} placeholder="Zsemle" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Szőr típusa</label>
                                <input type="text" name="coat_type" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none" 
                                    value={formData.coat_type} onChange={handleChange} placeholder="Rövid, drótos..." />
                            </div>
                         </div>
                    </div>
                )}

                {/* --- 3. TAB: EGYÉB --- */}
                {activeTab === 'other' && (
                    <div className="space-y-4 animate-in slide-in-from-right-4 duration-200">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Megjegyzések, különleges ismertetők</label>
                            <textarea 
                                name="notes" 
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none resize-none"
                                value={formData.notes} 
                                onChange={handleChange} 
                                placeholder="Pl. Fél a vihartól, allergiás a csirkére..."
                            ></textarea>
                        </div>
                    </div>
                )}
            </form>
        </div>

        {/* Lábléc (Footer) */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end gap-3 shrink-0">
            <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-gray-700 font-semibold hover:bg-gray-200 rounded-xl transition-colors"
            >
                Mégse
            </button>
            <Button 
                variant="primary" 
                disabled={isLoading}
                className="flex items-center gap-2 px-8"
                onClick={() => document.getElementById('dogForm')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
            >
                {isLoading ? 'Mentés...' : 'Kutyus Mentése'}
            </Button>
        </div>

      </div>
    </div>
  );
};