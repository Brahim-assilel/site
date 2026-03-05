export const CompatibilitePage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-5xl sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        Compatibilité VoIP
      </h1>
      <p className="mt-4 text-lg text-slate-300">
        SIP standard, IP phones, softphones et prérequis internet.
      </p>
      <div className="p-6 mt-10 border rounded-3xl bg-slate-900/50 border-white/10">
        <ul className="space-y-2 text-slate-300">
          <li>PBX SIP : 3CX, Asterisk, FreePBX, Avaya et équivalents</li>
          <li>Téléphones IP SIP : principaux constructeurs compatibles</li>
          <li>Softphones : desktop et mobile</li>
          <li>Codec & QoS : recommandations selon vos usages</li>
          <li>Connexion internet stable + priorité voix recommandée</li>
        </ul>
      </div>
    </div>
  );
};
