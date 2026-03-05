import { Button } from "../components/ui/Button";
import { VoipQuoteForm } from "../components/voip/VoipQuoteForm";

export const DemoPage = () => {
  return (
    <div className="px-4 py-28 mx-auto max-w-6xl sm:px-6 lg:px-8">
      <p className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-[0.14em] uppercase rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
        Solution VoIP
      </p>
      <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
        Démo / Contact VoIP
      </h1>
      <p className="max-w-3xl mt-4 text-lg text-slate-300">
        Présentez votre contexte en quelques minutes. Nous vous orientons vers
        Cloud PBX, SIP Trunk ou Call Center selon votre besoin réel.
      </p>
      <div className="flex flex-wrap gap-3 mt-8">
        <Button href="/voip" variant="glass">
          Revenir à la vue d'ensemble VoIP
        </Button>
      </div>
      <VoipQuoteForm />
    </div>
  );
};
