import SEO from '../../shared/components/SEO';

const TermsPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      <SEO 
        title="Általános Szerződési Feltételek" 
        description="A MancsNapló Általános Szerződési Feltételei (ÁSZF)."
      />

      {/* Háttér dekoráció */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-amber-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-100 h-100 bg-orange-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        {/* --- GLASS CARD --- */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-white/10 p-8 md:p-12 animate-fade-in-up">
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">
              Általános Szerződési Feltételek
            </span>
          </h1>
          
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Általános rendelkezések</h2>
              <p>
                Jelen ÁSZF tartalmazza a <strong>Papp Dávid E.V.</strong> (továbbiakban: Szolgáltató) által üzemeltetett <strong>MancsNapló</strong> alkalmazás (továbbiakban: Szolgáltatás) használatának feltételeit.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">2. A szerződés létrejötte</h2>
              <p>
                A szerződés a felhasználó regisztrációjával, valamint jelen feltételek elfogadásával jön létre a Szolgáltató és a Felhasználó között. A szerződés elektronikus úton megkötött szerződésnek minősül, nem kerül iktatásra, későbbiekben nem visszakereshető, magatartási kódexre nem utal.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">3. A szolgáltatás leírása</h2>
              <p>
                A MancsNapló egy online platform, amely segíti a kutyatulajdonosokat és kutyaiskolákat a képzési folyamatok nyomon követésében, adminisztrációjában és szervezésében. A Szolgáltató fenntartja a jogot a szolgáltatás funkcióinak módosítására.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Felelősségkorlátozás</h2>
              <p>
                A Szolgáltató törekszik a szolgáltatás folyamatos és hibamentes üzemeltetésére, de nem vállal felelősséget az internetes hálózat hibáiból eredő szolgáltatáskiesésekért vagy adatvesztésért. A kutyák képzésével kapcsolatos tanácsok és funkciók támogató jellegűek, nem helyettesítik a szakember személyes jelenlétét.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Elérhetőségek</h2>
               <div className="bg-white/50 dark:bg-black/20 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <ul className="space-y-3">
                    <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-37.5">Szolgáltató neve:</strong> <span>Papp Dávid Egyéni Vállalkozó</span></li>
                    <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-37.5">Székhely:</strong> <span>4361 Nyírbogát, Vörösmarty utca 7.</span></li>
                    <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-37.5">Telefonszám:</strong> <a href="tel:+36706676802" className="text-orange-600 hover:text-orange-500 font-medium">+36 70 667 6802</a></li>
                    <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-37.5">Email:</strong> <a href="mailto:info@mancsnaplo.hu" className="text-orange-600 hover:text-orange-500 font-medium">info@mancsnaplo.hu</a></li>
                </ul>
               </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Záró rendelkezések</h2>
              <p>
                A jelen szabályzatban nem szabályozott kérdésekben a magyar jogszabályok, különösen a Ptk. rendelkezései az irányadók. A felek esetleges jogvitáikat elsősorban békés úton rendezik.
              </p>
            </section>

            <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-xl border border-orange-100 dark:border-orange-900/20 mt-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Érvényes: <span className="font-semibold text-orange-600">{new Date().getFullYear()}. január 1-től</span> visszavonásig.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;