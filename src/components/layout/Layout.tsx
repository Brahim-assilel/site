import { Analytics } from "@vercel/analytics/react";
import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTopButton } from "../ui/ScrollToTopButton";
import { FloatingQuoteButton } from "../ui/FloatingQuoteButton";
import { FloatingWhatsAppButton } from "../ui/FloatingWhatsAppButton";
import { MobileBottomNav } from "../ui/MobileBottomNav";
import { trackPageView } from "../../lib/analytics";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === "") {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};

export const Layout = () => {
  const location = useLocation();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    const currentPath = `${location.pathname}${location.hash}`;
    if (lastTrackedPath.current === currentPath) return;
    trackPageView(currentPath);
    lastTrackedPath.current = currentPath;
  }, [location.pathname, location.hash]);

  return (
    <div className="relative z-10">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="pb-24 md:pb-0"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileBottomNav />
      <FloatingWhatsAppButton />
      <ScrollToTopButton />
      <FloatingQuoteButton />
      <Analytics />
    </div>
  );
};
