import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const VoipBlogPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <article>
        <header className="mb-12">
          <p className="text-sm text-slate-400">
            <Link to="/voip" className="hover:text-cyan-300">
              Solutions VoIP
            </Link>{" "}
            / Blog
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-100 md:text-5xl">
            La Révolution VoIP : Pourquoi votre PME ne peut plus s'en passer
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Dans un monde du travail en pleine mutation, où la flexibilité et
            l'efficacité sont reines, la téléphonie d'entreprise doit évoluer.
            Découvrez pourquoi la VoIP (Voix sur IP) est bien plus qu'une simple
            alternative technologique : c'est un levier de croissance
            stratégique pour les PME.
          </p>
        </header>

        <div className="space-y-10 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              1. Réduction drastique des coûts : un impact direct sur votre
              rentabilité
            </h2>
            <p>
              Le premier avantage, et souvent le plus visible, est économique.
              Contrairement aux lignes analogiques traditionnelles (RTC) qui
              nécessitent des installations physiques coûteuses et une
              maintenance onéreuse, la VoIP utilise votre connexion Internet
              existante.
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>
                <strong>Coûts d'appels réduits :</strong> Les appels entre
                collaborateurs sont gratuits, même entre plusieurs sites. Les
                tarifs pour les appels nationaux et surtout internationaux sont
                infiniment plus bas.
              </li>
              <li>
                <strong>Moins de matériel :</strong> Plus besoin d'un PABX
                physique qui prend la poussière dans un local technique. Tout
                est géré dans le cloud.
              </li>
              <li>
                <strong>Maintenance simplifiée :</strong> Les mises à jour et la
                gestion se font à distance via une interface web, réduisant les
                frais d'intervention.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              2. Flexibilité et mobilité : le bureau vous suit partout
            </h2>
            <p>
              Le télétravail et les déplacements professionnels font partie du
              quotidien. La VoIP transforme chaque appareil connecté en un
              poste téléphonique professionnel.
            </p>
            <p className="mt-2">
              Grâce à une simple application (softphone) sur smartphone ou
              ordinateur, vos collaborateurs restent joignables sur leur numéro
              professionnel, où qu'ils soient. Ils peuvent passer et recevoir
              des appels comme s'ils étaient au bureau, préservant ainsi leur
              numéro personnel et maintenant une image professionnelle
              cohérente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              3. Des fonctionnalités de grand groupe pour une image
              professionnelle
            </h2>
            <p>
              La VoIP démocratise des fonctionnalités autrefois réservées aux
              grandes entreprises, améliorant considérablement votre accueil
              client :
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>
                <strong>Standard vocal interactif (IVR) :</strong> "Tapez 1 pour
                le service commercial, tapez 2 pour le support..."
              </li>
              <li>
                <strong>Files d'attente et musique d'attente :</strong> Gérez les
                pics d'appels sans perdre de clients.
              </li>
              <li>
                <strong>Gestion des horaires :</strong> Adaptez le routage des
                appels en fonction de vos heures d'ouverture.
              </li>
            </ul>
          </section>
        </div>

        <footer className="p-8 mt-16 border rounded-3xl bg-slate-900/50 border-white/10 text-center">
          <h2 className="text-2xl font-bold text-slate-100">Prêt à passer à la vitesse supérieure ?</h2>
          <p className="mt-3 text-slate-300">
            Contactez nos experts pour une démo personnalisée et découvrez comment la VoIP peut transformer votre communication.
          </p>
          <div className="mt-6">
            <Button href="/demo" variant="primary">
              Demander une démo gratuite
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
};