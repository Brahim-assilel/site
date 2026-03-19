import { CONTACT_EMAIL, BRAND_NAME } from "../config/brand";
import { Seo } from "../components/Seo";

export const TermsOfUsePage = () => {
  return (
    <>
      <Seo
        title="Conditions d'utilisation"
        description={`Conditions générales d'utilisation du site ${BRAND_NAME}.`}
        url={`${window.location.origin}/conditions-utilisation`}
      />
      <div className="max-w-4xl px-4 mx-auto py-28 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-100 md:text-5xl">
            Conditions d&apos;utilisation
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Derniere mise a jour : 9 mars 2026
          </p>
        </header>

        <div className="space-y-8 leading-relaxed text-slate-300">
          <section>
            <h2 className="mb-2 text-2xl font-bold text-slate-100">1. Objet</h2>
            <p>
              Les presentes conditions definissent les regles d&apos;utilisation
              du site {BRAND_NAME}. En accedant au site, vous acceptez ces
              conditions.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-slate-100">
              2. Utilisation du site
            </h2>
            <p>
              Vous vous engagez a utiliser ce site de maniere licite, sans nuire
              a son fonctionnement, a sa securite, ou aux droits de tiers.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-slate-100">
              3. Propriete intellectuelle
            </h2>
            <p>
              Les contenus du site (textes, visuels, elements graphiques, code)
              sont proteges. Toute reproduction ou reutilisation sans
              autorisation prealable est interdite.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-slate-100">
              4. Limitation de responsabilite
            </h2>
            <p>
              Nous faisons nos meilleurs efforts pour maintenir des informations
              exactes et un service disponible. Toutefois, aucune garantie
              absolue n&apos;est donnee sur l&apos;absence d&apos;erreurs,
              d&apos;interruptions ou de pertes de donnees.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-slate-100">
              5. Liens externes
            </h2>
            <p>
              Le site peut contenir des liens vers des ressources tierces. Nous
              ne sommes pas responsables de leur contenu ni de leurs politiques.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-slate-100">
              6. Modifications
            </h2>
            <p>
              Ces conditions peuvent etre mises a jour a tout moment. La version
              applicable est celle publiee sur cette page a la date de
              consultation.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-bold text-slate-100">
              7. Contact
            </h2>
            <p>
              Pour toute question relative a ces conditions, vous pouvez nous
              ecrire a {CONTACT_EMAIL}.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
