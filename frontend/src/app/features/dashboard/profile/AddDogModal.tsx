import React, { useState } from 'react';
import axios from 'axios';
import { X, Dog } from 'lucide-react';
import Button from '../../../../marketing/shared/components/Button';

interface AddDogModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddDogModal = ({ userId, isOpen, onClose, onSuccess }: AddDogModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost/pawpatrol/api/user/add_dog.php', {
        user_id: userId,
        name: formData.name,
        breed: formData.breed,
        age: formData.age
      });

      if (response.data.success) {
        onSuccess();
        onClose();
        setFormData({ name: '', breed: '', age: '' });
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
      {/* JAVÍTÁS: 
          - Hozzáadtuk a 'text-gray-900' osztályt, hogy a szöveg mindenképp sötét legyen.
          - Ez felülírja a Dark Mode globális fehér szövegszínét ezen a fehér kártyán belül.
      */}
      <div className="bg-white text-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Fejléc */}
        <div className="bg-orange-50 p-6 flex justify-between items-center border-b border-orange-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Dog className="text-orange-600" /> Új kutyus hozzáadása
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-gray-900">
                <X size={20} />
            </button>
        </div>

        {/* Űrlap */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
                {/* Címkék sötétítése */}
                <label className="block text-sm font-bold text-gray-800 mb-1.5">Kutyus neve *</label>
                <input 
                    type="text" 
                    required
                    // JAVÍTÁS: Sötétebb keret (border-gray-300) és explicit sötét szöveg (text-gray-900)
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Pl. Bodri"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">Fajta</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        value={formData.breed}
                        onChange={(e) => setFormData({...formData, breed: e.target.value})}
                        placeholder="Pl. Vizsla"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">Kor (év)</label>
                    <input 
                        type="number" 
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        placeholder="Pl. 3"
                    />
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                <button 
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
                >
                    Mégse
                </button>
                <Button 
                    variant="primary" 
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6"
                >
                    {isLoading ? 'Mentés...' : 'Hozzáadás'}
                </Button>
            </div>
        </form>

      </div>
    </div>
  );
};