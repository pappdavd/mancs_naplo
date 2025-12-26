import React, { useState } from 'react';
import axios from 'axios';
// JAVÍTVA: Kivettük a Plus, Save, ImageIcon importokat
import { Package, DollarSign, UploadCloud } from 'lucide-react'; 
import Button from '../../../../marketing/shared/components/Button';

export const AdminProductsPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  
  // JAVÍTVA: Kivettük a setCategory-t, mert nem használtuk
  const [category] = useState('merch'); 
  
  const [isFeatured, setIsFeatured] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Kép kiválasztás kezelése
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Előnézeti URL generálása
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // JSON helyett FormData-t kell használnunk fájlküldéshez
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('category', category);
      formData.append('is_featured', isFeatured ? '1' : '0');
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      // Fontos a fejléc beállítása (bár az axios gyakran automatikusan megteszi)
      const response = await axios.post('http://localhost/pawpatrol/api/admin/create_product.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('✅ Termék sikeresen feltöltve!');
        // Reset
        setName(''); setDescription(''); setPrice(''); setStock('10'); 
        setIsFeatured(false); setSelectedFile(null); setPreviewUrl(null);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Hiba történt a mentéskor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Package className="text-orange-500" size={32} />
        Termék Menedzser
      </h1>

      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Új termék feltöltése</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* --- BAL OLDAL: KÉPFELTÖLTÉS --- */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Termék fotó</label>
                    <div className="relative w-full aspect-square bg-gray-900 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-orange-500 transition-colors group cursor-pointer">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center p-4">
                                <UploadCloud className="mx-auto text-gray-500 group-hover:text-orange-500 mb-2" size={32} />
                                <p className="text-xs text-gray-400">Kattints a feltöltéshez</p>
                            </div>
                        )}
                        
                        {/* Rejtett fájl input, ami ráül az egész dobozra */}
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* --- JOBB OLDAL: ADATOK --- */}
                <div className="md:col-span-2 space-y-5">
                    
                    {/* Név */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Termék neve</label>
                        <input 
                            type="text" required
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="Pl. MancsNapló Bögre"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Ár és Készlet */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Ár (Ft)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input 
                                    type="number" required
                                    className="w-full pl-10 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="3500"
                                    value={price} onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Készlet (db)</label>
                            <input 
                                type="number"
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                value={stock} onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Leírás */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Leírás</label>
                        <textarea 
                            rows={3}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="Rövid ismertető..."
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Kiemelt */}
                    <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-xl border border-gray-700">
                        <input 
                            type="checkbox" id="feat"
                            className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 bg-gray-700 border-gray-600"
                            checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)}
                        />
                        <label htmlFor="feat" className="text-gray-300 font-medium cursor-pointer">
                            Kiemelt termék (Főoldalra)
                        </label>
                    </div>

                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-xl font-bold ${message.includes('Hiba') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                    {message}
                </div>
            )}

            <Button variant="primary" className="w-full justify-center py-4 text-lg bg-orange-600 hover:bg-orange-500" disabled={isLoading}>
                {isLoading ? 'Feltöltés folyamatban...' : 'Termék Létrehozása'}
            </Button>
        </form>
      </div>
    </div>
  );
};