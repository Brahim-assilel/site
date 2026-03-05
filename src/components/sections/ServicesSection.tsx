import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services";

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Nos services
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Une approche 360° couvrant le développement, l'infrastructure et la
            sécurité.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link key={service.slug} to={`/services/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="flex flex-col h-full p-8 transition-all duration-300 border shadow-2xl cursor-pointer bg-slate-900/50 border-white/10 shadow-black/40 group rounded-3xl backdrop-blur-xl hover:bg-white/10"
              >
                <div className="flex-grow">
                  <div className="flex items-center justify-center w-14 h-14 mb-6 transition-all duration-200 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-[-15deg]">
                    {service.icon}
                  </div>
                  <div className="mb-3 text-xs font-bold tracking-wider text-blue-400 uppercase">
                    {service.category}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-100">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-start mt-6 font-bold text-blue-400 transition-colors group-hover:text-white">
                  Voir les détails <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
