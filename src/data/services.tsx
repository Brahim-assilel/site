import type { ReactNode } from "react";
import {
  ShieldCheck,
  CloudCog,
  Network,
  Code2,
  Database,
  Headset,
  Laptop2,
  Workflow,
  PhoneCall,
  Archive,
  Bot,
  DatabaseZap,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  category: string;
  title: string;
  description: string;
  details: string[];
  icon: ReactNode;
};

export const services: ServiceItem[] = [
  {
    slug: "securite-si-conformite",
    category: "Cybersécurité",
    title: "Sécurité SI & Conformité",
    description:
      "Audit, durcissement et politiques de sécurité pour protéger vos actifs critiques.",
    details: [
      "Audit de sécurité applicatif et infrastructure",
      "Durcissement serveurs, endpoints et réseau",
      "Mise en place des bonnes pratiques ISO 27001",
      "Plan de réponse aux incidents",
    ],
    icon: <ShieldCheck className="w-7 h-7" />,
  },
  {
    slug: "migration-modernisation-cloud",
    category: "Cloud",
    title: "Migration & Modernisation Cloud",
    description:
      "Accompagnement de bout en bout pour migrer vos services sans rupture.",
    details: [
      "Stratégie de migration progressive",
      "Architecture haute disponibilité",
      "Optimisation des coûts cloud",
      "Supervision et observabilité",
    ],
    icon: <CloudCog className="w-7 h-7" />,
  },
  {
    slug: "reseau-systemes",
    category: "Infrastructure",
    title: "Réseau & Systèmes",
    description:
      "Conception et exploitation d'infrastructures robustes, évolutives et sécurisées.",
    details: [
      "Conception LAN/WAN/VPN",
      "Segmentation et contrôle d'accès",
      "Virtualisation et orchestration",
      "Sauvegarde et continuité d'activité",
    ],
    icon: <Network className="w-7 h-7" />,
  },
  {
    slug: "applications-metier",
    category: "Développement",
    title: "Applications Métier",
    description:
      "Création de solutions web sur mesure alignées avec vos objectifs opérationnels.",
    details: [
      "Conception UI/UX orientée conversion",
      "Développement front-end et back-end",
      "Intégration API et automatisation",
      "Déploiement CI/CD",
    ],
    icon: <Code2 className="w-7 h-7" />,
  },
  {
    slug: "gouvernance-donnees",
    category: "Data",
    title: "Gouvernance & Données",
    description:
      "Structuration de vos flux de données pour améliorer pilotage et performance.",
    details: [
      "Modélisation des données",
      "Sécurisation des accès et des échanges",
      "Tableaux de bord et indicateurs",
      "Qualité et traçabilité des données",
    ],
    icon: <Database className="w-7 h-7" />,
  },
  {
    slug: "assistance-exploitation",
    category: "Support",
    title: "Assistance & Exploitation",
    description:
      "Support proactif pour garantir disponibilité, performance et sérénité.",
    details: [
      "Maintenance préventive et corrective",
      "Support utilisateur et admin",
      "Supervision continue",
      "SLA adaptés à vos besoins",
    ],
    icon: <Headset className="w-7 h-7" />,
  },
  {
    slug: "developpement-web",
    category: "Développement",
    title: "Le développement web",
    description:
      "Création de sites et applications web performants, modernes et adaptés à vos besoins métier.",
    details: [
      "Conception front-end responsive",
      "Développement back-end et API",
      "Intégration et optimisation SEO technique",
      "Maintenance et évolutivité",
    ],
    icon: <Laptop2 className="w-7 h-7" />,
  },
  {
    slug: "conception-systemes-information",
    category: "Architecture",
    title: "Conception de systèmes d'informations",
    description:
      "Conception d'architectures SI robustes, évolutives et alignées avec vos objectifs stratégiques.",
    details: [
      "Cartographie et urbanisation du SI",
      "Définition d'architecture cible",
      "Gouvernance et interopérabilité",
      "Plan de transformation progressive",
    ],
    icon: <Workflow className="w-7 h-7" />,
  },
  {
    slug: "voip",
    category: "Télécom",
    title: "VoIP",
    description:
      "Déploiement de solutions VoIP fiables pour améliorer la communication interne et externe.",
    details: [
      "Mise en place de standard IP",
      "Configuration postes et softphones",
      "Sécurisation des flux voix",
      "Supervision qualité et disponibilité",
    ],
    icon: <PhoneCall className="w-7 h-7" />,
  },
  {
    slug: "numerisation-archives",
    category: "Gestion documentaire",
    title: "Numérisation des archives",
    description:
      "Conversion et structuration de vos archives papier en formats numériques exploitables et sécurisés.",
    details: [
      "Audit et préparation des archives",
      "Numérisation haute qualité et indexation",
      "Classement et recherche rapide des documents",
      "Stockage sécurisé et plan de sauvegarde",
    ],
    icon: <Archive className="w-7 h-7" />,
  },
  {
    slug: "creation-agents-ai-sur-mesure",
    category: "Intelligence artificielle",
    title: "Création des agents AI sur mesure",
    description:
      "Conception d'agents intelligents adaptés à vos processus métier pour automatiser, assister et accélérer vos opérations.",
    details: [
      "Analyse des cas d'usage et des objectifs",
      "Conception de prompts et workflows personnalisés",
      "Intégration aux outils internes (CRM, support, base de connaissance)",
      "Suivi des performances et amélioration continue",
    ],
    icon: <Bot className="w-7 h-7" />,
  },
  {
    slug: "optimisation-dhis2",
    category: "Systèmes d'Information",
    title: "Optimisation et Maintenance DHIS2",
    description:
      "Audit de performance, optimisation et maintenance pour les instances DHIS2.",
    details: [
      "Diagnostic de performance (serveur, réseau, base de données)",
      "Optimisation de la configuration (PostgreSQL, Tomcat)",
      "Mise en place de cache et de maintenance automatisée",
    ],
    icon: <DatabaseZap className="w-7 h-7" />,
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
