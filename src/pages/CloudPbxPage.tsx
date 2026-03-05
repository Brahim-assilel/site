import { Button } from "../components/ui/Button";
import { VoipQuoteForm } from "../components/voip/VoipQuoteForm";

export const CloudPbxPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-[0.14em] uppercase rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
        Solution VoIP
      </p>
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        Standard téléphonique Cloud (Cloud PBX)
      </h1>
      <p className="max-w-4xl mt-4 text-lg text-slate-300">
        Un standard pro complet : IVR, extensions, files d’attente, appli
        mobile/PC, statistiques — idéal pour PME et support client.
      </p>
      <div className="flex flex-wrap gap-3 mt-8">
        <Button href="/demo" variant="primary">
          Démo Cloud PBX
        </Button>
        <Button href="/demo#devis" variant="glass">
          Devis Cloud PBX
        </Button>
      </div>

      <section className="p-6 mt-12 border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">Fonctionnalités clés</h2>
        <ul className="mt-4 space-y-2 text-slate-300">
          <li>IVR / menu vocal & messages d’accueil</li>
          <li>Extensions, groupes, transferts, renvois</li>
          <li>Horaires, jours fériés, règles avancées</li>
          <li>Files d’attente + débordement</li>
          <li>Appli mobile / softphone PC</li>
          <li>Rapports & historique d’appels</li>
          <li>Options : enregistrement, supervision, intégration CRM/API</li>
        </ul>
      </section>

      <VoipQuoteForm />
    </div>
  );
};
