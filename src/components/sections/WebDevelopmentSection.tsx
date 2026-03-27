import { motion } from "framer-motion";
import { Code2, LayoutDashboard, Rocket } from "lucide-react";
import { Button } from "../ui/Button";

export const WebDevelopmentSection = () => {
  const offers = [
    {
      title: "Site Vitrine",
      description:
        "Un site rapide, moderne et optimisé SEO pour présenter votre activité.",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Application Web",
      description:
        "Des plateformes métier sur mesure avec authentification, rôles et tableaux de bord.",
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      title: "Maintenance & Evolution",
      description:
        "Corrections, améliorations continues et accompagnement technique long terme.",
      icon: <Rocket className="w-5 h-5" />,
    },
  ];

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              viewport={{ once: true, amount: 0.4 }}
              className="p-6 border rounded-2xl bg-slate-900/50 border-white/10"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-xl bg-cyan-500/15 text-cyan-300">
                {offer.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-100">{offer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="p-8 mt-10 text-center border rounded-3xl bg-slate-900/40 border-cyan-300/20">
          <p className="text-slate-300">
            Besoin d&apos;une solution web performante pour votre entreprise ?
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:flex-row">
            <Button href="/demo" variant="primary">
              Demander une démo
            </Button>
            <Button href="/contact" variant="glass">
              Parler à un expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
