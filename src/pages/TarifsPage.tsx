import { Button } from "../components/ui/Button";
import { VoipQuoteForm } from "../components/voip/VoipQuoteForm";

export const TarifsPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-[0.14em] uppercase rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
        Solution VoIP
      </p>
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        Tarifs VoIP en FCFA
      </h1>
      <p className="mt-4 text-lg text-slate-300">
        Tarifs communications selon destinations/volumes — devis personnalisé.
      </p>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-slate-100">Cloud PBX (par utilisateur / mois)</h2>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="text-xl font-bold text-slate-100">Starter — 4 900 FCFA</h3>
            <ul className="mt-3 space-y-1 text-slate-300">
              <li>Standard cloud (IVR simple)</li>
              <li>Extensions, transferts, renvois</li>
              <li>Appli mobile + PC</li>
              <li>Support standard</li>
            </ul>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="text-xl font-bold text-slate-100">Business — 7 900 FCFA</h3>
            <ul className="mt-3 space-y-1 text-slate-300">
              <li>Tout Starter</li>
              <li>Files d’attente (basique)</li>
              <li>Règles avancées</li>
              <li>Statistiques & rapports</li>
              <li>Support prioritaire</li>
            </ul>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="text-xl font-bold text-slate-100">Pro — 11 900 FCFA</h3>
            <ul className="mt-3 space-y-1 text-slate-300">
              <li>Tout Business</li>
              <li>Multi‑sites / scénarios avancés</li>
              <li>Rapports avancés (selon plateforme)</li>
              <li>Options qualité (selon offre)</li>
              <li>SLA (si proposé)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-slate-100">SIP Trunk (par canal / mois)</h2>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="text-xl font-bold text-slate-100">Start — 12 000 FCFA</h3>
            <ul className="mt-3 space-y-1 text-slate-300">
              <li>1 canal simultané (x canaux selon besoin)</li>
              <li>1 DID (ou en option)</li>
              <li>Support standard</li>
            </ul>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="text-xl font-bold text-slate-100">Business — 18 000 FCFA</h3>
            <ul className="mt-3 space-y-1 text-slate-300">
              <li>Routage & règles de base</li>
              <li>Option failover / renvoi</li>
              <li>Support prioritaire</li>
            </ul>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="text-xl font-bold text-slate-100">Enterprise — sur devis</h3>
            <ul className="mt-3 space-y-1 text-slate-300">
              <li>Volumes élevés</li>
              <li>Redondance / SLA</li>
              <li>Reporting avancé (si dispo)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-slate-100">Call Center (par agent / mois)</h2>
        <div className="p-5 mt-6 border rounded-2xl bg-slate-900/50 border-white/10">
          <h3 className="text-xl font-bold text-slate-100">Call Center — 14 900 FCFA</h3>
          <ul className="mt-3 space-y-1 text-slate-300">
            <li>ACD / files d’attente avancées</li>
            <li>Supervision & KPI (niveau standard)</li>
            <li>Rapports</li>
          </ul>
        </div>
      </section>

      <section className="p-6 mt-12 border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">Options & frais</h2>
        <ul className="mt-4 space-y-1 text-slate-300">
          <li>DID supplémentaire : 1 500 FCFA / mois / numéro</li>
          <li>Enregistrement PBX : + 2 500 FCFA / utilisateur / mois</li>
          <li>Intégration CRM / API : sur devis</li>
          <li>Audit réseau / QoS : à partir de 25 000 FCFA (one‑shot)</li>
          <li>Pack Failover : + 5 000 FCFA / mois (selon configuration)</li>
          <li>Enregistrement Call Center : + 3 500 FCFA / agent / mois</li>
          <li>Supervision avancée / wallboard : sur devis</li>
          <li>Installation / onboarding : à partir de 50 000 FCFA</li>
          <li>Migration & portabilité : sur devis</li>
        </ul>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button href="/demo" variant="primary">
            Demander une démo
          </Button>
          <Button href="/demo#devis" variant="glass">
            Devis en 2 minutes
          </Button>
        </div>
      </section>

      <VoipQuoteForm />
    </div>
  );
};
