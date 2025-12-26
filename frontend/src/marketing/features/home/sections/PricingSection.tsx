import { HiCheck } from 'react-icons/hi';
import Button from '../../../shared/components/Button';
import { useScrollReveal } from '../../../shared/hooks/useScrollReveal'; // Új hook import

const plans = [
  {
    name: "Kezdő",
    price: "Ingyenes",
    desc: "Tökéletes választás egyetlen kiskedvenchez.",
    features: ["1 kutya kezelése", "Alapvető egészségnapló", "Közösségi térkép elérése", "Digitális oltási könyv"],
    cta: "Kipróbálom ingyen",
    highlight: false
  },
  {
    name: "Gazdi+",
    price: "1.990 Ft",
    period: "/ hó",
    desc: "A legnépszerűbb csomag felelős gazdiknak.",
    features: ["Akár 3 kutya kezelése", "Okos értesítések (oltás, gyógyszer)", "Súly- és növekedési görbék", "Kutyaiskola leckék és videók", "Reklámmentes élmény"],
    cta: "Regisztrálok",
    highlight: true,
    badge: "Legnépszerűbb"
  },
  {
    name: "Profi / Tenyésztő",
    price: "4.990 Ft",
    period: "/ hó",
    desc: "Több kutya, alomkezelés és profi eszközök.",
    features: ["Korlátlan kutya", "Alomtervező és naptár", "Exportálható orvosi adatok", "Prioritásos ügyfélszolgálat", "Tenyésztői profil"],
    cta: "Kapcsolatfelvétel",
    highlight: false
  }
];

const PricingSection = () => {
  // A kártyák konténerét animáljuk
  const cardsRef = useScrollReveal({ stagger: 0.15, y: 100, scale: true });
  const titleRef = useScrollReveal({ y: 30 });

  return (
    <section id="arak" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Címsor */}
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Válaszd a neked <span className="text-orange-600 dark:text-orange-500">megfelelőt</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Kezdd el ingyen, és válts nagyobbra, ha szükséged van rá. Nincsenek rejtett költségek.
          </p>
        </div>

        {/* Kártyák */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2
                ${plan.highlight 
                  ? 'bg-white/80 dark:bg-gray-800/80 border-orange-500 shadow-2xl shadow-orange-500/20 z-10 scale-105 md:-mt-4' 
                  : 'bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-700 shadow-lg'
                } backdrop-blur-md`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-md">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm h-10">{plan.desc}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                    <HiCheck className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-orange-600' : 'text-green-500'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.highlight ? 'primary' : 'outline'} 
                className="w-full justify-center"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;