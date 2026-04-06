import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Filter, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { services, type ServiceItem } from "../../data/services";

type NeedTag = "visibilite" | "vente" | "automatisation";
type BudgetTag = "faible" | "moyen" | "eleve";
type DelayTag = "rapide" | "standard" | "avance";

type ServiceProfile = {
  need: NeedTag;
  budget: BudgetTag;
  delay: DelayTag;
  resultBadge: string;
  miniCase: {
    problem: string;
    solution: string;
    result: string;
  };
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
};

const categoryProfiles: Record<string, ServiceProfile> = {
  "Cybersécurité": {
    need: "automatisation",
    budget: "moyen",
    delay: "standard",
    resultBadge: "-40% risques critiques",
    miniCase: {
      problem: "Systèmes exposés et audits irréguliers.",
      solution: "Audit, durcissement et plan de remédiation priorisé.",
      result: "Surface d'attaque réduite dès le premier mois.",
    },
    ctaPrimaryLabel: "Voir le plan sécurité",
    ctaPrimaryHref: "/services/securite-si-conformite",
  },
  Cloud: {
    need: "automatisation",
    budget: "eleve",
    delay: "avance",
    resultBadge: "-25% coûts infra",
    miniCase: {
      problem: "Charges cloud instables et disponibilité faible.",
      solution: "Refonte architecture + optimisation des ressources.",
      result: "Coût réduit et uptime renforcé.",
    },
    ctaPrimaryLabel: "Voir l'architecture cible",
    ctaPrimaryHref: "/services/migration-modernisation-cloud",
  },
  Infrastructure: {
    need: "automatisation",
    budget: "moyen",
    delay: "standard",
    resultBadge: "+99.9% disponibilité",
    miniCase: {
      problem: "Incidents réseau fréquents.",
      solution: "Segmentation, supervision et procédures d'exploitation.",
      result: "Stabilité réseau et incidents mieux maîtrisés.",
    },
    ctaPrimaryLabel: "Voir les détails infra",
    ctaPrimaryHref: "/services/reseau-systemes",
  },
  Développement: {
    need: "vente",
    budget: "moyen",
    delay: "rapide",
    resultBadge: "+30% conversion",
    miniCase: {
      problem: "Parcours client peu performant.",
      solution: "Refonte UX + développement orienté objectifs business.",
      result: "Hausse des demandes et meilleure conversion.",
    },
    ctaPrimaryLabel: "Voir un exemple",
    ctaPrimaryHref: "/#developpement-web",
  },
  Data: {
    need: "automatisation",
    budget: "moyen",
    delay: "standard",
    resultBadge: "+100% visibilité KPI",
    miniCase: {
      problem: "Décisions sans indicateurs fiables.",
      solution: "Structuration des flux et dashboards opérationnels.",
      result: "Pilotage quotidien basé sur la donnée.",
    },
    ctaPrimaryLabel: "Voir le cadre data",
    ctaPrimaryHref: "/services/gouvernance-donnees",
  },
  Support: {
    need: "automatisation",
    budget: "faible",
    delay: "rapide",
    resultBadge: "<24h réactivité",
    miniCase: {
      problem: "Pannes récurrentes et support lent.",
      solution: "SLA, supervision proactive et cellule support.",
      result: "Temps d'arrêt réduit et meilleure continuité.",
    },
    ctaPrimaryLabel: "Voir le support",
    ctaPrimaryHref: "/services/assistance-exploitation",
  },
  Architecture: {
    need: "automatisation",
    budget: "eleve",
    delay: "avance",
    resultBadge: "+35% efficacité SI",
    miniCase: {
      problem: "SI fragmenté, difficile à faire évoluer.",
      solution: "Architecture cible et feuille de route progressive.",
      result: "Décisions IT plus rapides et alignées business.",
    },
    ctaPrimaryLabel: "Voir la méthode",
    ctaPrimaryHref: "/services/conception-systemes-information",
  },
  Télécom: {
    need: "vente",
    budget: "faible",
    delay: "rapide",
    resultBadge: "-35% coûts téléphonie",
    miniCase: {
      problem: "Téléphonie coûteuse et peu flexible.",
      solution: "Déploiement VoIP sécurisé avec supervision qualité.",
      result: "Coût réduit et communications fluides.",
    },
    ctaPrimaryLabel: "Découvrir la VoIP",
    ctaPrimaryHref: "/voip",
  },
  "Gestion documentaire": {
    need: "automatisation",
    budget: "moyen",
    delay: "standard",
    resultBadge: "-60% temps recherche",
    miniCase: {
      problem: "Archives papier difficiles à exploiter.",
      solution: "Numérisation, indexation et stockage sécurisé.",
      result: "Accès rapide et meilleure traçabilité documentaire.",
    },
    ctaPrimaryLabel: "Voir le process",
    ctaPrimaryHref: "/services/numerisation-archives",
  },
  "Intelligence artificielle": {
    need: "automatisation",
    budget: "eleve",
    delay: "avance",
    resultBadge: "+50% productivité",
    miniCase: {
      problem: "Tâches répétitives chronophages.",
      solution: "Agents IA sur mesure intégrés aux outils internes.",
      result: "Équipes concentrées sur les tâches à forte valeur.",
    },
    ctaPrimaryLabel: "Voir un cas IA",
    ctaPrimaryHref: "/services/creation-agents-ai-sur-mesure",
  },
  "Systèmes d'Information": {
    need: "automatisation",
    budget: "moyen",
    delay: "standard",
    resultBadge: "+40% performance DHIS2",
    miniCase: {
      problem: "Instances DHIS2 lentes et instables.",
      solution: "Optimisation PostgreSQL/Tomcat + maintenance proactive.",
      result: "Réactivité accrue et meilleur confort d'usage.",
    },
    ctaPrimaryLabel: "Voir l'optimisation",
    ctaPrimaryHref: "/services/optimisation-dhis2",
  },
};

