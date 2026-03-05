import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { VoipQuoteForm } from "../components/voip/VoipQuoteForm";
import { voipFaqData } from "../data/voip";

export const VoipPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <section className="text-center">
        <p className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-[0.14em] uppercase rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
          Solutions VoIP
        </p>
        <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
          Téléphonie VoIP professionnelle : Standard Cloud & SIP Trunk
        </h1>
        <p className="max-w-4xl mx-auto mt-4 text-lg text-slate-300">
          Réduisez vos coûts, améliorez la prise d’appels et gagnez en mobilité.
          Choisissez un Cloud PBX clé en main ou connectez votre système
          existant via SIP Trunk.
        </p>
        <p className="mt-4 text-sm text-slate-300">
          ✅ Portabilité • ✅ Mise en service rapide • ✅ Anti‑fraude • ✅ Support pro
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button href="/demo" variant="primary">
            Demander une démo
          </Button>
          <Button href="/demo#devis" variant="glass">
            Obtenir un devis (2 minutes)
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
        <div className="p-6 border rounded-3xl bg-slate-900/50 border-white/10">
          <h2 className="text-2xl font-bold text-slate-100">Cloud PBX (Standard Cloud)</h2>
          <p className="mt-2 text-slate-300">
            Pour PME, multi‑sites, équipes hybrides, support client.
          </p>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>IVR / menu vocal</li>
            <li>Extensions, groupes, transferts</li>
            <li>Files d’attente, débordement</li>
            <li>Appli mobile & PC</li>
            <li>Statistiques & rapports</li>
          </ul>
          <div className="mt-6">
            <Button href="/cloud-pbx" variant="glass">
              Découvrir Cloud PBX
            </Button>
          </div>
        </div>
        <div className="p-6 border rounded-3xl bg-slate-900/50 border-white/10">
          <h2 className="text-2xl font-bold text-slate-100">SIP Trunk</h2>
          <p className="mt-2 text-slate-300">
            Pour entreprises déjà équipées (3CX, Asterisk, FreePBX, Avaya, etc.).
          </p>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>Canaux simultanés (capacité)</li>
            <li>Numéros DID & portabilité</li>
            <li>Routage & règles</li>
            <li>Options de failover / renvoi</li>
          </ul>
          <div className="mt-6">
            <Button href="/sip-trunk" variant="glass">
              Découvrir SIP Trunk
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-100">Preuve & réassurance</h2>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <p className="text-3xl font-extrabold text-cyan-300">24/7</p>
            <p className="mt-1 text-slate-300">Support professionnel</p>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <p className="text-3xl font-extrabold text-cyan-300">&lt; 72h</p>
            <p className="mt-1 text-slate-300">Mise en service type</p>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <p className="text-3xl font-extrabold text-cyan-300">99.9%</p>
            <p className="mt-1 text-slate-300">Objectif de disponibilité</p>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <p className="text-3xl font-extrabold text-cyan-300">100%</p>
            <p className="mt-1 text-slate-300">Approche anti-fraude active</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-100">Ce que vous obtenez</h2>
        <ul className="grid grid-cols-1 gap-3 mt-6 md:grid-cols-2 text-slate-300">
          <li>Numéros pro (DID) + portabilité de vos numéros actuels</li>
          <li>Qualité d’appel optimisée + recommandations QoS</li>
          <li>Mobilité : même numéro sur mobile/PC</li>
          <li>Continuité : renvoi automatique en cas de coupure (selon configuration)</li>
          <li>Sécurité anti‑fraude : limites, restrictions, alertes</li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-100">Cas d’usage</h2>
        <ul className="grid grid-cols-1 gap-3 mt-6 md:grid-cols-2 text-slate-300">
          <li>PME : standard pro + horaires + services</li>
          <li>Support client : files d’attente + reporting + (option) enregistrement</li>
          <li>Ventes : numéros dédiés + suivi des appels + règles par équipe</li>
          <li>Call centers : supervision, KPI, enregistrement (option)</li>
          <li>Système existant : SIP Trunk pour moderniser sans changer le PBX</li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-100">Comment ça marche</h2>
        <ol className="grid grid-cols-1 gap-3 mt-6 md:grid-cols-2 text-slate-300 list-decimal list-inside">
          <li>Diagnostic (besoin Cloud PBX ou SIP Trunk)</li>
          <li>Activation des numéros (nouveaux DID ou portabilité)</li>
          <li>Configuration + tests (routage, IVR, files, règles)</li>
          <li>Mise en service + mini‑formation</li>
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-100">
          L'importance de la VoIP pour les PME
        </h2>
        <p className="max-w-3xl mt-4 text-slate-300">
          Pour une PME, adopter la téléphonie VoIP n'est plus un luxe mais une
          nécessité stratégique. Elle lève les contraintes de la téléphonie
          traditionnelle et ouvre la porte à une communication plus agile,
          professionnelle et économique.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="font-semibold text-cyan-300">Réduction des Coûts</h3>
            <p className="mt-2 text-sm text-slate-300">
              Diminuez vos factures téléphoniques, notamment sur les appels
              internationaux, et réduisez les frais de maintenance.
            </p>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="font-semibold text-cyan-300">Flexibilité & Mobilité</h3>
            <p className="mt-2 text-sm text-slate-300">
              Vos collaborateurs restent joignables sur leur numéro pro, au
              bureau, en télétravail ou en déplacement via une simple appli.
            </p>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
            <h3 className="font-semibold text-cyan-300">Image Professionnelle</h3>
            <p className="mt-2 text-sm text-slate-300">
              Accédez à des fonctionnalités de grand groupe (IVR, files
              d'attente, musique d'attente) pour améliorer l'accueil client.
            </p>
          </div>
        </div>
      </section>

      <section className="p-8 mt-16 border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-3xl font-bold text-slate-100">Parlez à un expert VoIP</h2>
        <p className="mt-3 text-slate-300">
          On vous propose la solution la plus adaptée (PME ou call center).
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button href="/demo" variant="primary">
            Demander une démo
          </Button>
          <Button href="/demo#devis" variant="glass">
            Obtenir un devis
          </Button>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-100">FAQ VoIP</h2>
        <div className="mt-6 space-y-4">
          {voipFaqData.map((item) => (
            <div key={item.question} className="p-5 border rounded-2xl bg-slate-900/40 border-white/10">
              <h3 className="font-semibold text-slate-100">{item.question}</h3>
              <p className="mt-2 text-slate-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-slate-100">Quel pack choisir ?</h2>
        <p className="mt-4 text-slate-300">
          PME hybride : Cloud PBX Business. PBX existant : SIP Trunk Business.
          Centre de contact : Call Center + supervision.
        </p>
        <div className="mt-6">
          <Link to="/tarifs" className="text-cyan-300 hover:text-cyan-200">
            Voir les tarifs en FCFA →
          </Link>
        </div>
      </section>

      <VoipQuoteForm />
    </div>
  );
};
