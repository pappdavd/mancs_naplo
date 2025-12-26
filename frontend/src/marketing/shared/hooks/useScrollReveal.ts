import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Regisztráljuk a plugint, hogy biztosan működjön
gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (options?: { 
  delay?: number, 
  stagger?: number, 
  y?: number, 
  x?: number,
  scale?: boolean,
  duration?: number,
  threshold?: string // pl. "top 85%"
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = ref.current;
    if (!element) return;

    // Ha a konténernek vannak gyerekei, azokat animáljuk (pl. grid elemek)
    // Ha nincsenek, akkor magát a konténert (pl. egy címsor)
    const targets = element.children.length > 0 ? element.children : element;

    gsap.fromTo(targets, 
      { 
        y: options?.y !== undefined ? options.y : 50, 
        x: options?.x || 0,
        opacity: 0,
        scale: options?.scale ? 0.9 : 1
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: options?.duration || 0.8,
        stagger: options?.stagger || 0.1, // Lista elemek közötti késleltetés
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: options?.threshold || "top 85%", // Akkor indul, amikor az elem teteje eléri a képernyő aljának 85%-át
          toggleActions: "play none none reverse" // Lejátszás befelé, visszafelé pedig eltűnés (opcionális, lehet "play none none none" is)
        }
      }
    );
  }, { scope: ref });

  return ref;
};