import { HiLightningBolt, HiMap, HiHeart, HiAcademicCap, HiCalendar, HiUserGroup } from 'react-icons/hi';
import { useScrollReveal } from '../../../shared/hooks/useScrollReveal'; // Új hook import

const features = [
  {
    icon: HiAcademicCap,
    title: "Digitális Kutyaiskola",
    desc: "Kövesd a fejlődést leckéről leckére. Videós segédletek és tréner általi visszajelzések egy helyen.",
    color: "text-orange-500",
    bg: "bg-orange-100 dark:bg-orange-900/20"
  },
  {
    icon: HiHeart,
    title: "Egészségügyi Napló",
    desc: "Oltások, féreghajtás és gyógyszerek emlékeztetőivel. A súlygörbén láthatod, ha változik valami.",
    color: "text-red-500",
    bg: "bg-red-100 dark:bg-red-900/20"
  },
  {
    icon: HiMap,
    title: "Kutyás Térkép",
    desc: "Találd meg a legközelebbi kutyafuttatókat, állatorvosokat és kutyabarát helyeket a környéken.",
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/20"
  },
  {
    icon: HiCalendar,
    title: "Közös Naptár",
    desc: "Sose maradj le egy eseményről sem. Szinkronizáld a családtagok naptárát a kutya programjaival.",
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/20"
  },
  {
    icon: HiUserGroup,
    title: "Közösség",
    desc: "Ismerkedj más gazdikkal, szervezz közös sétákat, és oszd meg kedvenced legjobb pillanatait.",
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    icon: HiLightningBolt,
    title: "Okos Értesítések",
    desc: "Az alkalmazás tanul a szokásaidból, és akkor szól, amikor a leginkább szükséged van rá.",
    color: "text-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/20"
  }
];

const FeaturesSection = () => {
  // Hook használata a gridre és a címre
  const gridRef = useScrollReveal({ stagger: 0.15, y: 60 });
  const titleRef = useScrollReveal({ y: 30 });

  return (
    <section id="funkciok" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Szekció Cím animálva */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Minden, amire <span className="text-orange-600 dark:text-orange-500">szükségetek lehet</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Felejtsd el a papírokat és a szétszórt jegyzeteket. Rendszerezd kedvenced életét egyetlen, átlátható felületen.
          </p>
        </div>

        {/* Grid animálva */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;