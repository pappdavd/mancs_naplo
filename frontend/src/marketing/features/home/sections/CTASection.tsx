import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMail } from 'react-icons/hi';
import MancsLogo from '../../../shared/components/MancsLogo'; // IMPORT

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: "elastic.out(1, 0.75)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%"
      }
    });

    gsap.to(glowRef.current, {
        scale: 1.5,
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section id="kapcsolat" className="py-16 px-4">
      <div ref={containerRef} className="max-w-5xl mx-auto rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl shadow-orange-500/10 relative overflow-hidden transition-colors duration-500">
        
        <div ref={glowRef} className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-8">
          <div className="text-center md:text-left space-y-2 max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Ne maradj le a <span className="text-orange-600 dark:text-orange-500">hírekről!</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
              Csatlakozz a közösséghez, és értesülj elsőként az új funkciókról.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-start">
            <form className="flex flex-col sm:flex-row items-center gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  placeholder="pelda@email.hu" 
                  className="w-full sm:w-64 pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm shadow-sm"
                />
              </div>

              {/* JAVÍTOTT FELIRATKOZÁS GOMB - Tiszta forma, logóval */}
              <button 
                type="submit"
                className="group flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-orange-600/20 active:scale-95 hover:scale-105 shrink-0"
              >
                 {/* Mancs logó ikonként */}
                 <MancsLogo className="w-6 h-6 text-orange-200 group-hover:text-white transition-all group-hover:rotate-12" />
                 <span>Feliratkozom</span>
              </button>
            </form>
            <p className="text-gray-500 dark:text-gray-600 text-xs mt-2 text-center sm:text-left ml-1">
              Spam-mentes zóna. Bármikor leiratkozhatsz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;