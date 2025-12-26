import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HiCheck, HiGlobeAlt } from 'react-icons/hi';

const AppShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Telefon lebegése
    gsap.to(phoneRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Lebegő kártyák
    gsap.to(card1Ref.current, {
      y: 15,
      x: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });

    gsap.to(card2Ref.current, {
      y: -15,
      x: -5,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- SZÖVEGES RÉSZ (BAL) --- */}
          <div className="space-y-6 z-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              A kutyaiskolád.<br />
              <span className="text-orange-600 dark:text-orange-500">Letöltés nélkül.</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              A MancsNapló egy modern webalkalmazás. Nem foglal helyet a telefonodon, nem kell frissíteni. Csak nyisd meg a böngészőt, lépj be, és kezeld kedvenced ügyeit bárhonnan – legyen az mobil, tablet vagy laptop.
            </p>
          </div>

          {/* --- TELEFON MOCKUP (JOBB) --- */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            
            {/* Háttér fény */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-orange-500/30 rounded-full blur-[80px] -z-10"></div>

            {/* CSS Telefon Keret */}
            <div ref={phoneRef} className="relative z-10 w-75 h-150 bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden ring-1 ring-white/20">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

              {/* Képernyő tartalom */}
              <div className="w-full h-full bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black relative flex flex-col">
                 
                 {/* App Header - PT-12 a Notch miatt */}
                 <div className="pt-12 px-6 pb-6 bg-linear-to-b from-orange-600/10 to-transparent">
                    <div className="text-gray-500 dark:text-white/60 text-sm mb-1">Webes felület</div>
                    <div className="text-gray-900 dark:text-white text-xl font-bold">Bodri profilja 🐾</div>
                 </div>

                 {/* App Widgetek */}
                 <div className="p-4 space-y-4 flex-1">
                    {/* Widget 1 */}
                    <div className="bg-white dark:bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-orange-500 dark:text-orange-400 text-sm font-medium">Következő lecke</span>
                            <span className="text-xs text-gray-400">Online</span>
                        </div>
                        <div className="text-gray-900 dark:text-white font-bold">Helyben maradás II.</div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-3 overflow-hidden">
                            <div className="bg-orange-500 w-3/4 h-full rounded-full"></div>
                        </div>
                    </div>

                    {/* Widget 2 */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-orange-50 dark:bg-white/5 p-4 rounded-2xl border border-orange-100 dark:border-white/5 text-center">
                            <div className="text-2xl mb-1">💊</div>
                            <div className="text-gray-500 dark:text-gray-300 text-xs">Gyógyszer</div>
                            <div className="text-gray-900 dark:text-white font-bold text-sm">Beadva</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-white/5 p-4 rounded-2xl border border-blue-100 dark:border-white/5 text-center">
                            <div className="text-2xl mb-1">⚖️</div>
                            <div className="text-gray-500 dark:text-gray-300 text-xs">Súly</div>
                            <div className="text-gray-900 dark:text-white font-bold text-sm">12.5 kg</div>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                        <p className="text-xs text-gray-500">Minden adatod szinkronizálva a felhőben.</p>
                    </div>
                 </div>

                 {/* Alsó navigáció imitáció */}
                 <div className="h-14 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center px-4">
                    <div className="w-6 h-6 rounded bg-orange-500/20"></div>
                    <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                 </div>
              </div>
            </div>

            {/* Lebegő értesítés kártya 1 (Böngészőből) - JAVÍTVA A POZÍCIÓ */}
            <div ref={card1Ref} className="absolute top-0 -right-4 md:-right-8 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 z-20 w-48 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                 <HiGlobeAlt size={16} />
               </div>
               <div>
                 <div className="font-bold text-xs dark:text-white">Böngészőből</div>
                 <div className="text-[10px] text-gray-500">Azonnali elérés</div>
               </div>
            </div>

            {/* Lebegő értesítés kártya 2 (Szinkronizálva) */}
            <div ref={card2Ref} className="absolute bottom-32 -right-4 md:-right-8 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 z-20 w-48 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0">
                 <HiCheck size={16} />
               </div>
               <div>
                 <div className="font-bold text-xs dark:text-white">Szinkronizálva</div>
                 <div className="text-[10px] text-gray-500">Laptopon is látszik</div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;