const defaultProfile: ServiceProfile = {
  need: "automatisation",
  budget: "moyen",
  delay: "standard",
  resultBadge: "+Valeur métier",
  miniCase: {
    problem: "Processus dispersés et faible visibilité.",
    solution: "Approche structurée, livrables clairs et exécution rapide.",
    result: "Meilleure performance opérationnelle.",
  },
  ctaPrimaryLabel: "Voir les détails",
  ctaPrimaryHref: "/#services",
};

const getServiceProfile = (service: ServiceItem): ServiceProfile =>
  categoryProfiles[service.category] ?? defaultProfile;

const comparisonRows = [
  {
    feature: "Idéal pour",
    starter: "Besoin rapide",
    business: "Croissance structurée",
    scale: "Système critique",
  },
  {
    feature: "Délai moyen",
    starter: "3 à 7 jours",
    business: "1 à 2 semaines",
    scale: "2 à 5 semaines",
  },
  {
    feature: "Pilotage projet",
    starter: "Simple",
    business: "Complet",
    scale: "Complet + multi-équipe",
  },
  {
    feature: "Automatisation",
    starter: "Partielle",
    business: "Avancée",
    scale: "Avancée + intégrations",
  },
  {
    feature: "Support",
    starter: "Standard",
    business: "Prioritaire",
    scale: "Prioritaire + SLA dédié",
  },
] as const;

