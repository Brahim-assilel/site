import { motion } from "framer-motion";

export const ValuesSection = () => {
  const values = [
    {
      name: "Innovation",
      description:
        "Nous encourageons la créativité et la recherche de solutions novatrices.",
    },
    {
      name: "Intégrité",
      description:
        "Nous agissons avec honnêteté et transparence dans toutes nos interactions.",
    },
    {
      name: "Engagement Client",
      description: "La satisfaction de nos clients est notre priorité absolue.",
    },
    {
      name: "Excellence",
      description: "Nous visons l'excellence dans tout ce que nous faisons.",
    },
    {
      name: "Collaboration",
      description:
        "Nous croyons en la force du travail d'équipe et du partenariat.",
    },
    {
      name: "Adaptabilité",
      description:
        "Nous sommes flexibles et nous nous adaptons rapidement aux changements.",
    },
  ];

  return (
    <section id="nos-valeurs" className="py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Nos Valeurs
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Les principes qui guident chacune de nos décisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.name}
              className="p-6 border border-white/10 rounded-2xl bg-slate-900/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="font-bold text-slate-100">{value.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
