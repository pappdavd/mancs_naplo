import React, { useState } from 'react';
import { X, Dog, Calendar, Heart } from 'lucide-react';
import axios from 'axios';
import Button from '../../../../marketing/shared/components/Button';

interface AddDogModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddDogModal = ({ userId, isOpen, onClose, onSuccess }: AddDogModalProps) => {
  const [formData, setFormData] = useState({ name: '', breed: '', age: '' });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost/pawpatrol/api/user/add_dog.php', {
        user_id: userId,
        ...formData
      });

      if (response.data.success) {
        onSuccess(); // Lista frissítése
        onClose();   // Ablak bezárása
        setFormData({ name: '', breed: '', age: '' }); // Form törlése
      }
    } catch (error) {
      console.error("Hiba a mentéskor:", error);
      alert("Nem sikerült menteni a kutyust.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Sötét háttér */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Doboz */}
      <div className="relative bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="text-center mb-6">
           <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600">
              <Dog size={32} />
           </div>
           <h2 className="text-2xl font-bold text-gray-900">Új Kutyus 🐶</h2>
           <p className="text-gray-500 text-sm">Add meg a kedvenced adatait.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kutya neve *</label>
                <div className="relative">
                    <Heart className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                        placeholder="Pl. Bodri"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fajtája</label>
                <div className="relative">
                    <Dog className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                        placeholder="Pl. Vizsla"
                        onChange={(e) => setFormData({...formData, breed: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Életkora (év)</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                        type="number" 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                        placeholder="Pl. 3"
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                </div>
            </div>

            <Button variant="primary" className="w-full justify-center mt-4" disabled={isLoading}>
                {isLoading ? 'Mentés...' : 'Hozzáadás'}
            </Button>
        </form>

      </div>
    </div>
  );
};