import { Button } from "../components/ui/Button";
import { VoipQuoteForm } from "../components/voip/VoipQuoteForm";

export const SipTrunkPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-[0.14em] uppercase rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
        Solution VoIP
      </p>
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        SIP Trunk pour votre PBX existant
      </h1>
      <p className="max-w-4xl mt-4 text-lg text-slate-300">
        Ajoutez des canaux et des numéros facilement, réduisez vos coûts et
        gagnez en flexibilité sans changer votre infrastructure.
      </p>
      <div className="flex flex-wrap gap-3 mt-8">
        <Button href="/demo" variant="primary">
          Demander interconnexion
        </Button>
        <Button href="/demo#devis" variant="glass">
          Devis SIP Trunk
        </Button>
      </div>

      <section className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
        <div className="p-6 border rounded-3xl bg-slate-900/50 border-white/10">
          <h2 className="text-2xl font-bold text-slate-100">Ce que vous obtenez</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>Canaux SIP (simultanés)</li>
            <li>DID + portabilité</li>
            <li>Routage & règles (selon offre)</li>
            <li>Options de failover (renvoi automatique)</li>
            <li>Journaux d’appels (CDR) / reporting (si inclus)</li>
          </ul>
        </div>
        <div className="p-6 border rounded-3xl bg-slate-900/50 border-white/10">
          <h2 className="text-2xl font-bold text-slate-100">Pré‑requis</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>PBX compatible SIP</li>
            <li>Connexion internet stable</li>
            <li>Configuration sécurité recommandée (IP autorisées / restrictions)</li>
          </ul>
        </div>
      </section>

      <VoipQuoteForm />
    </div>
  );
};
