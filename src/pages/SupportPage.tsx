import { voipFaqData } from "../data/voip";

export const SupportPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-6xl sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        Support VoIP
      </h1>
      <p className="mt-4 text-lg text-slate-300">
        Accompagnement avant, pendant et après mise en service.
      </p>
      <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
        <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
          <h2 className="text-xl font-bold text-slate-100">Mise en service rapide</h2>
          <p className="mt-2 text-slate-300">
            Paramétrage, tests et validation sur vos flux d’appels.
          </p>
        </div>
        <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
          <h2 className="text-xl font-bold text-slate-100">Support pro</h2>
          <p className="mt-2 text-slate-300">
            Assistance standard ou prioritaire selon l’offre.
          </p>
        </div>
        <div className="p-5 border rounded-2xl bg-slate-900/50 border-white/10">
          <h2 className="text-xl font-bold text-slate-100">Optimisation continue</h2>
          <p className="mt-2 text-slate-300">
            Ajustements QoS, routage, files et rapports de performance.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-slate-100">FAQ mixte</h2>
        <div className="mt-6 space-y-4">
          {voipFaqData.map((item) => (
            <div key={item.question} className="p-5 border rounded-2xl bg-slate-900/40 border-white/10">
              <h3 className="font-semibold text-slate-100">{item.question}</h3>
              <p className="mt-2 text-slate-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
