import { type SyntheticEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Code2,
  CreditCard,
  FileCheck2,
  Gauge,
  HelpCircle,
  LayoutDashboard,
  Layers3,
  LineChart,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Wrench,
  Workflow,
  Zap,
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [auditFormData, setAuditFormData] = useState({
    name: "",
    email: "",
    websiteStatus: "pas-de-site",
    objective: "plus-de-leads",
    urgency: "ce-mois",
    budgetRange: "300k-800k",
    message: "",
    __hp: "",
  });
  const [isAuditSubmitting, setIsAuditSubmitting] = useState(false);
  const [isAuditSubmitted, setIsAuditSubmitted] = useState(false);
  const [auditSubmitError, setAuditSubmitError] = useState("");
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [estimator, setEstimator] = useState({
    projectType: "site-vitrine",
    complexity: "standard",
    contentReady: "yes",
    integrations: "none",
  });
  const handleProjectPreviewError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const fallbackState = image.dataset.fallbackState ?? "0";

    if (fallbackState === "0") {
      image.dataset.fallbackState = "1";
      image.src = "/portfolio-fallback.avif";
      return;
    }

    if (fallbackState === "1") {
      image.dataset.fallbackState = "2";
      image.src = "/portfolio-fallback.webp";
      return;
    }

    image.onerror = null;
  };

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
      delay: "3 jours",
      priceHint: "Budget maîtrisé",
      includes: [
        "Design responsive",
        "SEO de base",
        "Formulaire de contact",
      ],
    },
    {
      name: "Business",
      target: "App + dashboard",
      delay: "1 a 2 semaines max",
      priceHint: "Meilleur ratio valeur / delai",
      includes: [
        "Authentification et rôles",
        "Modules métier",
        "Suivi des performances",
      ],
    },
    {
      name: "Scale",
      target: "Plateforme complète",
      delay: "1 a 3 semaines",
      priceHint: "Performance et automatisation",
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
      week: "J1",
    },
    {
      title: "2. Conception",
      description:
        "Architecture technique, maquettes et définition claire des fonctionnalités.",
      icon: <LayoutDashboard className="w-4 h-4" />,
      week: "J2-J3",
    },
    {
      title: "3. Développement",
      description:
        "Implémentation front-end/back-end avec tests, sécurité et qualité de code.",
      icon: <Code2 className="w-4 h-4" />,
      week: "S1-S2",
    },
    {
      title: "4. Mise en ligne",
      description:
        "Déploiement, suivi, maintenance proactive et amélioration continue.",
      icon: <Gauge className="w-4 h-4" />,
      week: "Go-Live",
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
      name: "Stripe",
      stack: "SaaS • Checkout • Developer UX",
      delay: "Inspiration Site vitrine + produit",
      impact: "Exemple d'interface claire orientee conversion.",
      category: "site-vitrine",
      preview:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fm=webp&fit=crop&w=1200&q=80",
      href: "https://stripe.com",
    },
    {
      name: "Notion",
      stack: "Product app • Collaboration",
      delay: "Inspiration Application web",
      impact: "Exemple de produit web ergonomique et scalable.",
      category: "application-web",
      preview:
        "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fm=webp&fit=crop&w=1200&q=80",
      href: "https://www.notion.so",
    },
    {
      name: "Allbirds",
      stack: "E-commerce • Storytelling • CRO",
      delay: "Inspiration E-commerce performant",
      impact: "Exemple de parcours produit et checkout optimise.",
      category: "ecommerce",
      preview:
        "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fm=webp&fit=crop&w=1200&q=80",
      href: "https://www.allbirds.com",
    },
    {
      name: "Linear",
      stack: "SaaS • Product-led",
      delay: "Inspiration Site premium",
      impact: "Exemple de design produit haut niveau.",
      category: "site-vitrine",
      preview:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fm=webp&fit=crop&w=1200&q=80",
      href: "https://linear.app",
    },
    {
      name: "Figma",
      stack: "Application Web • Collaboration",
      delay: "Inspiration plateforme collaborative",
      impact: "Exemple de web app avec experience fluide.",
      category: "application-web",
      preview:
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fm=webp&fit=crop&w=1200&q=80",
      href: "https://www.figma.com",
    },
    {
      name: "Jumia",
      stack: "Shop • Branding • Mobile-first",
      delay: "Inspiration marque e-commerce",
      impact: "Exemple de conversion par design et contenu.",
      category: "ecommerce",
      preview: "/jumia-logo-official.png",
      href: "https://www.jumia.com",
    },
  ];

  const guarantees = [
    "Code versionne et structure propre",
    "Performance Lighthouse orientee Core Web Vitals",
    "SEO technique et schema de base",
    "Securite baseline (headers, validation, anti-spam)",
    "Documentation admin et passation claire",
    "Support post-livraison planifie",
  ];

  const trustStats = [
    { label: "Taux de livraison", value: "98%" },
    { label: "Reactivite support", value: "< 24h" },
    { label: "Clients satisfaits", value: "95%" },
  ];

  const testimonials = [
    {
      author: "Direction PME Services",
      quote:
        "Equipe rigoureuse, delais tenus, et surtout un site qui genere enfin des demandes qualifiees.",
    },
    {
      author: "Responsable Operations",
      quote:
        "Le dashboard a simplifie nos flux internes. On a gagne du temps des la premiere semaine.",
    },
  ];

  const paymentMilestones = [
    {
      title: "1. Acompte de demarrage",
      percent: "40%",
      detail: "Validation du cahier des charges, lancement design et architecture.",
    },
    {
      title: "2. Milestone intermediaire",
      percent: "40%",
      detail: "Validation de la version beta fonctionnelle (front/back selon projet).",
    },
    {
      title: "3. Livraison finale",
      percent: "20%",
      detail: "Mise en ligne, transfert des acces et support de stabilisation inclus.",
    },
  ];

  const webFaq = [
    {
      question: "En combien de temps mon projet peut etre livre ?",
      answer:
        "Site vitrine: 3 jours. Application web: 1 a 2 semaines max. E-commerce/portail: 1 a 3 semaines, selon complexite et integrations.",
    },
    {
      question: "Le code et les acces m'appartiendront-ils ?",
      answer:
        "Oui. En fin de projet, vous recevez les acces techniques, le code source et une passation claire pour garder le controle total.",
    },
    {
      question: "Proposez-vous une maintenance apres mise en ligne ?",
      answer:
        "Oui. Nous proposons un suivi incluant correctifs, securite, petites evolutions et supervision des performances.",
    },
    {
      question: "Peut-on payer en plusieurs etapes ?",
      answer:
        "Oui, le paiement est jalonne en 3 etapes: acompte, milestone beta, livraison finale. Cela securise les deux parties.",
    },
  ];

  const filteredProjects = useMemo(() => {
    if (portfolioFilter === "all") return projects;
    return projects.filter((project) => project.category === portfolioFilter);
  }, [portfolioFilter, projects]);

  const estimate = useMemo(() => {
    const baseMap = {
      "site-vitrine": { delay: "3 jours", budget: "250 000 - 700 000 FCFA" },
      "application-web": { delay: "1 a 2 semaines max", budget: "800 000 - 2 500 000 FCFA" },
      ecommerce: { delay: "1 a 3 semaines", budget: "1 500 000 - 4 500 000 FCFA" },
    };
    const complexityDelta =
      estimator.complexity === "advanced"
        ? "+30%"
        : estimator.complexity === "simple"
          ? "-15%"
          : "standard";
    const integrationDelta = estimator.integrations === "many" ? "+5 a 10 jours" : "0 a 3 jours";

    return {
      ...baseMap[estimator.projectType as keyof typeof baseMap],
      complexityDelta,
      integrationDelta,
      note:
        estimator.contentReady === "yes"
          ? "Contenus prets: delai optimise."
          : "Contenus a produire: prevoir une marge supplementaire.",
    };
  }, [estimator]);

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

  const handleAuditFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setAuditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAudit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!auditFormData.name.trim() || !auditFormData.email.trim()) {
      setAuditSubmitError("Nom et email sont requis.");
      return;
    }

    setAuditSubmitError("");
    setIsAuditSubmitting(true);
    try {
      const submitMode = await submitForm("/api/form-submit", auditFormData, {
        formName: "web_audit_express",
      });
      trackEvent("form_submit", {
        form_name: "web_audit_express",
        submit_mode: submitMode,
      });
      setIsAuditSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez reessayer.";
      setAuditSubmitError(message);
      trackEvent("form_submit_error", {
        form_name: "web_audit_express",
      });
    } finally {
      setIsAuditSubmitting(false);
    }
  };

  const handleChooseProject = (projectName: string, projectType: string) => {
    setFormData((prev) => ({
      ...prev,
      projectType,
      message: `Je souhaite un projet dans le style de ${projectName}.`,
    }));
    document.getElementById("devis-rapide-web")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="developpement-web" className="relative py-20 overflow-hidden md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="inline-flex px-4 py-1 text-xs font-semibold tracking-[0.18em] uppercase border rounded-full border-cyan-300/30 bg-cyan-400/10 text-cyan-200">
            Studio Web Assilel-Tech
          </p>
          <h2 className="mt-4 mb-4 text-4xl font-bold tracking-tight text-transparent md:text-6xl bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Développement Web
          </h2>
          <p className="max-w-3xl mx-auto text-base leading-relaxed text-slate-300 md:text-lg">
            Nous concevons des sites et applications web robustes, évolutifs et
            pensés pour vos objectifs métier, avec un cadre de livraison rapide
            et transparent.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:flex-row">
            <Button href="#devis-rapide-web" className="w-full sm:w-auto">
              Lancer mon projet
            </Button>
            <Button href="#realisations-web" variant="glass" className="w-full sm:w-auto">
              Voir les inspirations
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              viewport={{ once: true, amount: 0.4 }}
              className="h-full p-6 border rounded-2xl bg-slate-900/60 border-white/10 backdrop-blur-sm hover:border-cyan-300/30 transition-colors"
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

        <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true, amount: 0.3 }}
            className="p-6 border rounded-2xl bg-slate-900/60 border-white/10"
          >
            <h3 className="text-xl font-bold text-slate-100">Résultats attendus</h3>
            <div className="mt-4 overflow-hidden border rounded-xl border-white/10">
              <img
                src="/web-dev-person-color.jpg"
                alt="Personne travaillant sur la création d'un site internet"
                className="object-cover object-[72%_62%] w-full h-64 md:h-80"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2">
              {outcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="flex items-center gap-2 p-3 border rounded-xl bg-slate-800/60 border-white/10 text-slate-300"
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
            className="p-6 border rounded-2xl bg-slate-900/60 border-white/10"
          >
            <div className="flex items-center gap-2">
              <Layers3 className="w-5 h-5 text-emerald-300" />
              <h3 className="text-xl font-bold text-slate-100">Packages</h3>
            </div>
            <div className="mt-4 space-y-3">
              {packages.map((pack) => (
                <div
                  key={pack.name}
                  className="p-4 border rounded-xl bg-slate-800/60 border-white/10 hover:border-cyan-300/30 transition-colors"
                >
                  <p className="font-semibold text-slate-100">
                    {pack.name} <span className="text-cyan-300">({pack.target})</span>
                  </p>
                  <p className="mt-1 text-xs text-emerald-300">
                    {pack.delay} • {pack.priceHint}
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
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
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
                className="p-4 border rounded-xl bg-slate-800/60 border-white/10"
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
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-cyan-300/20"
        >
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-300" />
            <h3 className="text-xl font-bold text-slate-100">Parcours client</h3>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Brief, maquette, dev, tests et mise en ligne avec suivi visuel des étapes.
          </p>
          <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={`flow-${step.title}`}
                className="p-4 border rounded-xl bg-slate-800/60 border-white/10"
              >
                <p className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                  Étape {index + 1}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-100">
                  {step.title.replace(/^\d+\.\s*/, "")}
                </p>
                <p className="mt-2 text-xs text-slate-400">{step.week}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
        >
          <div className="flex items-center gap-2">
            <Clock3 className="w-5 h-5 text-cyan-300" />
            <h3 className="text-xl font-bold text-slate-100">
              Timeline projet
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={`timeline-${step.title}`}
                className="p-4 border rounded-xl bg-slate-800/60 border-white/10"
              >
                <p className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                  {step.week}
                </p>
                <p className="mt-2 font-semibold text-slate-100">{step.title}</p>
                <p className="mt-2 text-sm text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
        >
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-bold text-slate-100">
              Engagements techniques
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2">
            {guarantees.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 p-3 text-sm border rounded-xl bg-slate-800/60 border-white/10 text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-bold text-slate-100">Mini Cas Clients</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-3">
            {clientCases.map((item) => (
              <div
                key={item.client}
                className="p-4 border rounded-xl bg-slate-800/60 border-white/10"
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
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-slate-100">
              Portfolio d&apos;inspiration
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Tous", value: "all" },
                { label: "Site vitrine", value: "site-vitrine" },
                { label: "Application web", value: "application-web" },
                { label: "E-commerce", value: "ecommerce" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setPortfolioFilter(filter.value)}
                  className={`px-3 py-1.5 text-xs border rounded-lg transition ${
                    portfolioFilter === filter.value
                      ? "border-cyan-300 bg-cyan-400/10 text-cyan-200"
                      : "border-white/15 bg-slate-800/40 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            References web reelles pour aider vos choix de style, structure et experience.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.name}
                className="overflow-hidden border rounded-xl bg-slate-800/60 border-white/10 hover:border-cyan-300/30 transition-colors h-full flex flex-col"
              >
                <div className="h-48 p-4 bg-slate-900/70">
                  <img
                    src={project.preview}
                    alt={`Apercu ${project.name}`}
                    className="object-contain w-full h-full"
                    loading="lazy"
                    onError={handleProjectPreviewError}
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <p className="font-semibold text-slate-100">{project.name}</p>
                  <p className="mt-1 text-xs text-cyan-300">{project.stack}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {project.delay}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{project.impact}</p>
                  <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:mt-auto">
                    <Button
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      Voir le site
                    </Button>
                    <Button
                      as="button"
                      type="button"
                      variant="glass"
                      className="w-full sm:w-auto"
                      onClick={() =>
                        handleChooseProject(project.name, project.category)
                      }
                    >
                      Choisir ce style
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-cyan-300/20"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-300" />
            <h3 className="text-xl font-bold text-slate-100">
              Estimateur instantane
            </h3>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Obtenez une estimation rapide du delai et de la fourchette budgetaire.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
            <select
              value={estimator.projectType}
              onChange={(event) =>
                setEstimator((prev) => ({ ...prev, projectType: event.target.value }))
              }
              className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="site-vitrine">Site vitrine</option>
              <option value="application-web">Application web</option>
              <option value="ecommerce">E-commerce / Portail</option>
            </select>
            <select
              value={estimator.complexity}
              onChange={(event) =>
                setEstimator((prev) => ({ ...prev, complexity: event.target.value }))
              }
              className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="simple">Complexite simple</option>
              <option value="standard">Complexite standard</option>
              <option value="advanced">Complexite avancee</option>
            </select>
            <select
              value={estimator.contentReady}
              onChange={(event) =>
                setEstimator((prev) => ({ ...prev, contentReady: event.target.value }))
              }
              className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="yes">Contenus deja prets</option>
              <option value="no">Contenus a produire</option>
            </select>
            <select
              value={estimator.integrations}
              onChange={(event) =>
                setEstimator((prev) => ({ ...prev, integrations: event.target.value }))
              }
              className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="none">Peu d'integrations externes</option>
              <option value="many">Plusieurs integrations externes</option>
            </select>
          </div>
          <div className="p-4 mt-5 border rounded-xl bg-slate-800/60 border-white/10">
            <p className="text-sm text-slate-300">
              Delai estime: <span className="font-semibold text-cyan-300">{estimate.delay}</span>
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Budget estime: <span className="font-semibold text-cyan-300">{estimate.budget}</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Complexite: {estimate.complexityDelta} • Integrations: {estimate.integrationDelta}
            </p>
            <p className="mt-1 text-xs text-slate-400">{estimate.note}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
        >
          <h3 className="text-xl font-bold text-slate-100">Preuves de confiance</h3>
          <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-3">
            {trustStats.map((item) => (
              <div
                key={item.label}
                className="p-4 text-center border rounded-xl bg-slate-800/60 border-white/10"
              >
                <p className="text-2xl font-bold text-cyan-300">{item.value}</p>
                <p className="mt-1 text-xs text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote
                key={item.author}
                className="p-4 text-sm border rounded-xl bg-slate-800/60 border-white/10 text-slate-300"
              >
                <p>&quot;{item.quote}&quot;</p>
                <footer className="mt-2 text-xs text-cyan-300">{item.author}</footer>
              </blockquote>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-300" />
            <h3 className="text-xl font-bold text-slate-100">Paiement et jalons</h3>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Un cadre simple et transparent pour avancer sereinement a chaque etape.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-3">
            {paymentMilestones.map((step) => (
              <div
                key={step.title}
                className="p-4 border rounded-xl bg-slate-800/60 border-white/10"
              >
                <p className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                  {step.percent}
                </p>
                <p className="mt-2 font-semibold text-slate-100">{step.title}</p>
                <p className="mt-2 text-sm text-slate-400">{step.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-white/10"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-bold text-slate-100">FAQ web</h3>
          </div>
          <div className="mt-5 space-y-3">
            {webFaq.map((item, index) => (
              <div
                key={item.question}
                className="overflow-hidden border rounded-xl bg-slate-800/60 border-white/10"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaqIndex((prev) => (prev === index ? null : index))
                  }
                  className="flex items-center justify-between w-full gap-4 px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-slate-100">
                    {item.question}
                  </span>
                  <span className="text-cyan-300">
                    {openFaqIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openFaqIndex === index ? (
                  <p className="px-4 pb-4 text-sm leading-relaxed text-slate-400">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-cyan-300/20"
        >
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-cyan-300" />
            <h3 className="text-xl font-bold text-slate-100">Audit express gratuit</h3>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Repondez a 5 questions, recevez un retour priorise sur vos gains rapides.
          </p>

          {isAuditSubmitted ? (
            <div className="p-4 mt-5 border rounded-xl bg-emerald-900/30 border-emerald-400/30">
              <p className="font-semibold text-emerald-300">
                Audit express envoye avec succes.
              </p>
              <p className="mt-1 text-sm text-emerald-400">
                Nous vous revenons avec des recommandations concretes sous 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitAudit} className="mt-5 space-y-4">
              <input
                type="text"
                name="__hp"
                value={auditFormData.__hp}
                onChange={handleAuditFormChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={auditFormData.name}
                  onChange={handleAuditFormChange}
                  placeholder="Nom complet"
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="email"
                  name="email"
                  value={auditFormData.email}
                  onChange={handleAuditFormChange}
                  placeholder="Email professionnel"
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <select
                  name="websiteStatus"
                  value={auditFormData.websiteStatus}
                  onChange={handleAuditFormChange}
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="pas-de-site">Je n&apos;ai pas encore de site</option>
                  <option value="site-obsolete">J&apos;ai un site obsolete</option>
                  <option value="site-actif">J&apos;ai un site deja actif</option>
                </select>
                <select
                  name="objective"
                  value={auditFormData.objective}
                  onChange={handleAuditFormChange}
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="plus-de-leads">Generer plus de leads</option>
                  <option value="mieux-convertir">Mieux convertir mes visiteurs</option>
                  <option value="automatiser">Automatiser des operations</option>
                </select>
                <select
                  name="urgency"
                  value={auditFormData.urgency}
                  onChange={handleAuditFormChange}
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="ce-mois">Lancement ce mois-ci</option>
                  <option value="sous-3-mois">Dans les 3 mois</option>
                  <option value="plus-tard">Projet plus tard</option>
                </select>
                <select
                  name="budgetRange"
                  value={auditFormData.budgetRange}
                  onChange={handleAuditFormChange}
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="300k-800k">300k - 800k FCFA</option>
                  <option value="800k-2m5">800k - 2.5M FCFA</option>
                  <option value="2m5-plus">2.5M+ FCFA</option>
                </select>
                <textarea
                  name="message"
                  rows={3}
                  value={auditFormData.message}
                  onChange={handleAuditFormChange}
                  placeholder="Contrainte principale ou besoin specifique (optionnel)"
                  className="w-full px-4 py-3 border rounded-xl bg-slate-800/60 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 md:col-span-2"
                />
              </div>
              {auditSubmitError ? (
                <p className="text-sm text-red-400">{auditSubmitError}</p>
              ) : null}
              <Button as="button" type="submit" disabled={isAuditSubmitting} className="w-full sm:w-auto">
                {isAuditSubmitting ? "Envoi..." : "Demander mon audit express"}
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-cyan-300/20"
        >
          <h3 className="text-xl font-bold text-slate-100">Prêt à passer à l&apos;action ?</h3>
          <p className="mt-2 text-sm text-slate-400">
            Choisissez un modèle inspirant et lancez votre devis pour démarrer cette semaine.
          </p>
          <div className="flex flex-col gap-3 mt-5 sm:flex-row">
            <Button href="#devis-rapide-web" className="w-full sm:w-auto">
              Démarrer mon projet web
            </Button>
            <Button href="/contact" variant="glass" className="w-full sm:w-auto">
              Parler à un expert
            </Button>
          </div>
        </motion.div>

        <div
          id="devis-rapide-web"
          className="p-6 mt-6 border rounded-2xl bg-slate-900/60 border-cyan-300/20"
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
                <Button as="button" type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Envoi..." : "Envoyer mon devis rapide"}
                </Button>
                <Button href="/contact" variant="glass" className="w-full sm:w-auto">
                  Besoin d&apos;un échange direct
                </Button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

