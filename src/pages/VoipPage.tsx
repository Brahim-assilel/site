import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Cloud,
  Gauge,
  Headphones,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { VoipQuoteForm } from "../components/voip/VoipQuoteForm";
import { voipFaqData } from "../data/voip";

type OfferCard = {
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  points: string[];
  icon: LucideIcon;
  accent: string;
};

const offerCards: OfferCard[] = [
  {
    title: "Cloud PBX",
    subtitle: "Pour PME, multi-sites, équipes hybrides et support client.",
    href: "/cloud-pbx",
    cta: "Découvrir Cloud PBX",
    points: [
      "IVR / menu vocal",
      "Extensions, groupes et transferts",
      "Files d'attente et débordement",
      "Appli mobile et desktop",
      "Statistiques et rapports",
    ],
    icon: Cloud,
    accent: "from-cyan-400/25 via-cyan-400/10 to-transparent",
  },
  {
    title: "SIP Trunk",
    subtitle: "Pour entreprises déjà équipées (3CX, Asterisk, FreePBX, Avaya...).",
    href: "/sip-trunk",
    cta: "Découvrir SIP Trunk",
    points: [
      "Canaux simultanés évolutifs",
      "Numéros DID et portabilité",
      "Routage et règles d'appel",
      "Options de failover / renvoi",
      "Connexion à votre PBX actuel",
    ],
    icon: PhoneCall,
    accent: "from-emerald-400/25 via-teal-400/10 to-transparent",
  },
];

const reassuranceStats = [
  {
    value: "24/7",
    label: "Support pro",
  },
  {
    value: "<72h",
    label: "Mise en service type",
  },
  {
    value: "99.9%",
    label: "Objectif disponibilité",
  },
  {
    value: "100%",
    label: "Approche anti-fraude active",
  },
];

const benefits = [
  "Numéros professionnels (DID) + portabilité de vos numéros actuels",
  "Qualité d'appel optimisée avec recommandations QoS",
  "Mobilité: même numéro sur mobile, ordinateur et bureau",
  "Continuité de service via renvoi automatique en cas de coupure",
  "Sécurité anti-fraude avec restrictions, limites et alertes",
  "Pilotage simple avec reporting et suivi des performances",
];

const useCases = [
  {
    title: "PME",
    description: "Standard pro avec horaires, services et routage intelligent.",
    icon: Building2,
  },
  {
    title: "Support client",
    description: "Files d'attente, supervision et reporting par équipe.",
    icon: Headphones,
  },
  {
    title: "Équipes commerciales",
    description: "Numéros dédiés, suivi des appels et règles par activité.",
    icon: BarChart3,
  },
];

const pmeAdvantages = [
  {
    title: "Réduction des coûts",
    description:
      "Diminuez les coûts d'appels et limitez les frais de maintenance de la téléphonie classique.",
    icon: Gauge,
  },
  {
    title: "Flexibilité et mobilité",
    description:
      "Vos collaborateurs restent joignables sur leur numéro pro partout.",
    icon: Workflow,
  },
  {
    title: "Image professionnelle",
    description:
      "Proposez un accueil structuré avec IVR, musique d'attente et files intelligentes.",
    icon: ShieldCheck,
  },
];

const processSteps = [
  "Diagnostic: choix Cloud PBX ou SIP Trunk selon vos besoins.",
  "Activation: nouveaux numéros DID ou portabilité de l'existant.",
  "Configuration: routage, IVR, files d'attente, règles de sécurité.",
  "Mise en service et mini-formation de vos équipes.",
];

