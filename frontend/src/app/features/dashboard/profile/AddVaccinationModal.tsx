import React, { useState } from 'react';
import axios from 'axios';
import { X, Syringe } from 'lucide-react';
import Button from '../../../../marketing/shared/components/Button';

interface Props {
  dogId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddVaccinationModal = ({ dogId, isOpen, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    vaccine_name: '',
    date_administered: new Date().toISOString().split('T')[0], // Ma
    valid_until: '',
    vet_name: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost/pawpatrol/api/dog/add_vaccination.php', {
        dog_id: dogId,
        ...formData
      });
      if (res.data.success) {
        onSuccess();
        onClose();
        setFormData({ ...formData, vaccine_name: '', notes: '' }); // Reset
      }
    } catch (error) {
      alert('Hiba történt a mentéskor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white text-gray-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="bg-green-50 p-4 flex justify-between items-center border-b border-green-100">
            <h3 className="font-bold text-green-800 flex items-center gap-2">
                <Syringe size={18} /> Új Oltás Rögzítése
            </h3>
            <button onClick={onClose}><X size={20} className="text-gray-500 hover:text-gray-900"/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div>
                <label className="text-xs font-bold text-gray-700">Oltás neve *</label>
                <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Pl. Kombinált, Veszettség..." 
                    value={formData.vaccine_name} onChange={e => setFormData({...formData, vaccine_name: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-bold text-gray-700">Beadva *</label>
                    <input type="date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                        value={formData.date_administered} onChange={e => setFormData({...formData, date_administered: e.target.value})} />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-700">Érvényes eddig</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                        value={formData.valid_until} onChange={e => setFormData({...formData, valid_until: e.target.value})} />
                </div>
            </div>
            <div>
                <label className="text-xs font-bold text-gray-700">Állatorvos</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Dr. Bubó" 
                    value={formData.vet_name} onChange={e => setFormData({...formData, vet_name: e.target.value})} />
            </div>
            
            <div className="flex justify-end pt-2">
                <Button variant="primary" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-sm py-2">
                    {isLoading ? '...' : 'Rögzítés'}
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
};