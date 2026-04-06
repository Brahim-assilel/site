import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { trackEvent } from "../../lib/analytics";

export const Hero = () => {
  return (
    <section
      id="accueil"
      className="relative flex items-center justify-center min-h-[86vh] pt-20 overflow-hidden md:min-h-screen"
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
            className="inline-block px-3 py-1 mb-5 text-sm font-bold tracking-wide text-blue-300 border rounded-full shadow-lg sm:text-base bg-blue-400/10 border-blue-400/20 shadow-blue-500/10"
          >
            Assilel-Tech un monde en binaire
          </motion.div>
          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-transparent sm:text-4xl md:text-7xl bg-clip-text bg-gradient-to-br from-white to-slate-400">
            LE NUMÉRIQUE À LA PORTÉE DE TOUS
          </h1>
          <p className="max-w-2xl mx-auto mt-3 mb-8 text-base font-normal leading-relaxed sm:text-lg md:text-xl text-slate-300">
            Rendre le numérique simple et accessible à chacun pour supprimer
            toute barrière technologique.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href="/#audit"
              variant="primary"
              className="w-full px-6 py-3 text-base sm:w-auto md:px-8 md:py-4 md:text-lg"
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
              className="w-full px-6 py-3 text-base sm:w-auto md:px-8 md:py-4 md:text-lg"
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
