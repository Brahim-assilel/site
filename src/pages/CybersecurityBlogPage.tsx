import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const CybersecurityBlogPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <article>
        <header className="mb-12">
          <p className="text-sm text-slate-400">
            <Link to="/blog" className="hover:text-cyan-300">
              Blog
            </Link>{" "}
            / Cybersécurité
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-100 md:text-5xl">
            Cybersécurité pour les PME : 5 Erreurs à Éviter d'Urgence
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Beaucoup de dirigeants de PME pensent être à l'abri des
            cyberattaques, se croyant trop "petits" pour intéresser les
            hackers. C'est une erreur coûteuse. Les PME sont des cibles de
            choix car souvent moins bien protégées. Voici 5 erreurs critiques à
            corriger sans attendre.
          </p>
        </header>

        <div className="space-y-10 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              1. Négliger la sensibilisation des employés
            </h2>
            <p>
              L'erreur humaine est la porte d'entrée de plus de 90% des
              cyberattaques réussies (phishing, etc.). Sans formation régulière,
              vos collaborateurs sont le maillon faible de votre sécurité.
              Organisez des sessions de sensibilisation et des simulations de
              phishing pour en faire votre première ligne de défense.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              2. Manquer de sauvegardes fiables et testées
            </h2>
            <p>
              Une sauvegarde n'est utile que si elle est fonctionnelle et
              récente. Beaucoup d'entreprises réalisent trop tard que leurs
              backups sont corrompus ou trop anciens. Mettez en place la règle
              du 3-2-1 : 3 copies de vos données, sur 2 supports différents,
              dont 1 hors site. Surtout, testez la restauration régulièrement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              3. Utiliser des mots de passe faibles (et identiques partout)
            </h2>
            <p>
              "Admin123" n'est pas un mot de passe. Imposez une politique de
              mots de passe robustes (longs, complexes) et uniques pour chaque
              service. L'idéal est d'utiliser un gestionnaire de mots de passe
              d'entreprise et d'activer l'authentification multi-facteurs (MFA)
              partout où c'est possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              4. Ignorer les mises à jour logicielles
            </h2>
            <p>
              Chaque jour, des failles de sécurité sont découvertes dans les
              logiciels que vous utilisez. Les mises à jour contiennent les
              correctifs pour ces failles. Retarder leur application, c'est
              laisser une porte ouverte aux attaquants. Automatisez les mises à
              jour autant que possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              5. Penser que l'antivirus suffit
            </h2>
            <p>
              Un antivirus est indispensable, mais il est loin d'être
              suffisant face aux menaces modernes. Une bonne stratégie de
              défense inclut un pare-feu bien configuré, une protection des
              emails, et idéalement une solution de détection et de réponse
              (EDR).
            </p>
          </section>
        </div>

        <footer className="p-8 mt-16 border rounded-3xl bg-slate-900/50 border-white/10 text-center">
          <h2 className="text-2xl font-bold text-slate-100">
            Protégez votre activité avant qu'il ne soit trop tard
          </h2>
          <p className="mt-3 text-slate-300">
            Un audit de sécurité peut révéler des failles critiques que vous
            ignorez. Contactez-nous pour un diagnostic gratuit.
          </p>
          <div className="mt-6">
            <Button href="/#audit" variant="primary">
              Demander un audit de sécurité
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
};