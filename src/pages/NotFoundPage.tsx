import { ServerCrash } from "lucide-react";
import { Button } from "../components/ui/Button";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-40 text-center text-slate-300">
      <ServerCrash className="w-24 h-24 mb-8 text-slate-500" />
      <h1 className="text-6xl font-extrabold text-slate-200">404</h1>
      <p className="mt-4 text-2xl font-semibold text-slate-300">
        Page non trouvée
      </p>
      <p className="max-w-md mt-2 text-slate-400">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="mt-10">
        <Button href="/" variant="primary">
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};
