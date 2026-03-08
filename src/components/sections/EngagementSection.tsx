import React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect } from "react";

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 400,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString("fr-FR");
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

const KeyFiguresSection = () => {
  const figures = [
    { value: 12, label: "Projets Réussis", suffix: "+" },
    { value: 98, label: "Satisfaction Client", suffix: "%" },
    { value: 3, label: "Ans d'Expertise", suffix: "+" },
    { value: 24, label: "Support", suffix: "/7" },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 mt-12 text-center md:grid-cols-4">
      {figures.map((figure, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.4 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <p className="text-4xl font-extrabold text-[#2563EB] md:text-5xl">
            <AnimatedNumber value={figure.value} />
            {figure.suffix}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {figure.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export const EngagementSection = () => {
  const features = [
    "Solutions Sur Mesure",
    "Haute Disponibilité",
    "Support Proactif 24/7",
    "Technologies de Pointe",
  ];

  return (
    // Section avec le fond Gris Clair (#F7FAFC)
    <section
      id="engagement"
      className="py-24 bg-[#F7FAFC] border-y border-slate-200/60 rounded-[40px] mx-4 md:mx-8"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-[#1A202C] mb-6 tracking-tight">
              Notre Engagement, Votre Succès.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-500">
              Nous ne sommes pas seulement des prestataires, nous sommes les
              architectes de votre sécurité numérique.
            </p>
            <ul className="space-y-5">
              {features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center font-medium text-[#1A202C]"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#2563EB] mr-3 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="relative flex items-center justify-center p-8 overflow-hidden bg-white border shadow-lg aspect-video rounded-3xl border-slate-200/60 group">
              <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 -top-10 -right-10 blur-3xl"></div>
              <div className="relative z-10 text-center">
                <ShieldCheck className="w-24 h-24 mx-auto mb-6 text-[#2563EB]" />
                <div className="text-3xl font-extrabold text-[#1A202C]">
                  Sécurité Maximale
                </div>
                <div className="inline-block px-4 py-1 mt-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full shadow-sm">
                  Certifiée & Auditée
                </div>
              </div>
            </div>
          </div>
        </div>
        <KeyFiguresSection />
      </div>
    </section>
  );
};
