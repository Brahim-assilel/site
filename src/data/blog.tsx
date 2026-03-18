import type { ReactNode } from "react";
import { Button } from "../components/ui/Button";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  date: string;
  readingTime: number; // in minutes
  content: ReactNode;
  footer: ReactNode;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "dhis2-lenteur-tchad",
    title: "DHIS2 au Tchad : Pourquoi est-il si lent et comment y remédier ?",
    description:
      "Analyse des causes de la lenteur de DHIS2 au Tchad et présentation de solutions concrètes pour optimiser ses performances et garantir sa pérennité.",
    image:
      "https://ehealth4everyone.com/wp-content/uploads/2022/10/dhis-2-blog-post-Facebook-Cover.png",
    category: "Systèmes d'Information",
    date: "2024-08-20",
    readingTime: 3,
    content: (
      <div className="space-y-12 text-slate-300">
        <section className="p-6 border rounded-2xl bg-red-950/30 border-red-400/20">
          <p className="text-lg leading-relaxed">
            Le DHIS2 est un outil formidable pour la gestion des données
            sanitaires, mais au Tchad, son utilisation est souvent freinée par
            une <strong className="text-slate-100">lenteur exaspérante</strong>.
            Cette latence n'est pas une fatalité inhérente au logiciel, mais la
            conséquence de facteurs locaux spécifiques. Analysons les causes et,
            surtout, les solutions pour y remédier.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            1. Les causes multifactorielles de la lenteur
          </h2>
          <p>
            La performance de DHIS2 est un équilibre entre le serveur, le réseau
            et la configuration de l'instance. Au Tchad, plusieurs de ces
            piliers sont fragilisés.
          </p>
          <ul className="mt-4 space-y-3 list-disc list-inside">
            <li>
              <strong>Infrastructure réseau et connectivité :</strong> La faible
              bande passante, la latence élevée et les coupures fréquentes,
              surtout en zone rurale, impactent directement le chargement des
              formulaires, rapports et tableaux de bord.
            </li>
            <li>
              <strong>Hébergement et configuration serveur :</strong> Des
              serveurs sous-dimensionnés (CPU, RAM, I/O disque) ou mal
              configurés (base de données, serveur web) sont une cause majeure
              de goulots d'étranglement.
            </li>
            <li>
              <strong>Volume de données et complexité :</strong> Une base de
              données qui grossit sans optimisation, un modèle de données trop
              complexe et des tableaux de bord lourds ralentissent
              considérablement les requêtes.
            </li>
            <li>
              <strong>Manque de maintenance :</strong> L'absence de nettoyage
              régulier de la base de données (vacuum), de mise à jour des tables
              analytiques et l'utilisation de versions DHIS2 obsolètes aggravent
              la situation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            2. Solutions concrètes pour une performance retrouvée
          </h2>
          <p>
            Il est possible d'améliorer drastiquement la situation en agissant
            sur plusieurs leviers.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
            {[
              {
                titre: "Optimiser l'hébergement",
                texte:
                  "Migrer vers un serveur dédié et correctement dimensionné est la première étape. Un audit de la configuration (PostgreSQL, Tomcat) permet de régler les paramètres critiques (mémoire, connexions) pour des performances optimales.",
              },
              {
                titre: "Mettre en place un cache performant",
                texte:
                  "L'utilisation d'un cache comme Varnish ou Nginx en frontal permet de servir instantanément les éléments statiques et les requêtes fréquentes, réduisant la charge sur le serveur DHIS2 et accélérant la navigation pour l'utilisateur.",
              },
              {
                titre: "Automatiser la maintenance",
                texte:
                  "Configurer des tâches planifiées (cron jobs) pour la mise à jour nocturne des tables analytiques, le nettoyage de la base de données et la surveillance des ressources est indispensable pour une performance durable.",
              },
              {
                titre: "Mettre à jour DHIS2",
                texte:
                  "Les nouvelles versions de DHIS2 apportent des améliorations de performance significatives. Planifier une montée de version permet de bénéficier de ces optimisations et des derniers correctifs de sécurité.",
              },
            ].map((item) => (
              <div
                key={item.titre}
                className="p-4 border rounded-xl bg-slate-800/60 border-white/10"
              >
                <h3 className="mb-2 font-bold text-slate-100">{item.titre}</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.texte}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 border rounded-2xl bg-slate-800/40 border-white/10">
          <h2 className="mb-3 text-2xl font-bold text-cyan-300">Conclusion</h2>
          <p className="leading-relaxed">
            La lenteur de DHIS2 au Tchad n'est pas une fatalité. Une approche
            méthodique, combinant optimisation de l'infrastructure,
            configuration logicielle adéquate et maintenance rigoureuse, peut
            transformer l'expérience utilisateur et redonner à cet outil
            essentiel toute son efficacité.
          </p>
        </section>
      </div>
    ),
    footer: (
      <footer className="p-8 mt-16 text-center border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">
          Votre instance DHIS2 est lente ?
        </h2>
        <p className="mt-3 text-slate-300">
          Contactez nos experts pour un diagnostic de performance et un plan
          d'action sur mesure pour revitaliser votre système.
        </p>
        <div className="mt-6">
          <Button href="/#audit" variant="primary">
            Demander un audit DHIS2
          </Button>
        </div>
      </footer>
    ),
  },
  {
    slug: "voip-pme",
    title: "La Révolution VoIP : Pourquoi votre PME ne peut plus s'en passer",
    description:
      "Découvrez pourquoi la VoIP est bien plus qu'une simple alternative technologique : c'est un levier de croissance stratégique pour les PME.",
    category: "Téléphonie",
    date: "2024-07-26",
    readingTime: 2,
    content: (
      <div className="space-y-10 text-slate-300">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            1. Réduction drastique des coûts : un impact direct sur votre
            rentabilité
          </h2>
          <p>
            Le premier avantage, et souvent le plus visible, est économique.
            Contrairement aux lignes analogiques traditionnelles (RTC) qui
            nécessitent des installations physiques coûteuses et une maintenance
            onéreuse, la VoIP utilise votre connexion Internet existante.
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li>
              <strong>Coûts d'appels réduits :</strong> Les appels entre
              collaborateurs sont gratuits, même entre plusieurs sites. Les
              tarifs pour les appels nationaux et surtout internationaux sont
              infiniment plus bas.
            </li>
            <li>
              <strong>Moins de matériel :</strong> Plus besoin d'un PABX
              physique qui prend la poussière dans un local technique. Tout est
              géré dans le cloud.
            </li>
            <li>
              <strong>Maintenance simplifiée :</strong> Les mises à jour et la
              gestion se font à distance via une interface web, réduisant les
              frais d'intervention.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            2. Flexibilité et mobilité : le bureau vous suit partout
          </h2>
          <p>
            Le télétravail et les déplacements professionnels font partie du
            quotidien. La VoIP transforme chaque appareil connecté en un poste
            téléphonique professionnel.
          </p>
          <p className="mt-2">
            Grâce à une simple application (softphone) sur smartphone ou
            ordinateur, vos collaborateurs restent joignables sur leur numéro
            professionnel, où qu'ils soient. Ils peuvent passer et recevoir des
            appels comme s'ils étaient au bureau, préservant ainsi leur numéro
            personnel et maintenant une image professionnelle cohérente.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            3. Des fonctionnalités de grand groupe pour une image
            professionnelle
          </h2>
          <p>
            La VoIP démocratise des fonctionnalités autrefois réservées aux
            grandes entreprises, améliorant considérablement votre accueil
            client :
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li>
              <strong>Standard vocal interactif (IVR) :</strong> "Tapez 1 pour
              le service commercial, tapez 2 pour le support..."
            </li>
            <li>
              <strong>Files d'attente et musique d'attente :</strong> Gérez les
              pics d'appels sans perdre de clients.
            </li>
            <li>
              <strong>Gestion des horaires :</strong> Adaptez le routage des
              appels en fonction de vos heures d'ouverture.
            </li>
          </ul>
        </section>
      </div>
    ),
    footer: (
      <footer className="p-8 mt-16 text-center border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">
          Prêt à passer à la vitesse supérieure ?
        </h2>
        <p className="mt-3 text-slate-300">
          Contactez nos experts pour une démo personnalisée et découvrez comment
          la VoIP peut transformer votre communication.
        </p>
        <div className="mt-6">
          <Button href="/demo" variant="primary">
            Demander une démo gratuite
          </Button>
        </div>
      </footer>
    ),
  },
  {
    slug: "cybersecurite-pme",
    title: "Cybersécurité pour les PME : 5 Erreurs à Éviter d'Urgence",
    description:
      "Les cyberattaques ne ciblent pas que les grands groupes. Découvrez les 5 erreurs les plus courantes qui mettent votre PME en danger et comment les corriger.",
    category: "Cybersécurité",
    date: "2024-07-28",
    readingTime: 3,
    content: (
      <div className="space-y-10 text-slate-300">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            1. Négliger la sensibilisation des employés
          </h2>
          <p>
            L'erreur humaine est la porte d'entrée de plus de 90% des
            cyberattaques réussies (phishing, etc.). Sans formation régulière,
            vos collaborateurs sont le maillon faible de votre sécurité.
            Organisez des sessions de sensibilisation et des simulations de
            phishing pour en faire votre première ligne de défense.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            2. Manquer de sauvegardes fiables et testées
          </h2>
          <p>
            Une sauvegarde n'est utile que si elle est fonctionnelle et récente.
            Beaucoup d'entreprises réalisent trop tard que leurs backups sont
            corrompus ou trop anciens. Mettez en place la règle du 3-2-1 : 3
            copies de vos données, sur 2 supports différents, dont 1 hors site.
            Surtout, testez la restauration régulièrement.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            3. Utiliser des mots de passe faibles (et identiques partout)
          </h2>
          <p>
            "Admin123" n'est pas un mot de passe. Imposez une politique de mots
            de passe robustes (longs, complexes) et uniques pour chaque service.
            L'idéal est d'utiliser un gestionnaire de mots de passe d'entreprise
            et d'activer l'authentification multi-facteurs (MFA) partout où
            c'est possible.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            4. Ignorer les mises à jour logicielles
          </h2>
          <p>
            Chaque jour, des failles de sécurité sont découvertes dans les
            logiciels que vous utilisez. Les mises à jour contiennent les
            correctifs pour ces failles. Retarder leur application, c'est
            laisser une porte ouverte aux attaquants. Automatisez les mises à
            jour autant que possible.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            5. Penser que l'antivirus suffit
          </h2>
          <p>
            Un antivirus est indispensable, mais il est loin d'être suffisant
            face aux menaces modernes. Une bonne stratégie de défense inclut un
            pare-feu bien configuré, une protection des emails, et idéalement
            une solution de détection et de réponse (EDR).
          </p>
        </section>
      </div>
    ),
    footer: (
      <footer className="p-8 mt-16 text-center border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">
          Protégez votre activité avant qu'il ne soit trop tard
        </h2>
        <p className="mt-3 text-slate-300">
          Un audit de sécurité peut révéler des failles critiques que vous
          ignorez. Contactez-nous pour un diagnostic gratuit.
        </p>
        <div className="mt-6">
          <Button href="/#audit" variant="primary">
            Demander un audit de sécurité
          </Button>
        </div>
      </footer>
    ),
  },
  {
    slug: "voip-importance-pme-guide-complet",
    title:
      "VoIP & PME : Le Guide Complet pour Comprendre l'Enjeu Stratégique en 2024",
    description:
      "Fin du RTC, explosion du télétravail, ROI mesurable dès le premier mois… Découvrez pourquoi migrer vers la VoIP n'est plus une option mais une nécessité absolue pour les PME.",
    category: "Téléphonie",
    date: "2024-08-15",
    readingTime: 6,
    content: (
      <div className="space-y-12 text-slate-300">
        {/* Intro */}
        <section className="p-6 border rounded-2xl bg-cyan-950/30 border-cyan-400/20">
          <p className="text-lg leading-relaxed">
            En France,{" "}
            <strong className="text-slate-100">
              le réseau téléphonique commuté (RTC) a officiellement pris fin
            </strong>{" "}
            dans de nombreuses zones depuis 2023, et Orange a annoncé son
            extinction totale d'ici 2030. Pour les PME, ce n'est plus une
            question de "si" il faut migrer vers la VoIP, mais de{" "}
            <strong className="text-slate-100">"quand"</strong> et{" "}
            <strong className="text-slate-100">"comment"</strong>. Ce guide vous
            explique tout.
          </p>
        </section>

        {/* Section 1 */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            1. Qu'est-ce que la VoIP et pourquoi ça change tout ?
          </h2>
          <p>
            La VoIP (Voice over Internet Protocol) permet de transporter la voix
            via Internet plutôt que par les câbles téléphoniques traditionnels.
            En pratique, vos appels téléphoniques deviennent des paquets de
            données comme un email ou une vidéo YouTube.
          </p>
          <p className="mt-3">
            Ce changement de paradigme entraîne une cascade d'avantages concrets
            : vos lignes téléphoniques ne sont plus liées à un câble physique,
            ni à un emplacement géographique. Votre numéro vous appartient, et
            vous pouvez l'utiliser depuis n'importe quel appareil connecté,
            partout dans le monde.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-3">
            {[
              {
                chiffre: "−60%",
                label: "de réduction moyenne sur la facture télécom",
              },
              {
                chiffre: "100%",
                label: "des appels internes entre sites gratuits",
              },
              {
                chiffre: "5 min",
                label: "pour ajouter une nouvelle ligne sans technicien",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 text-center border rounded-xl bg-slate-800/60 border-white/10"
              >
                <p className="text-3xl font-extrabold text-cyan-400">
                  {stat.chiffre}
                </p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            2. Les 6 bénéfices clés pour une PME
          </h2>
          <div className="space-y-4">
            {[
              {
                titre: "💰 Réduction immédiate des coûts",
                texte:
                  "Fini les abonnements RTC onéreux et les factures d'appels longue distance. Avec la VoIP, les appels entre vos bureaux sont gratuits, et les appels vers les mobiles ou l'étranger sont facturés à des tarifs imbattables. La plupart des PME constatent un retour sur investissement dès le premier mois.",
              },
              {
                titre: "🏠 Télétravail sans friction",
                texte:
                  "Un collaborateur en télétravail peut utiliser son numéro professionnel depuis son domicile, son téléphone mobile ou son ordinateur. Le client ne voit aucune différence. C'est la continuité professionnelle garantie, quelle que soit la situation.",
              },
              {
                titre: "📈 Scalabilité à la demande",
                texte:
                  "Embauchez 5 nouveaux collaborateurs ? Ajoutez 5 lignes en quelques clics depuis l'interface d'administration, sans attendre un technicien ni acheter de matériel supplémentaire. La VoIP évolue avec vous.",
              },
              {
                titre: "🔗 Intégration CRM & outils métier",
                texte:
                  "Les solutions VoIP modernes s'intègrent nativement avec Salesforce, HubSpot, Zoho ou Microsoft Teams. Quand un client appelle, sa fiche s'ouvre automatiquement. Les appels sont loggés, les enregistrements disponibles. Un gain de productivité énorme pour vos équipes commerciales.",
              },
              {
                titre: "🎛️ Fonctionnalités professionnelles incluses",
                texte:
                  "Standard vocal (IVR), files d'attente, renvoi d'appels, enregistrement, conférences… Des fonctionnalités qui coûtaient des milliers d'euros avec un PABX physique sont désormais incluses dans votre abonnement mensuel.",
              },
              {
                titre: "🔒 Continuité d'activité renforcée",
                texte:
                  "En cas de sinistre (incendie, inondation, coupure réseau locale), vos appels continuent d'arriver sur les mobiles de vos équipes. Pas de perte de clients, pas d'interruption d'activité. C'est une resilience opérationnelle que le RTC ne pouvait pas offrir.",
              },
            ].map((item) => (
              <div
                key={item.titre}
                className="p-5 border rounded-xl bg-slate-800/40 border-white/10"
              >
                <h3 className="mb-2 font-bold text-slate-100">{item.titre}</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.texte}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            3. Comment calculer votre ROI VoIP ?
          </h2>
          <p>
            Le calcul est simple. Prenez votre facture télécom actuelle
            (abonnements + appels + maintenance PABX). Estimez ensuite le coût
            d'une solution VoIP Cloud pour le même nombre de postes. La
            différence est votre économie mensuelle.
          </p>
          <div className="p-5 mt-5 border rounded-2xl bg-slate-900/60 border-cyan-400/20">
            <p className="mb-3 text-sm font-semibold tracking-wider uppercase text-cyan-300">
              Exemple concret — PME de 20 personnes
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Abonnements RTC actuels (20 lignes)
                </span>
                <span className="font-mono text-red-400">−1 200 €/mois</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Maintenance PABX + technicien
                </span>
                <span className="font-mono text-red-400">−300 €/mois</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Solution VoIP Cloud (20 postes)
                </span>
                <span className="font-mono text-green-400">+480 €/mois</span>
              </div>
              <hr className="my-2 border-white/10" />
              <div className="flex justify-between text-base font-bold">
                <span className="text-slate-100">Économie mensuelle</span>
                <span className="font-mono text-green-400">≈ 1 020 €/mois</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                * Chiffres indicatifs basés sur des tarifs moyens du marché
                français en 2024.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            4. Les étapes d'une migration VoIP réussie
          </h2>
          <ol className="space-y-5">
            {[
              {
                etape: "Étape 1",
                titre: "Audit de votre infrastructure réseau",
                desc: "Une bonne VoIP nécessite une connexion Internet stable avec une bande passante suffisante (compter ~100 Kbps par appel simultané) et idéalement une connexion fibre. Un audit préalable identifie les points à corriger.",
              },
              {
                etape: "Étape 2",
                titre: "Choix de la solution adaptée",
                desc: "VoIP hébergée (Cloud PBX), Trunk SIP ou solution hybride ? Chaque modèle a ses avantages selon votre taille, vos usages et votre existant. Un expert vous aidera à faire le bon choix.",
              },
              {
                etape: "Étape 3",
                titre: "Portabilité de vos numéros existants",
                desc: "Vous conservez absolutement tous vos numéros actuels. La portabilité est un droit légal en France. La procédure prend en général 10 à 30 jours ouvrés selon l'opérateur.",
              },
              {
                etape: "Étape 4",
                titre: "Formation des équipes",
                desc: "L'adoption d'un nouvel outil passe par la formation. La plupart des solutions VoIP modernes sont intuitives, mais une demi-journée de formation garantit une adoption rapide et sans résistance.",
              },
              {
                etape: "Étape 5",
                titre: "Bascule progressive et suivi",
                desc: "La migration peut se faire site par site ou département par département pour réduire les risques. Un bon prestataire assure un suivi post-migration et une disponibilité 24/7 pendant la période de transition.",
              },
            ].map((item, i) => (
              <li key={item.titre} className="flex gap-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold border rounded-full bg-cyan-500/20 border-cyan-400/40 text-cyan-300">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">{item.titre}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-cyan-300">
            5. Les idées reçues qui freinent les PME
          </h2>
          <div className="space-y-4">
            {[
              {
                mythe: '❌ "La qualité audio est mauvaise"',
                realite:
                  "Avec une connexion fibre et la technologie HD Voice (codec G.722 ou Opus), la qualité VoIP est supérieure à celle du RTC analogique. Ce préjugé date des débuts de la VoIP en 2005.",
              },
              {
                mythe: '❌ "C\'est compliqué à mettre en place"',
                realite:
                  "Un prestataire compétent gère l'ensemble de la migration pour vous. En pratique, vos équipes n'ont qu'à installer une application ou brancher un téléphone IP.",
              },
              {
                mythe: '❌ "C\'est réservé aux grandes entreprises"',
                realite:
                  "Au contraire ! Les PME sont les premières bénéficiaires de la VoIP. Les économies et la flexibilité impactent proportionnellement davantage une structure de 10 à 200 personnes.",
              },
              {
                mythe: '❌ "Ma ligne Internet ne suffit pas"',
                realite:
                  "Un appel VoIP consomme environ 100 Kbps. Une connexion fibre standard à 300 Mbps peut gérer plus de 2 000 appels simultanés. La bande passante n'est presque jamais un problème.",
              },
            ].map((item) => (
              <div
                key={item.mythe}
                className="p-4 border rounded-xl bg-slate-800/40 border-white/10"
              >
                <p className="font-semibold text-slate-200">{item.mythe}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  ✅ <strong className="text-slate-300">Réalité :</strong>{" "}
                  {item.realite}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="p-6 border rounded-2xl bg-slate-800/40 border-white/10">
          <h2 className="mb-3 text-2xl font-bold text-cyan-300">Conclusion</h2>
          <p className="leading-relaxed">
            La VoIP n'est pas une tendance passagère. C'est l'infrastructure
            télécom de toutes les entreprises modernes. Avec la fin programmée
            du RTC, les PME qui tardent à migrer s'exposent à des coûts de
            transition plus élevés et à des risques opérationnels inutiles.
            Celles qui agissent dès maintenant bénéficient d'économies
            immédiates, d'une agilité accrue et d'un avantage compétitif réel.
          </p>
          <p className="mt-3 font-semibold text-slate-100">
            La question n'est plus "est-ce que la VoIP est faite pour moi ?".
            Elle est : "combien d'argent je perds chaque mois à attendre ?"
          </p>
        </section>
      </div>
    ),
    footer: (
      <footer className="p-8 mt-16 text-center border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">
          Passez à la VoIP avec un expert à vos côtés
        </h2>
        <p className="mt-3 text-slate-300">
          Notre équipe réalise un audit gratuit de votre téléphonie actuelle et
          vous propose une migration sur mesure, sans interruption d'activité.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row">
          <Button href="/voip" variant="primary">
            Découvrir nos offres VoIP
          </Button>
          <Button href="/demo" variant="glass">
            Demander une démo gratuite
          </Button>
        </div>
      </footer>
    ),
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);
