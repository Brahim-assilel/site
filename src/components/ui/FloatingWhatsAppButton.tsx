import { MessageCircle } from "lucide-react";
import { CONTACT_WHATSAPP_URL } from "../../config/brand";
import { trackEvent } from "../../lib/analytics";

export const FloatingWhatsAppButton = () => {
  return (
    <a
      href={CONTACT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-colors rounded-full shadow-2xl left-4 bottom-5 bg-green-600/95 hover:bg-green-500 sm:left-6"
      aria-label="Contact WhatsApp"
      onClick={() =>
        trackEvent("cta_click", {
          cta_name: "floating_whatsapp",
          destination: CONTACT_WHATSAPP_URL,
        })
      }
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
};
