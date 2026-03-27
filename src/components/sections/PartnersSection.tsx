import { motion } from "framer-motion";

export const PartnersSection = () => {
  const partners = [
    {
      name: "Microsoft",
      url: "https://www.microsoft.com",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      logoClassName: "h-8 w-auto",
    },
    {
      name: "GitHub",
      url: "https://github.com",
      logoUrl:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      logoClassName: "h-10 w-10",
    },
    {
      name: "Vercel",
      url: "https://vercel.com",
      logoUrl:
        "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
      logoClassName: "h-10 w-10",
    },
    {
      name: "Notion",
      url: "https://www.notion.so",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      logoClassName: "h-10 w-10",
    },
    {
      name: "Ubuntu",
      url: "https://ubuntu.com",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/9d/Ubuntu_logo.svg",
      logoClassName: "h-8 w-auto",
    },
    {
      name: "Asterisk PBX",
      url: "https://www.asterisk.org",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/20/Asterisk_logo.svg",
      logoClassName: "h-10 w-auto",
    },
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
          <div className="grid items-center grid-cols-2 mt-16 gap-y-12 gap-x-8 md:grid-cols-3">
            {partners.map((partner, index) => (
              <motion.a
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true, amount: 0.8 }}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visiter le site de ${partner.name}`}
                className="flex flex-col items-center justify-center gap-4 transition-opacity duration-300 opacity-70 hover:opacity-100"
              >
                <div className="flex h-16 w-32 items-center justify-center rounded-xl bg-white p-3 shadow-sm">
                  <img
                    src={partner.logoUrl}
                    alt={`Logo ${partner.name}`}
                    className={`${partner.logoClassName} object-contain`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="text-sm font-semibold">{partner.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
