import { useLocation } from "react-router-dom";
import { Button } from "./Button";
import { trackEvent } from "../../lib/analytics";

const VOIP_PATHS = [
  "/voip",
  "/cloud-pbx",
  "/sip-trunk",
  "/call-center",
  "/tarifs",
  "/compatibilite",
  "/securite",
  "/support",
  "/demo",
];

export const FloatingQuoteButton = () => {
  const { pathname } = useLocation();
  const isVoipPage = VOIP_PATHS.includes(pathname);

  if (!isVoipPage) return null;

  return (
    <div className="fixed z-50 bottom-5 right-4 sm:right-6">
      <Button
        href="/demo#devis"
        variant="primary"
        className="px-5 py-3 text-sm shadow-2xl shadow-cyan-500/30"
        onClick={() =>
          trackEvent("cta_click", {
            cta_name: "floating_voip_devis",
            destination: "/demo#devis",
          })
        }
      >
        Devis en 2 min
      </Button>
    </div>
  );
};
