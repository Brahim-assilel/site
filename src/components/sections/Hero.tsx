import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { trackEvent } from "../../lib/analytics";

export const Hero = () => {
  return (
    <section
      id="accueil"
      className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 -translate-y-1/4 bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent blur-3xl" />
      <div className="relative z-20 px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1 mb-6 text-lg font-bold tracking-wide text-blue-300 border rounded-full shadow-lg bg-blue-400/10 border-blue-400/20 shadow-blue-500/10"
          >
            Assilel-Tech un monde en binaire
          </motion.div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-transparent md:text-7xl bg-clip-text bg-gradient-to-br from-white to-slate-400">
            LE NUMÉRIQUE À LA PORTÉE DE TOUS
          </h1>
          <p className="max-w-2xl mx-auto mt-4 mb-10 text-xl font-normal leading-relaxed text-slate-400">
            Rendre le numérique simple et accessible à chacun pour supprimer
            toute barrière technologique.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              href="/#audit"
              variant="primary"
              className="px-8 py-4 text-lg"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "hero_audit",
                  destination: "/#audit",
                })
              }
            >
              Commencer la transformation
            </Button>
            <Button
              href="/#faq"
              variant="glass"
              className="px-8 py-4 text-lg"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "hero_faq",
                  destination: "/#faq",
                })
              }
            >
              En savoir plus
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
