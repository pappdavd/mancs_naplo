import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Star, Tag, Truck } from 'lucide-react';
import Button from '../../../../marketing/shared/components/Button';

// Típus definíció a termékhez
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
}

export const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/pawpatrol/api/shop/get_products.php');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Hiba a termékek betöltésekor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. SHOP HEADER (Banner) */}
      <div className="relative bg-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden text-white shadow-xl">
         {/* Háttérkép effekt */}
         <div className="absolute inset-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Shop Banner" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>

         <div className="relative z-10 max-w-lg">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500 text-xs font-bold uppercase tracking-wider mb-4">
                Hivatalos MancsNapló Merch
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
               Egyedi cuccok <span className="text-orange-500">neked</span> és a <span className="text-orange-500">kutyusodnak</span>.
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
               Válogass a prémium minőségű, kézzel készített kiegészítőink közül. Minden vásárlással a menhelyeket támogatod!
            </p>
            <Button variant="primary" className="shadow-lg shadow-orange-500/30">
               Legújabb kollekció megtekintése
            </Button>
         </div>
      </div>

      {/* 2. ELŐNYÖK SÁV */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
            <span className="font-medium text-gray-700">Ingyenes szállítás 15.000 Ft felett</span>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Tag size={20} /></div>
            <span className="font-medium text-gray-700">Garantáltan egyedi termékek</span>
         </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Star size={20} /></div>
            <span className="font-medium text-gray-700">Prémium minőség garancia</span>
         </div>
      </div>

      {/* 3. TERMÉKEK RÁCSA */}
      <h2 className="text-2xl font-bold text-gray-900">Kiemelt termékek 🔥</h2>
      
      {isLoading ? (
          <div className="text-center py-10">Termékek betöltése...</div>
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
               <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full overflow-hidden">
                  
                  {/* Kép tartó */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                     <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     {product.is_featured && (
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                           TOP
                        </span>
                     )}
                     <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-gray-800 hover:text-orange-600 hover:bg-orange-50 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <ShoppingCart size={20} />
                     </button>
                  </div>

                  {/* Infó rész */}
                  <div className="p-5 flex flex-col flex-1">
                     <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                     <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-2">{product.description}</p>
                     
                     <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-gray-900">
                           {new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(product.price)}
                        </span>
                        <Button variant="outline" className="text-sm py-2 px-4 hover:bg-gray-900 hover:text-white border-gray-200">
                           Részletek
                        </Button>
                     </div>
                  </div>
               </div>
            ))}
          </div>
      )}

    </div>
  );
};