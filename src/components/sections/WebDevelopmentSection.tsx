import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Gauge,
  LayoutDashboard,
  Layers3,
  LineChart,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { Button } from "../ui/Button";
import { submitForm } from "../../lib/submitForm";
import { trackEvent } from "../../lib/analytics";

export const WebDevelopmentSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "site-vitrine",
    budget: "",
    deadline: "",
    message: "",
    __hp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const deliverables = [
    {
      title: "Site Vitrine",
      description: "Présence en ligne claire, crédible et orientée conversion.",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Application Web",
      description: "Outils métier sur mesure avec logique, rôles et automatisation.",
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      title: "E-commerce",
      description: "Catalogue, paiements, commandes et pilotage des ventes.",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      title: "Dashboard Admin",
      description: "Gestion simple de vos données, contenus et indicateurs clés.",
      icon: <LineChart className="w-5 h-5" />,
    },
  ];

  const outcomes = [
    {
      title: "Plus de leads qualifiés",
      icon: <Target className="w-4 h-4" />,
    },
    {
      title: "Process plus rapides",
      icon: <Rocket className="w-4 h-4" />,
    },
    {
      title: "Expérience client renforcée",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      title: "Décisions guidées par la donnée",
      icon: <Gauge className="w-4 h-4" />,
    },
  ];

  const packages = [
    {
      name: "Starter",
      target: "Site vitrine",
      includes: [
        "Design responsive",
        "SEO de base",
        "Formulaire de contact",
      ],
    },
    {
      name: "Business",
      target: "App + dashboard",
      includes: [
        "Authentification et rôles",
        "Modules métier",
        "Suivi des performances",
      ],
    },
    {
      name: "Scale",
      target: "Plateforme complète",
      includes: [
        "Architecture évolutive",
        "Intégrations API",
        "Automatisation des flux",
      ],
    },
  ];

  const processSteps = [
    {
      title: "1. Cadrage",
      description:
        "Atelier de besoins, objectifs métier, priorisation et planning réaliste.",
      icon: <Workflow className="w-4 h-4" />,
    },
    {
      title: "2. Conception",
      description:
        "Architecture technique, maquettes et définition claire des fonctionnalités.",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      title: "3. Développement",
      description:
        "Implémentation front-end/back-end avec tests, sécurité et qualité de code.",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      title: "4. Mise en ligne",
      description:
        "Déploiement, suivi, maintenance proactive et amélioration continue.",
      icon: <Gauge className="w-4 h-4" />,
    },
  ];
  const clientCases = [
    {
      client: "PME Services B2B",
      problem: "Site lent, peu de demandes qualifiées, faible visibilité locale.",
      solution:
        "Refonte du site, optimisation SEO technique et formulaires orientés conversion.",
      result: "+68% de demandes entrantes en 90 jours.",
    },
    {
      client: "Entreprise Logistique",
      problem: "Suivi d'activité dispersé sur Excel et emails.",
      solution:
        "Application web métier avec rôles, workflow de validation et dashboard.",
      result: "-42% de temps de traitement opérationnel.",
    },
    {
      client: "Commerce multi-produits",
      problem: "Parcours d'achat complexe et abandon panier élevé.",
      solution:
        "Refonte UX e-commerce, simplification checkout et suivi analytics.",
      result: "+31% de taux de conversion sur 8 semaines.",
    },
  ];
  const projects = [
    {
      name: "Portail Client Support",
      stack: "React • API REST • PostgreSQL",
      delay: "2 semaines",
      impact: "Centralisation des tickets et meilleur SLA.",
    },
    {
      name: "Dashboard Commercial",
      stack: "React • Node.js • BI",
      delay: "10 jours",
      impact: "Vision pipeline en temps réel pour l'équipe sales.",
    },
    {
      name: "Plateforme E-commerce",
      stack: "Front sur mesure • Paiement • Tracking",
      delay: "3 semaines",
      impact: "Parcours client simplifié et hausse du CA digital.",
    },
  ];

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuickQuote = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitError("Nom et email sont requis.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);
    try {
      const submitMode = await submitForm("/api/form-submit", formData, {
        formName: "web_devis_rapide",
      });
      trackEvent("form_submit", {
        form_name: "web_devis_rapide",
        submit_mode: submitMode,
      });
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer.";
      setSubmitError(message);
      trackEvent("form_submit_error", {
        form_name: "web_devis_rapide",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="developpement-web" className="py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Développement Web
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Nous concevons des sites et applications web robustes, évolutifs et
            pensés pour vos objectifs métier.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              viewport={{ once: true, amount: 0.4 }}
              className="p-6 border rounded-2xl bg-slate-900/50 border-white/10"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-xl bg-cyan-500/15 text-cyan-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true, amount: 0.3 }}
            className="p-6 border rounded-2xl bg-slate-900/50 border-white/10"
          >
            <h3 className="text-xl font-bold text-slate-100">Résultats attendus</h3>
            <div className="mt-4 overflow-hidden border rounded-xl border-white/10">
              <img
                src="/web-dev-person-color.jpg"
                alt="Personne travaillant sur la création d'un site internet"
                className="object-cover object-[72%_62%] w-full h-64 md:h-72"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2">
              {outcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="flex items-center gap-2 p-3 border rounded-xl bg-slate-800/50 border-white/10 text-slate-300"
                >
                  <span className="text-cyan-300">{outcome.icon}</span>
                  <p className="text-sm">{outcome.title}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            viewport={{ once: true, amount: 0.3 }}
            className="p-6 border rounded-2xl bg-slate-900/50 border-white/10"
          >
            <div className="flex items-center gap-2">
              <Layers3 className="w-5 h-5 text-emerald-300" />
              <h3 className="text-xl font-bold text-slate-100">Packages</h3>
            </div>
            <div className="mt-4 space-y-3">
              {packages.map((pack) => (
                <div
                  key={pack.name}
                  className="p-4 border rounded-xl bg-slate-800/50 border-white/10"
                >
                  <p className="font-semibold text-slate-100">
                    {pack.name} <span className="text-cyan-300">({pack.target})</span>
                  </p>
                  <ul className="mt-2 space-y-1">
                    {pack.includes.map((item) => (
                      <li key={item} className="text-sm text-slate-400">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/50 border-white/10"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-bold text-slate-100">
              Process de réalisation
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.title}
                className="p-4 border rounded-xl bg-slate-800/50 border-white/10"
              >
                <div className="flex items-center gap-2 text-cyan-300">
                  {step.icon}
                  <p className="font-semibold">{step.title}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/50 border-white/10"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-bold text-slate-100">Mini Cas Clients</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-3">
            {clientCases.map((item) => (
              <div
                key={item.client}
                className="p-4 border rounded-xl bg-slate-800/50 border-white/10"
              >
                <p className="font-semibold text-slate-100">{item.client}</p>
                <p className="mt-2 text-xs text-slate-400">
                  <span className="text-slate-300">Problème:</span> {item.problem}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  <span className="text-slate-300">Solution:</span> {item.solution}
                </p>
                <p className="mt-3 text-sm font-semibold text-cyan-300">
                  Résultat: {item.result}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="realisations-web"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/50 border-white/10"
        >
          <h3 className="text-xl font-bold text-slate-100">Réalisations</h3>
          <p className="mt-2 text-sm text-slate-400">
            Exemples de livrables orientés performance, adoption et ROI métier.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className="p-4 border rounded-xl bg-slate-800/50 border-white/10"
              >
                <p className="font-semibold text-slate-100">{project.name}</p>
                <p className="mt-1 text-xs text-cyan-300">{project.stack}</p>
                <p className="mt-2 text-xs text-slate-400">
                  Délai de réalisation: <span className="text-slate-300">{project.delay}</span>
                </p>
                <p className="mt-2 text-xs text-slate-400">{project.impact}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div
          id="devis-rapide-web"
          className="p-6 mt-6 border rounded-2xl bg-slate-900/50 border-cyan-300/20"
        >
          <h3 className="text-xl font-bold text-slate-100">
            Devis Rapide Web
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Répondez en 1 minute, nous revenons vers vous sous 24h.
          </p>

          {isSubmitted ? (
            <div className="p-4 mt-5 border rounded-xl bg-emerald-900/30 border-emerald-400/30">
              <p className="font-semibold text-emerald-300">
                Demande envoyée avec succès.
              </p>
              <p className="mt-1 text-sm text-emerald-400">
                Notre équipe vous contacte rapidement pour affiner le périmètre.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuickQuote} className="mt-5 space-y-4">
              <input
                type="text"
                name="__hp"
                value={formData.__hp}
                onChange={handleFormChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Nom complet"
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="site-vitrine">Site vitrine</option>
                  <option value="application-web">Application web</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="dashboard-admin">Dashboard admin</option>
                </select>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleFormChange}
                  placeholder="Budget estimatif (optionnel)"
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleFormChange}
                  placeholder="Délai souhaité (optionnel)"
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 md:col-span-2"
                />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Décrivez brièvement votre besoin..."
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 md:col-span-2"
                />
              </div>
              {submitError ? (
                <p className="text-sm text-red-400">{submitError}</p>
              ) : null}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button as="button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi..." : "Envoyer mon devis rapide"}
                </Button>
                <Button href="/contact" variant="glass">
                  Besoin d&apos;un échange direct
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="p-8 mt-10 text-center border rounded-3xl bg-slate-900/40 border-cyan-300/20">
          <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-cyan-300">
            Prêt à lancer votre projet web ?
          </p>
          <p className="text-slate-300">
            Livraison rapide, code propre et accompagnement local.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:flex-row">
            <Button href="/#devis-rapide-web" variant="primary">
              Demander un devis
            </Button>
            <Button href="/#realisations-web" variant="glass">
              Voir nos réalisations <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Réponse sous 24h ouvrées pour cadrer votre besoin.
          </p>
        </div>
      </div>
    </section>
  );
};
