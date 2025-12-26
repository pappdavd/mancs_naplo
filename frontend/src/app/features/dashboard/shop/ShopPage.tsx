import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import Button from '../../../../marketing/shared/components/Button';
// JAVÍTVA: useAuth import és user változó törölve, mert nem volt használva

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_featured: boolean;
}

export const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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

  // Kategória szűrés
  const categories = [
    { id: 'all', label: 'Összes' },
    { id: 'food', label: 'Eledelek' },
    { id: 'toy', label: 'Játékok' },
    { id: 'accessory', label: 'Kiegészítők' },
    { id: 'merch', label: 'Merch' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      
      {/* HEADER */}
      {/* JAVÍTVA: bg-linear-to-r */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
         <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Mancs Shop 🛍️</h1>
            <p className="text-indigo-100 max-w-lg">
               Válogass prémium termékeink közül! Minden vásárlással támogatod a menhelyi kutyusokat is.
            </p>
         </div>
         <ShoppingBag size={150} className="absolute -right-6 -bottom-6 text-white opacity-10 rotate-12" />
      </div>

      {/* KERESŐ ÉS SZŰRŐ */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 bg-gray-50/95 backdrop-blur z-20 py-2">
         {/* Kereső */}
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Keresés a termékek között..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         {/* Kategória gombok (Desktop) */}
         <div className="hidden md:flex gap-2">
            {categories.map(cat => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                 }`}
               >
                  {cat.label}
               </button>
            ))}
         </div>
         
         {/* Mobil szűrő gomb (Placeholder) */}
         <button className="md:hidden p-3 bg-white border border-gray-200 rounded-xl text-gray-600">
            <Filter size={20} />
         </button>
      </div>

      {/* TERMÉK LISTA */}
      {isLoading ? (
          <div className="text-center p-20 text-gray-500">Termékek betöltése...</div>
      ) : filteredProducts.length === 0 ? (
          <div className="text-center p-20 bg-white rounded-3xl border border-gray-200">
              <p className="text-gray-500 text-lg">Nem találtunk ilyen terméket. 🐶</p>
              <button onClick={() => {setSearchTerm(''); setActiveCategory('all');}} className="text-indigo-600 font-bold mt-2 hover:underline">
                  Szűrők törlése
              </button>
          </div>
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                   {/* Kép */}
                   <div className="relative h-48 overflow-hidden bg-gray-100">
                      {product.is_featured && (
                          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                              KIEMELT
                          </span>
                      )}
                      <img 
                        src={product.image_url || "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Gyorsnézet gomb (Hoverre) */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="primary" className="scale-90 group-hover:scale-100 transition-transform">
                              Megtekintés
                          </Button>
                      </div>
                   </div>

                   {/* Tartalom */}
                   <div className="p-5 flex flex-col flex-1">
                      <div className="mb-auto">
                          <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{product.name}</h3>
                          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <span className="text-xl font-bold text-gray-900">{parseInt(product.price.toString()).toLocaleString()} Ft</span>
                          <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                              <ShoppingBag size={20} />
                          </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
      )}

    </div>
  );
};