export const ServicesSection = () => {
  const [needFilter, setNeedFilter] = useState<"all" | NeedTag>("all");
  const [budgetFilter, setBudgetFilter] = useState<"all" | BudgetTag>("all");
  const [delayFilter, setDelayFilter] = useState<"all" | DelayTag>("all");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const profile = getServiceProfile(service);
      const needMatch = needFilter === "all" || profile.need === needFilter;
      const budgetMatch =
        budgetFilter === "all" || profile.budget === budgetFilter;
      const delayMatch = delayFilter === "all" || profile.delay === delayFilter;
      return needMatch && budgetMatch && delayMatch;
    });
  }, [needFilter, budgetFilter, delayFilter]);

  return (
    <section id="services" className="relative py-20 md:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Nos services
          </h2>
          <p className="max-w-3xl mx-auto text-base leading-relaxed md:text-lg text-slate-300">
            Filtrez nos offres par besoin, budget et délai. Chaque service affiche
            un résultat attendu, un mini cas concret et des actions directes.
          </p>
        </div>

        <div className="p-4 mb-6 border rounded-2xl bg-slate-900/60 border-cyan-300/20 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-cyan-300" />
            <p className="text-sm font-semibold text-slate-200">
              Filtrer les services
            </p>
            <span className="ml-auto text-xs text-slate-400">
              {filteredServices.length} service(s)
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <select
              value={needFilter}
              onChange={(event) => setNeedFilter(event.target.value as "all" | NeedTag)}
              className="w-full px-4 py-3 text-sm border rounded-xl bg-slate-800/70 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">Besoin: Tous</option>
              <option value="visibilite">Visibilité</option>
              <option value="vente">Vente / Conversion</option>
              <option value="automatisation">Automatisation</option>
            </select>
            <select
              value={budgetFilter}
              onChange={(event) =>
                setBudgetFilter(event.target.value as "all" | BudgetTag)
              }
              className="w-full px-4 py-3 text-sm border rounded-xl bg-slate-800/70 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">Budget: Tous</option>
              <option value="faible">Faible</option>
              <option value="moyen">Moyen</option>
              <option value="eleve">Élevé</option>
            </select>
            <select
              value={delayFilter}
              onChange={(event) => setDelayFilter(event.target.value as "all" | DelayTag)}
              className="w-full px-4 py-3 text-sm border rounded-xl bg-slate-800/70 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">Délai: Tous</option>
              <option value="rapide">Rapide</option>
              <option value="standard">Standard</option>
              <option value="avance">Avancé</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => {
            const profile = getServiceProfile(service);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.05 },
                }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  y: -10,
                  scale: 1.015,
                  transition: { duration: 0.12, ease: "easeOut" },
                }}
                className="relative flex flex-col h-full p-6 transition-all duration-300 border shadow-2xl bg-slate-900/60 border-white/10 shadow-black/40 rounded-2xl backdrop-blur-xl hover:border-cyan-300/30"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="absolute inset-0 z-0 rounded-2xl"
                  aria-label={`Voir le service ${service.title}`}
                />

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <motion.div
                  whileHover={{
                    y: -3,
                    rotate: -10,
                    scale: 1.08,
                    transition: { duration: 0.10, ease: "easeOut" },
                  }}
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300"
                  >
                    {service.icon}
                  </motion.div>
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-300/25">
                    {profile.resultBadge}
                  </span>
                </div>

                <p className="relative z-10 mt-4 text-xs font-bold tracking-wider text-blue-400 uppercase">
                  {service.category}
                </p>
                <h3 className="relative z-10 mt-1 text-lg font-bold text-slate-100">
                  {service.title}
                </h3>
                <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>

                <div className="relative z-10 p-3 mt-4 border rounded-xl bg-slate-800/60 border-white/10">
                  <p className="text-xs font-semibold text-slate-200">Mini cas</p>
                  <p className="mt-1 text-xs text-slate-400">
                    <span className="text-slate-300">Problème:</span>{" "}
                    {profile.miniCase.problem}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    <span className="text-slate-300">Solution:</span>{" "}
                    {profile.miniCase.solution}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-cyan-300">
                    Résultat: {profile.miniCase.result}
                  </p>
                </div>

                <div className="relative z-10 flex flex-col gap-2 mt-5 sm:flex-row sm:flex-wrap sm:mt-auto">
                  <Button href={profile.ctaPrimaryHref} size="sm" className="w-full sm:w-auto">
                    {profile.ctaPrimaryLabel}
                  </Button>
                  <Button href="/#audit" variant="glass" size="sm" className="w-full sm:w-auto">
                    Demander un devis
                  </Button>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center w-full gap-1 text-xs font-semibold text-blue-300 transition-colors rounded-xl px-3 py-2 hover:text-white sm:w-auto"
                  >
                    Voir les détails <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-5 mt-8 border rounded-2xl bg-slate-900/60 border-white/10 md:mt-10">
          <h3 className="text-xl font-bold text-slate-100">Comparateur d'offres</h3>
          <p className="mt-2 text-sm text-slate-400">
            Comparez rapidement les formats d'accompagnement les plus demandés.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left">
                  <th className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-slate-400">
                    Critère
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-cyan-300">
                    Starter
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-emerald-300">
                    Business
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-violet-300">
                    Scale
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="bg-slate-800/55">
                    <td className="px-3 py-3 text-sm font-medium rounded-l-xl text-slate-200">
                      {row.feature}
                    </td>
                    <td className="px-3 py-3 text-sm text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-300" />
                        {row.starter}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        {row.business}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm rounded-r-xl text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        {row.feature === "Délai moyen" ? (
                          <Minus className="w-3.5 h-3.5 text-violet-300" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-violet-300" />
                        )}
                        {row.scale}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
