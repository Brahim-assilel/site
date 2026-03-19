export type StaticBlogShareMeta = {
  slug: string;
  title: string;
  description: string;
  image?: string;
};

export const staticBlogShareMeta: StaticBlogShareMeta[] = [
  {
    slug: "dhis2-lenteur-tchad",
    title:
      "DHIS2 au Tchad : Pourquoi le déploiement est-il si lent et comment y remédier ?",
    description:
      "Analyse des causes du déploiement lent de DHIS2 au Tchad et solutions concrètes pour accélérer l'adoption.",
    image: "/DHIS2 logo.svg",
  },
  {
    slug: "voip-pme",
    title: "La Révolution VoIP : Pourquoi votre PME ne peut plus s'en passer",
    description:
      "Découvrez pourquoi la VoIP est bien plus qu'une simple alternative technologique.",
  },
  {
    slug: "cybersecurite-pme",
    title: "Cybersécurité pour les PME : 5 Erreurs à Éviter d'Urgence",
    description:
      "Les cyberattaques ne ciblent pas que les grands groupes. Découvrez les 5 erreurs les plus courantes.",
  },
  {
    slug: "voip-importance-pme-guide-complet",
    title:
      "VoIP & PME : Le Guide Complet pour Comprendre l'Enjeu Stratégique en 2024",
    description:
      "Découvrez pourquoi migrer vers la VoIP n'est plus une option mais une nécessité pour les PME.",
  },
];
