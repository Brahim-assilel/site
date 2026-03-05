export const AboutSection = () => {
  return (
    <section id="a-propos" className="py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-b from-white to-slate-400">
            À Propos de Nous
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Découvrez notre mission et notre vision.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-blue-400">
              Notre Mission
            </h3>
            <p className="text-lg leading-relaxed text-slate-300">
              Notre mission est de fournir des solutions technologiques
              innovantes et de haute qualité qui aident nos clients à atteindre
              leurs objectifs stratégiques. Nous nous engageons à être un
              partenaire de confiance, en offrant une expertise technique
              pointue et un service client exceptionnel.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-bold text-blue-400">
              Notre Vision
            </h3>
            <p className="text-lg leading-relaxed text-slate-300">
              Notre vision est de devenir un leader reconnu dans le domaine des
              solutions logicielles sur mesure, en favorisant une culture
              d'innovation continue, de collaboration et d'excellence. Nous
              aspirons à façonner l'avenir numérique en transformant les défis
              technologiques en opportunités de croissance pour nos clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
