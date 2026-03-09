import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../../config/brand";

export const Footer = () => (
  <footer className="relative py-16 border-t border-white/10 bg-slate-900/50 backdrop-blur-lg">
    <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 md:text-left">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <Link
            to="/"
            className="text-2xl font-bold cursor-pointer text-slate-100 focus:outline-none"
          >
            ASSILEL<span className="text-blue-400">-TECH</span>
          </Link>
          <p className="max-w-sm mt-6 text-sm leading-relaxed text-slate-400/70">
            Votre partenaire technologique de confiance pour une transformation
            digitale sécurisée et performante.
          </p>
          <p className="mt-3 text-sm text-slate-400/80">{CONTACT_EMAIL}</p>
        </div>
        <div>
          <h4 className="mb-6 text-lg font-bold text-slate-200">Services</h4>
          <ul className="space-y-3 text-slate-400">
            <li>
              <Link
                to="/#services"
                className="transition-colors hover:text-blue-300"
              >
                Cloud & DevOps
              </Link>
            </li>
            <li>
              <Link
                to="/#services"
                className="transition-colors hover:text-blue-300"
              >
                Développement
              </Link>
            </li>
            <li>
              <Link
                to="/#services"
                className="transition-colors hover:text-blue-300"
              >
                Cybersécurité
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-lg font-bold text-slate-200">Légal</h4>
          <ul className="space-y-3 text-slate-400">
            <li>
              <Link
                to="/conditions-utilisation"
                className="transition-colors hover:text-blue-300"
              >
                Conditions d&apos;utilisation
              </Link>
            </li>
            <li>
              <Link
                to="/politique-confidentialite"
                className="transition-colors hover:text-blue-300"
              >
                Politique de Confidentialité
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="transition-colors hover:text-blue-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 mt-16 text-sm text-center border-t border-white/10 text-slate-500">
        © 2026 Assilel-Tech. Tous droits réservés.
      </div>
    </div>
  </footer>
);
