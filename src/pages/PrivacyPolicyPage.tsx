export const PrivacyPolicyPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-100 md:text-5xl">
          Politique de Confidentialite
        </h1>
        <p className="mt-4 text-sm text-slate-400">
          Derniere mise a jour : 9 mars 2026
        </p>
      </header>

      <div className="space-y-8 leading-relaxed text-slate-300">
        <section>
          <h2 className="mb-2 text-2xl font-bold text-slate-100">
            1. Donnees collectees
          </h2>
          <p>
            Nous pouvons collecter les donnees que vous nous transmettez via
            les formulaires (nom, email, telephone, message), ainsi que des
            donnees techniques de navigation (pages consultees, type d&apos;appareil,
            informations d&apos;usage).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-slate-100">
            2. Finalites du traitement
          </h2>
          <p>
            Ces donnees sont utilisees pour repondre a vos demandes, assurer le
            suivi commercial, ameliorer nos services et mesurer la frequentation
            du site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-slate-100">
            3. Conservation
          </h2>
          <p>
            Les donnees sont conservees pendant une duree proportionnee aux
            finalites poursuivies et conformement aux obligations legales
            applicables.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-slate-100">
            4. Vos droits
          </h2>
          <p>
            Vous pouvez demander l&apos;acces, la rectification, l&apos;effacement ou la
            limitation du traitement de vos donnees, ainsi que vous opposer a
            certains traitements.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-bold text-slate-100">
            5. Contact
          </h2>
          <p>
            Pour toute question relative a la protection des donnees, vous
            pouvez nous contacter via la page Contact.
          </p>
        </section>
      </div>
    </div>
  );
};
