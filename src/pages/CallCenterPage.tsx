import { Button } from "../components/ui/Button";
import { VoipQuoteForm } from "../components/voip/VoipQuoteForm";

export const CallCenterPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-[0.14em] uppercase rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
        Solution VoIP
      </p>
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        Solution VoIP Call Center (Cloud)
      </h1>
      <p className="max-w-4xl mt-4 text-lg text-slate-300">
        Files d’attente avancées, supervision, KPI et (option) enregistrement
        pour augmenter le taux de réponse et la qualité.
      </p>
      <div className="flex flex-wrap gap-3 mt-8">
        <Button href="/demo" variant="primary">
          Démo Call Center
        </Button>
        <Button href="/demo#devis" variant="glass">
          Devis Call Center
        </Button>
      </div>

      <section className="p-6 mt-12 border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">Modules</h2>
        <ul className="mt-4 space-y-2 text-slate-300">
          <li>ACD / files d’attente avancées</li>
          <li>Supervision : statut agents, écoute/whisper (si proposé)</li>
          <li>KPI : temps d’attente, taux de réponse, volumes par agent</li>
          <li>Enregistrement (option) + stockage</li>
          <li>Rapports exportables</li>
        </ul>
      </section>

      <VoipQuoteForm />
    </div>
  );
};
