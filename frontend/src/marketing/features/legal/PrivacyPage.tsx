import SEO from '../../shared/components/SEO';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      <SEO 
        title="Adatvédelmi Tájékoztató" 
        description="A MancsNapló adatkezelési tájékoztatója. Tudjon meg többet arról, hogyan védjük személyes adatait."
      />

      {/* Háttér dekoráció (Halványabb, mint a főoldalon) */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-orange-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-purple-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        {/* --- GLASS CARD --- */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-white/10 p-8 md:p-12 animate-fade-in-up">
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">
              Adatvédelmi Tájékoztató
            </span>
          </h1>
          
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-sm">1</span>
                Bevezetés
              </h2>
              <p>
                Jelen Adatvédelmi Tájékoztató célja, hogy részletes tájékoztatást nyújtson a <strong>MancsNapló</strong> alkalmazás felhasználói számára az adataik kezeléséről.
                Az adatkezelő elkötelezett a felhasználók személyes adatainak védelme iránt.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-sm">2</span>
                Az Adatkezelő adatai
              </h2>
              <div className="bg-white/50 dark:bg-black/20 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <ul className="space-y-3">
                  <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-30">Név:</strong> <span>Papp Dávid Egyéni Vállalkozó</span></li>
                  <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-30">Székhely:</strong> <span>4361, Nyírbogát Vörösmarty utca 7.</span></li>
                  <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-30">Telefonszám:</strong> <a href="tel:+36706676802" className="text-orange-600 hover:text-orange-500 font-medium transition-colors">+36 70 667 6802</a></li>
                  <li className="flex flex-col sm:flex-row sm:gap-2"><strong className="text-gray-900 dark:text-white min-w-30">Email:</strong> <a href="mailto:info@mancsnaplo.hu" className="text-orange-600 hover:text-orange-500 font-medium transition-colors">info@mancsnaplo.hu</a></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-sm">3</span>
                A kezelt adatok köre
              </h2>
              <p className="mb-4">A regisztráció és a szolgáltatás használata során az alábbi adatokat kezeljük:</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {['Teljes név', 'Email cím', 'Jelszó (titkosítva)', 'Kutyák adatai (név, fajta, születési dátum, képzés)'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {item}
                    </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-sm">4</span>
                Az adatkezelés célja
              </h2>
              <p>
                Az adatokat a szolgáltatás nyújtása, a felhasználók azonosítása, kapcsolattartás, valamint a jogszabályi kötelezettségek (pl. számlázás) teljesítése érdekében kezeljük.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-sm">5</span>
                Az Ön jogai
              </h2>
              <p>
                Ön bármikor kérhet tájékoztatást személyes adatainak kezeléséről, kérheti azok helyesbítését, törlését vagy zárolását a fenti elérhetőségek bármelyikén.
              </p>
            </section>

            <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-xl border border-orange-100 dark:border-orange-900/20 mt-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Ez a dokumentum tájékoztató jellegű. Utolsó frissítés: <span className="font-semibold text-orange-600">{new Date().toLocaleDateString('hu-HU')}</span>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;