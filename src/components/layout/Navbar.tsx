import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { trackEvent } from "../../lib/analytics";
import { voipMenuLinks } from "../../data/voip";
import { services } from "../../data/services";

const HOVER_CLOSE_DELAY = 120;

export const Navbar = () => {
  const mobileNavItems = [
    { label: "Accueil", href: "/#accueil" },
    { label: "Dév Web", href: "/#developpement-web" },
    { label: "Nos Valeurs", href: "/#nos-valeurs" },
    { label: "VoIP", href: "/voip" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Démo / Contact", href: "/demo" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
    { label: "À propos", href: "/#a-propos" },
  ] as const;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVoipOpen, setIsVoipOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const voipCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const prefetchedRoutesRef = useRef<Set<string>>(new Set());
  const { scrollY } = useScroll();

  const servicesByCategory = useMemo(() => {
    return services.reduce<Record<string, typeof services>>((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {});
  }, []);

  const voipByCategory = useMemo(() => {
    return voipMenuLinks.reduce<Record<string, typeof voipMenuLinks>>(
      (acc, item) => {
        let category = "Accompagnement";
        if (
          ["/voip", "/cloud-pbx", "/sip-trunk", "/call-center"].includes(
            item.href
          )
        ) {
          category = "Offres VoIP";
        } else if (
          ["/tarifs", "/compatibilite", "/securite"].includes(item.href)
        ) {
          category = "Informations";
        }

        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      },
      {}
    );
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const clearCloseTimeout = (
    timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const preloadRoute = (route: string) => {
    const normalizedRoute = route.split("#")[0] || "/";
    if (!normalizedRoute.startsWith("/")) return;
    if (prefetchedRoutesRef.current.has(normalizedRoute)) return;
    prefetchedRoutesRef.current.add(normalizedRoute);

    fetch(normalizedRoute, { method: "GET", credentials: "same-origin" }).catch(
      () => {
        prefetchedRoutesRef.current.delete(normalizedRoute);
      }
    );
  };

  const preloadCriticalRoutes = () => {
    preloadRoute("/voip");
    preloadRoute("/tarifs");
    services.slice(0, 5).forEach((service) => {
      preloadRoute(`/services/${service.slug}`);
    });
  };

  const openVoipMenu = () => {
    clearCloseTimeout(voipCloseTimeoutRef);
    setIsVoipOpen(true);
    setIsServicesOpen(false);
  };

  const scheduleCloseVoipMenu = () => {
    clearCloseTimeout(voipCloseTimeoutRef);
    voipCloseTimeoutRef.current = setTimeout(() => {
      setIsVoipOpen(false);
    }, HOVER_CLOSE_DELAY);
  };

  useEffect(() => {
    return () => {
      clearCloseTimeout(voipCloseTimeoutRef);
    };
  }, []);

  useEffect(() => {
    if (!isServicesOpen && !isVoipOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
        setIsVoipOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isServicesOpen, isVoipOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
        setIsVoipOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <motion.nav
      className={`fixed left-0 right-0 z-50 w-[95%] max-w-6xl mx-auto transition-all duration-300 ease-in-out rounded-full
      ${isScrolled ? "top-4 shadow-2xl shadow-black/50" : "top-6"}`}
      animate={{ y: isScrolled ? -2 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div
        className={`relative flex items-center justify-between h-16 px-4 transition-all duration-300 border rounded-full backdrop-blur-xl ${
          isScrolled
            ? "bg-slate-900/80 border-cyan-300/20 shadow-2xl shadow-black/60"
            : "bg-slate-800/45 border-white/10 shadow-lg"
        }`}
      >
        {/* --- LOGO --- */}
        <a
          href="/"
          className="flex items-center gap-2 ml-3 md:ml-4 focus:outline-none"
        >
          <span className="text-xl font-extrabold tracking-wide text-slate-100 md:text-2xl">
            ASSILEL<span className="text-cyan-400">-TECH</span>
          </span>
        </a>

        {/* --- DESKTOP MENU --- */}
        <div className="items-center hidden gap-1 md:flex" ref={desktopMenuRef}>
          <Link
            to="/#accueil"
            onMouseEnter={preloadCriticalRoutes}
            className="relative px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-300 transition-all duration-300 rounded-full group hover:text-cyan-300 hover:text-shadow-[0_0_12px_rgba(0,246,255,1)]"
          >
            Accueil
            <span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                preloadCriticalRoutes();
                setIsServicesOpen((prev) => !prev);
                setIsVoipOpen(false);
              }}
              className="relative inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-semibold text-cyan-200 transition-all duration-300 hover:text-cyan-100"
              aria-expanded={isServicesOpen}
              aria-haspopup="menu"
              aria-controls="services-menu"
            >
              Nos services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute left-0 z-50 pt-2 top-full"
                >
                  <div
                    id="services-menu"
                    role="menu"
                    className="w-[42rem] max-w-[72vw] p-4 overflow-y-auto border max-h-[28rem] rounded-2xl bg-slate-900/95 border-white/10 backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(servicesByCategory).map(
                        ([category, categoryServices]) => (
                          <div
                            key={category}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
                          >
                            <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-cyan-300">
                              {category}
                            </p>
                            <div className="space-y-1">
                              {categoryServices.map((service) => (
                                <Link
                                  key={service.slug}
                                  to={`/services/${service.slug}`}
                                  onMouseEnter={() =>
                                    preloadRoute(`/services/${service.slug}`)
                                  }
                                  onFocus={() =>
                                    preloadRoute(`/services/${service.slug}`)
                                  }
                                  onClick={() => setIsServicesOpen(false)}
                                  role="menuitem"
                                  className="block px-2 py-1.5 text-sm text-slate-200 rounded-lg hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                                >
                                  {service.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            to="/#developpement-web"
            className="relative px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-300 transition-all duration-300 rounded-full group hover:text-cyan-300 hover:text-shadow-[0_0_12px_rgba(0,246,255,1)]"
          >
            Dév Web
            <span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
          <Link
            to="/#nos-valeurs"
            className="relative px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-300 transition-all duration-300 rounded-full group hover:text-cyan-300 hover:text-shadow-[0_0_12px_rgba(0,246,255,1)]"
          >
            Nos Valeurs
            <span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
          <div
            className="relative"
            onMouseEnter={() => {
              preloadRoute("/voip");
              openVoipMenu();
            }}
            onMouseLeave={scheduleCloseVoipMenu}
          >
            <Link
              to="/voip"
              onMouseEnter={() => preloadRoute("/voip")}
              onFocus={() => preloadRoute("/voip")}
              className="relative inline-flex items-center gap-1 px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium text-slate-300 transition-all duration-300 rounded-full group hover:text-cyan-300"
            >
              VoIP
              <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </Link>
            <AnimatePresence>
              {isVoipOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute right-0 z-50 pt-2 top-full"
                  onMouseEnter={openVoipMenu}
                  onMouseLeave={scheduleCloseVoipMenu}
                >
                  <div className="w-[42rem] max-w-[72vw] p-4 overflow-y-auto border max-h-[28rem] rounded-2xl bg-slate-900/95 border-white/10 backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(voipByCategory).map(
                        ([category, categoryLinks]) => (
                          <div
                            key={category}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
                          >
                            <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-cyan-300">
                              {category}
                            </p>
                            <div className="space-y-1">
                              {categoryLinks.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  onMouseEnter={() => preloadRoute(item.href)}
                                  onFocus={() => preloadRoute(item.href)}
                                  onClick={() => setIsVoipOpen(false)}
                                  className="block px-2 py-1.5 text-sm text-slate-200 rounded-lg hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            to="/#faq"
            className="relative px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-300 transition-all duration-300 rounded-full group hover:text-cyan-300 hover:text-shadow-[0_0_12px_rgba(0,246,255,1)]"
          >
            FAQ
            <span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
          <Link
            to="/blog"
            className="relative px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-300 transition-all duration-300 rounded-full group hover:text-cyan-300 hover:text-shadow-[0_0_12px_rgba(0,246,255,1)]"
          >
            Blog
            <span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
          <Link
            to="/#a-propos"
            className="relative px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-300 transition-all duration-300 rounded-full group hover:text-cyan-300 hover:text-shadow-[0_0_12px_rgba(0,246,255,1)]"
          >
            À propos
            <span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
        </div>

        {/* --- CTA & MOBILE MENU BUTTON --- */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button
              href="/#audit"
              variant="primary"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "navbar_audit",
                  destination: "/#audit",
                })
              }
            >
              Audit Gratuit
            </Button>
          </div>
          <button
            onClick={() => {
              const nextOpen = !isOpen;
              setIsOpen(nextOpen);
              if (!nextOpen) {
                setIsMobileServicesOpen(false);
              }
              setIsServicesOpen(false);
              setIsVoipOpen(false);
            }}
            className="p-2 text-gray-300 md:hidden hover:text-white"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute w-full p-4 mt-2 overflow-hidden border bg-slate-900/90 backdrop-blur-lg border-white/10 rounded-3xl md:hidden top-full"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onMouseEnter={() => preloadRoute(item.href)}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-lg text-center text-gray-200 rounded-xl hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                    className="flex items-center justify-center w-full gap-2 px-4 py-3 text-lg text-center text-gray-200 rounded-xl hover:bg-white/5 hover:text-white"
                    aria-expanded={isMobileServicesOpen}
                    aria-controls="mobile-services-menu"
                  >
                    Nos services
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isMobileServicesOpen && (
                      <motion.div
                        id="mobile-services-menu"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="mt-1 space-y-1"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            onMouseEnter={() =>
                              preloadRoute(`/services/${service.slug}`)
                            }
                            onClick={() => {
                              setIsMobileServicesOpen(false);
                              setIsOpen(false);
                            }}
                            className="block px-4 py-2 text-base text-center text-gray-300 rounded-xl hover:bg-white/5 hover:text-white"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
