import { useRef } from 'react';
import { HiStar } from 'react-icons/hi';
import { useScrollReveal } from '../../../shared/hooks/useScrollReveal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const testimonials = [
  {
    name: "Kovács Anna",
    role: "Bodri gazdája",
    content: "Végre nem felejtem el a féreghajtást! A naptár funkció életmentő, és imádom, hogy láthatom a súlygörbét visszamenőleg is.",
    avatar: "A",
    color: "bg-orange-100 text-orange-600"
  },
  {
    name: "Nagy Péter",
    role: "Kutyatréner",
    content: "Trénerként minden tanítványomnak ajánlom. Sokkal könnyebb követni a házi feladatokat, és a gazdik is motiváltabbak a klikker funkcióval.",
    avatar: "P",
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Varga Eszter",
    role: "3 kutya gazdája",
    content: "Korábban füzetekbe írtam mindent, ami állandóan elkeveredett. A MancsNaplóval minden egy helyen van, és a felület egyszerűen gyönyörű!",
    avatar: "E",
    color: "bg-purple-100 text-purple-600"
  }
];

const TestimonialsSection = () => {
  const titleRef = useScrollReveal({ y: 30 });
  const gridRef = useScrollReveal({ stagger: 0.2, y: 50 });
  const bgRef = useRef(null);

  // Háttér animáció (pulzálás)
  useGSAP(() => {
    gsap.to(bgRef.current, {
        scale: 1.2,
        opacity: 0.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
  });

  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* Háttér dekoráció */}
      <div ref={bgRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-orange-500/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Rólunk <span className="text-orange-600 dark:text-orange-500">mondták</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Több ezer boldog gazdi és csóváló farok nem tévedhet.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="flex flex-col h-full p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300">
              
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5" />
                ))}
              </div>

              <blockquote className="flex-1 text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">
                "{item.content}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${item.color}`}>
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.role}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;