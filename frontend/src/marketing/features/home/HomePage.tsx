import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../shared/components/Button';
import MancsLogo from '../../shared/components/MancsLogo'; // IMPORT
import SEO from '../../shared/components/SEO';
import AppShowcase from './sections/AppShowcase';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import CTASection from './sections/CTASection';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnContainerRef = useRef<HTMLDivElement>(null);
  const bgBlob1Ref = useRef<HTMLDivElement>(null);
  const bgBlob2Ref = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('funkciok');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useGSAP(() => {
    gsap.to(bgBlob1Ref.current, { y: 50, x: -30, rotation: 10, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(bgBlob2Ref.current, { y: -40, x: 30, rotation: -10, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2, delay: 0.2 })
      .from(textRef.current, { y: 30, opacity: 0, duration: 1 }, "-=0.8")
      .from(btnContainerRef.current!.children, { y: 20, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.6");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <SEO title="Kezdőlap" description="A MancsNapló a legmodernebb eszköz a felelős kutyatartáshoz." />

      <div ref={bgBlob1Ref} className="absolute top-[10%] left-[10%] w-75 md:w-150 h-75 md:h-150 bg-orange-500/20 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>
      <div ref={bgBlob2Ref} className="absolute top-[40%] right-[10%] w-62.5 md:w-125 h-62.5 md:h-125 bg-amber-500/10 dark:bg-purple-500/10 rounded-full blur-[60px] md:blur-[100px] -z-10 pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            A kutyatartás <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-200 to-orange-600 dark:via-yellow-100 bg-size-[200%_auto] animate-shimmer filter drop-shadow-sm">
              új dimenziója
            </span>
          </h1>
          <p ref={textRef} className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Minden, amire a kedvencednek szüksége van – egészségügy, képzés és közösség egyetlen gyönyörű alkalmazásban.
          </p>
          
          <div ref={btnContainerRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 md:pt-10">
            
            {/* JAVÍTOTT FŐ GOMB - Tiszta forma, integrált mancs logó */}
            <Button 
                variant="primary" 
                className="group relative w-full sm:w-auto h-16 pl-20 pr-10 text-xl font-bold rounded-full shadow-xl shadow-orange-500/20 hover:scale-105 transition-all overflow-hidden"
            >
                {/* Abszolút pozicionált mancs logó a bal oldalon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-200 group-hover:text-white transition-all duration-300 group-hover:rotate-12 transform origin-center">
                    <MancsLogo className="w-12 h-12" />
                </div>
                <span className="relative z-10">Kezdjük el ingyen</span>
            </Button>
            
            {/* Hogyan működik gomb (változatlanul hagyva a funkciót) */}
            <Button 
                variant="outline" 
                onClick={scrollToFeatures}
                className="w-full sm:w-auto h-16 px-10 text-lg rounded-full backdrop-blur-md bg-white/40 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-gray-800/60 border-gray-300 dark:border-gray-700 mt-4 sm:mt-0 font-medium"
            >
                Hogyan működik?
            </Button>
          </div>
        </div>
      </div>

      <AppShowcase />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <div className="pb-10"></div>
    </div>
  );
};

export default HomePage;