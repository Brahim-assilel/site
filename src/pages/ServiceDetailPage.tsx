import { CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { getServiceBySlug, services } from "../data/services";

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="px-4 py-28 mx-auto max-w-4xl sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-100">
          Service introuvable
        </h1>
        <p className="mt-4 text-slate-300">
          Ce service n&apos;existe pas ou a été déplacé.
        </p>
        <div className="mt-8">
          <Button href="/#services" variant="primary">
            Retour aux services
          </Button>
        </div>
      </div>
    );
  }

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const serviceUseCases = [
    `Entreprises qui veulent structurer efficacement ${service.title.toLowerCase()}.`,
    "Équipes techniques et métiers qui ont besoin d'un accompagnement concret.",
    "Organisations qui visent un résultat mesurable en délai, qualité et sécurité.",
  ];

  const deliverables = [
    "Cadrage initial et plan d'action priorisé.",
    "Configuration, déploiement ou implémentation selon le périmètre.",
    "Documentation opérationnelle et recommandations d'évolution.",
  ];

  const expectedResults = [
    "Réduction des risques et meilleure continuité de service.",
    "Gain de temps dans l'exploitation au quotidien.",
    "Visibilité claire sur les prochaines améliorations à apporter.",
  ];

  return (
    <div className="px-4 py-28 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p className="text-sm text-slate-400">
        <Link to="/#services" className="hover:text-cyan-300">
          Services
        </Link>{" "}
        / {service.title}
      </p>

      <section className="p-8 mt-6 border rounded-3xl bg-slate-900/50 border-white/10">
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400">
          {service.icon}
        </div>
        <p className="text-xs font-bold tracking-wider text-blue-400 uppercase">
          {service.category}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-100 md:text-5xl">
          {service.title}
        </h1>
        <p className="max-w-3xl mt-4 text-lg text-slate-300">
          {service.description}
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-100">
            Ce que nous faisons
          </h2>
          <ul className="mt-4 space-y-3">
            {service.details.map((detail, index) => (
              <li key={index} className="flex items-start text-slate-300">
                <CheckCircle2 className="w-5 h-5 mt-0.5 mr-3 text-blue-400 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <Button href="/#contact" variant="primary">
            Demander un accompagnement
          </Button>
          <Button href="/#audit" variant="glass">
            Audit Gratuit
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-3">
        <div className="p-6 border rounded-2xl bg-slate-900/40 border-white/10">
          <h2 className="text-xl font-bold text-slate-100">Pour qui ?</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            {serviceUseCases.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 border rounded-2xl bg-slate-900/40 border-white/10">
          <h2 className="text-xl font-bold text-slate-100">Livrables typiques</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 border rounded-2xl bg-slate-900/40 border-white/10">
          <h2 className="text-xl font-bold text-slate-100">Résultats attendus</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            {expectedResults.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p-8 mt-10 border rounded-3xl bg-slate-900/50 border-white/10">
        <h2 className="text-2xl font-bold text-slate-100">Notre méthode</h2>
        <ol className="grid grid-cols-1 gap-3 mt-4 text-slate-300 md:grid-cols-2 list-decimal list-inside">
          <li>Analyse du besoin et des contraintes.</li>
          <li>Proposition technique et plan de mise en oeuvre.</li>
          <li>Exécution, tests et validation conjointe.</li>
          <li>Passation, suivi et optimisation continue.</li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-100">FAQ du service</h2>
        <div className="mt-4 space-y-3">
          <div className="p-5 border rounded-2xl bg-slate-900/40 border-white/10">
            <h3 className="font-semibold text-slate-100">
              Combien de temps prend généralement ce service ?
            </h3>
            <p className="mt-2 text-slate-300">
              La durée dépend du périmètre. Après un cadrage rapide, nous
              partageons un planning réaliste avec jalons clairs.
            </p>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/40 border-white/10">
            <h3 className="font-semibold text-slate-100">
              Peut-on démarrer par une étape pilote ?
            </h3>
            <p className="mt-2 text-slate-300">
              Oui. Nous recommandons souvent une phase pilote pour sécuriser les
              choix et accélérer le déploiement global.
            </p>
          </div>
          <div className="p-5 border rounded-2xl bg-slate-900/40 border-white/10">
            <h3 className="font-semibold text-slate-100">
              Proposez-vous un accompagnement après livraison ?
            </h3>
            <p className="mt-2 text-slate-300">
              Oui, avec support, suivi des performances et amélioration continue
              selon vos besoins.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-100">
          Autres services qui peuvent vous intéresser
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
          {relatedServices.map((item) => (
            <Link
              key={item.slug}
              to={`/services/${item.slug}`}
              className="p-5 border rounded-2xl bg-slate-900/40 border-white/10 hover:bg-slate-900/70"
            >
              <p className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                {item.category}
              </p>
              <h3 className="mt-2 font-bold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
