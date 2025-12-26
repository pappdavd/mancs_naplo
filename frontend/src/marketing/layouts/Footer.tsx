// src/marketing/layouts/Footer.tsx
import { Link } from 'react-router-dom';
import { HiPhone, HiMail, HiCheck } from 'react-icons/hi';
import MancsLogo from '../shared/components/MancsLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <MancsLogo className="w-8 h-8 text-orange-600" />
              <div className="flex items-center text-2xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-white">Mancs</span>
                <span className="text-orange-600">Napló</span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Digitális megoldás kutyaiskoláknak és gazdiknak.
            </p>
          </div>

          {/* Navigáció */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Navigáció</h3>
            <ul className="space-y-3">
              {/* Frissített linkek a marketing struktúrához */}
              <li><Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors">Kezdőlap</Link></li>
              <li><Link to="/shop" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors">Shop</Link></li>
              <li><Link to="/#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors">Funkciók</Link></li>
            </ul>
          </div>

          {/* Jogi infók */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Jogi nyilatkozatok</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors">Adatvédelmi tájékoztató</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors">ÁSZF</Link></li>
            </ul>
          </div>

          {/* Kapcsolat */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Kapcsolat</h3>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <HiCheck className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-gray-900 dark:text-white block">Papp Dávid E.V.</strong>
                  <span>Szolgáltató</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="w-5 h-5 text-orange-600 shrink-0" />
                <a href="tel:+36706676802" className="hover:text-orange-600 transition-colors">+36 70 667 6802</a>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="w-5 h-5 text-orange-600 shrink-0" />
                <a href="mailto:info@mancsnaplo.hu" className="hover:text-orange-600 transition-colors">info@mancsnaplo.hu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center md:text-left text-sm text-gray-500">
          <p>© {currentYear} MancsNapló - Papp Dávid E.V. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;