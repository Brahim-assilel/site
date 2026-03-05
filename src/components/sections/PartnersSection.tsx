import React from "react";
import { motion } from "framer-motion";

const MicrosoftLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 21 21" {...props}>
    <path fill="#f25022" d="M1 1h9v9H1z" />
    <path fill="#00a4ef" d="M1 11h9v9H1z" />
    <path fill="#7fba00" d="M11 1h9v9h-9z" />
    <path fill="#ffb900" d="M11 11h9v9h-9z" />
  </svg>
);
const GitHubLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="#FFFFFF"
      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.54 1.33.16 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.18.58.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2z"
    />
  </svg>
);
const GoogleLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);
const DeepseekLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 30" {...props}>
    <text
      x="50"
      y="20"
      fontFamily="Arial, sans-serif"
      fontSize="14"
      fill="#0075FF"
      textAnchor="middle"
    >
      DeepSeek
    </text>
  </svg>
);

export const PartnersSection = () => {
  const partners = [
    { name: "Microsoft", icon: <MicrosoftLogo className="h-10" /> },
    { name: "GitHub", icon: <GitHubLogo className="h-10" /> },
    { name: "Google", icon: <GoogleLogo className="h-10" /> },
    { name: "Deepseek", icon: <DeepseekLogo className="h-8" /> },
  ];

  return (
    <section id="partners" className="py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">
            Nos Partenaires
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Nous sommes fiers de collaborer avec les partenaires suivants pour
            offrir des solutions d'excellence :
          </p>
          <div className="grid items-center grid-cols-2 mt-16 gap-y-12 gap-x-8 md:grid-cols-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true, amount: 0.8 }}
                className="flex flex-col items-center justify-center gap-4 transition-opacity duration-300 opacity-70 hover:opacity-100"
              >
                {partner.icon}
                <span className="text-sm font-semibold">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
