export const SecuritePage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-5xl sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        Sécurité & Fiabilité
      </h1>
      <p className="mt-4 text-lg text-slate-300">
        Portabilité, continuité de service, anti‑fraude et bonnes pratiques de
        durcissement.
      </p>
      <div className="p-6 mt-10 border rounded-3xl bg-slate-900/50 border-white/10">
        <ul className="space-y-2 text-slate-300">
          <li>Protection anti‑fraude : limites, restrictions, alertes</li>
          <li>Failover / renvoi automatique selon configuration</li>
          <li>Recommandations réseau et segmentation VoIP</li>
          <li>Contrôle d’accès (IP autorisées, règles, supervision)</li>
          <li>Continuité : plans de reprise adaptés aux usages critiques</li>
        </ul>
      </div>
    </div>
  );
};