export const VoipPage = () => {
  return (
    <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 md:py-28 lg:px-8">
      <section className="relative overflow-hidden border rounded-[2rem] border-cyan-200/15 bg-slate-950/65 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8 md:p-12">
        <div className="absolute -top-20 -left-10 w-60 h-60 rounded-full bg-cyan-400/15 blur-[100px]" />
        <div className="absolute w-56 h-56 rounded-full -right-12 -bottom-20 bg-emerald-400/15 blur-[110px]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] text-cyan-100 uppercase border rounded-full border-cyan-300/25 bg-cyan-300/10">
              <Sparkles className="w-3.5 h-3.5" />
              Solutions VoIP
            </p>
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-transparent sm:text-4xl md:text-6xl font-display bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-slate-300">
              Téléphonie VoIP professionnelle pour PME et centres de contact.
            </h1>
            <p className="max-w-3xl mt-5 text-base leading-relaxed text-slate-300/90 sm:text-lg">
              Réduisez vos coûts, améliorez la qualité de traitement des appels
              et gagnez en mobilité. Choisissez un standard Cloud clé en main
              ou connectez votre système existant via SIP Trunk.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                href="/demo"
                variant="primary"
                className="w-full px-7 py-3.5 sm:w-auto"
              >
                Demander une démo
              </Button>
              <Button
                href="/demo#devis"
                variant="glass"
                className="w-full px-7 py-3.5 sm:w-auto"
              >
                Obtenir un devis
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Portabilité", "Activation rapide", "Anti-fraude", "Support pro"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-full text-slate-200 border-white/10 bg-white/[0.04]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative p-5 border rounded-3xl border-white/10 bg-white/[0.03]">
            <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
              Réassurance rapide
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {reassuranceStats.map((item) => (
                <div
                  key={item.label}
                  className="p-4 border rounded-2xl border-white/10 bg-slate-900/65"
                >
                  <p className="text-2xl font-extrabold text-cyan-200">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug uppercase tracking-wide text-slate-400/95">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 mt-4 border rounded-2xl border-cyan-300/20 bg-cyan-500/10">
              <p className="text-sm leading-relaxed text-cyan-100/95">
                Une architecture conçue pour la continuité: performance voix,
                sécurité active et accompagnement opérationnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl md:text-4xl font-display">
              Choisissez votre modèle VoIP
            </h2>
            <p className="max-w-3xl mt-3 text-slate-300/90">
              Deux approches selon votre maturité: standard Cloud complet ou
              interconnexion SIP avec votre infrastructure actuelle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {offerCards.map((offer) => {
            const Icon = offer.icon;

            return (
              <div
                key={offer.title}
                className="relative overflow-hidden border rounded-3xl border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/35"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${offer.accent}`}
                />
                <div className="relative">
                  <span className="inline-flex items-center justify-center w-11 h-11 mb-4 border rounded-xl border-white/10 bg-slate-950/70">
                    <Icon className="w-5 h-5 text-cyan-200" />
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 sm:text-2xl">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-slate-300/90">{offer.subtitle}</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-slate-300/90">
                    {offer.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-300 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button href={offer.href} variant="glass">
                      {offer.cta}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl md:text-4xl font-display">
          Ce que vous obtenez
        </h2>
        <div className="grid grid-cols-1 gap-3 mt-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex gap-2.5 p-4 border rounded-2xl border-white/10 bg-slate-900/55"
            >
              <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-300 flex-shrink-0" />
              <p className="text-sm leading-relaxed text-slate-300">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl md:text-4xl font-display">
          Cas d'usage
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.title}
                className="p-5 border rounded-2xl border-white/10 bg-slate-900/55"
              >
                <Icon className="w-5 h-5 text-cyan-300" />
                <h3 className="mt-3 text-lg font-semibold text-slate-100">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
                  {useCase.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl md:text-4xl font-display">
          Comment ça marche
        </h2>
        <ol className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 p-4 border rounded-2xl border-white/10 bg-slate-900/55"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 text-sm font-bold text-cyan-100 border rounded-full border-cyan-300/40 bg-cyan-500/20">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed text-slate-300">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl md:text-4xl font-display">
          Pourquoi la VoIP est clé pour les PME
        </h2>
        <p className="max-w-3xl mt-4 leading-relaxed text-slate-300/90">
          La VoIP ne se limite pas à téléphoner moins cher. Elle apporte un
          pilotage métier plus fluide, une meilleure expérience client et une
          continuité de service adaptée aux équipes modernes.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          {pmeAdvantages.map((advantage) => {
            const Icon = advantage.icon;
            return (
              <div
                key={advantage.title}
                className="p-5 border rounded-2xl border-white/10 bg-slate-900/55"
              >
                <Icon className="w-5 h-5 text-cyan-300" />
                <h3 className="mt-3 font-semibold text-slate-100">
                  {advantage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="p-6 mt-16 border rounded-3xl border-cyan-300/15 bg-slate-900/70 sm:p-7">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl font-display">
          Parlez à un expert VoIP
        </h2>
        <p className="mt-3 text-slate-300/90">
          Nous vous aidons à choisir une configuration adaptée à votre volume
          d'appels, votre organisation et votre budget.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button href="/demo" variant="primary">
            Demander une démo
          </Button>
          <Button href="/demo#devis" variant="glass">
            Obtenir un devis
          </Button>
          <Link
            to="/tarifs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-200 transition-colors hover:text-cyan-100"
          >
            Voir les tarifs en FCFA
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl md:text-4xl font-display">
          FAQ VoIP
        </h2>
        <div className="mt-6 space-y-4">
          {voipFaqData.map((item) => (
            <div
              key={item.question}
              className="p-4 border rounded-2xl border-white/10 bg-slate-900/55 sm:p-5"
            >
              <h3 className="font-semibold text-slate-100">{item.question}</h3>
              <p className="mt-2 leading-relaxed text-slate-300/90">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <VoipQuoteForm />
    </div>
  );
};
