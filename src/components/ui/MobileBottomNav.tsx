import { Home, Layers3, MessageSquareMore } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Accueil", to: "/#accueil", icon: Home },
  { label: "Services", to: "/#services", icon: Layers3 },
  { label: "Contact", to: "/#audit", icon: MessageSquareMore },
] as const;

export const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div className="grid grid-cols-3 gap-2 p-2 border shadow-2xl rounded-2xl bg-slate-900/95 border-white/10 backdrop-blur-xl shadow-black/40">
        {items.map((item) => {
          const Icon = item.icon;
          const expectedHash = item.to.includes("#")
            ? `#${item.to.split("#")[1]}`
            : "";
          const isActive =
            location.pathname === "/" &&
            ((item.to.includes("#accueil") && location.hash === "") ||
              location.hash === expectedHash);

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-cyan-400/15 text-cyan-200"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
