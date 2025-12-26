import { useEffect, useState } from 'react';
import axios from 'axios';
// JAVÍTÁS: UserMd helyett Stethoscope importálása
import { Syringe, Plus, Calendar, Stethoscope, AlertCircle } from 'lucide-react';
import { AddVaccinationModal } from './AddVaccinationModal';

export const DogHealthTab = ({ dogId }: { dogId: number }) => {
  const [vaccinations, setVaccinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchHealthData = async () => {
    try {
      const res = await axios.get(`http://localhost/pawpatrol/api/dog/get_health.php?dog_id=${dogId}`);
      if (res.data.success) {
        setVaccinations(res.data.data.vaccinations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, [dogId]);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
      
      {/* OLTÁSOK SZEKCIÓ */}
      <div>
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <Syringe size={18} className="text-green-600"/> Oltási Könyv
            </h4>
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="text-xs bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors"
            >
                <Plus size={14} /> Új Oltás
            </button>
        </div>

        {loading ? (
            <div className="text-center text-sm text-gray-500 py-4">Adatok betöltése...</div>
        ) : vaccinations.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 border-dashed">
                <p className="text-gray-500 text-sm mb-2">Még nincs rögzített oltás.</p>
                <button onClick={() => setIsAddModalOpen(true)} className="text-green-600 font-bold text-sm hover:underline">
                    Rögzítsd az elsőt most!
                </button>
            </div>
        ) : (
            <div className="space-y-3">
                {vaccinations.map((vax) => (
                    <div key={vax.id} className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-3 shadow-sm">
                        <div className="bg-green-100 text-green-600 p-2 rounded-lg shrink-0">
                            <Syringe size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h5 className="font-bold text-gray-900">{vax.vaccine_name}</h5>
                                <span className="text-xs text-gray-400">{new Date(vax.date_administered).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                                {vax.vet_name && (
                                    // JAVÍTÁS: Itt használjuk a Stethoscope ikont
                                    <span className="flex items-center gap-1"><Stethoscope size={12}/> {vax.vet_name}</span>
                                )}
                                {vax.valid_until && (
                                    <span className={`flex items-center gap-1 font-medium ${new Date(vax.valid_until) < new Date() ? 'text-red-500' : 'text-green-600'}`}>
                                        <Calendar size={12}/> Lejár: {new Date(vax.valid_until).toLocaleDateString()}
                                        {new Date(vax.valid_until) < new Date() && <AlertCircle size={12}/>}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      <AddVaccinationModal 
        dogId={dogId}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchHealthData} 
      />

    </div>
  );
};