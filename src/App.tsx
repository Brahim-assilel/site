import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Background } from "./components/layout/Background";
import { VoipPage } from "./pages/VoipPage";
import { CloudPbxPage } from "./pages/CloudPbxPage";
import { SipTrunkPage } from "./pages/SipTrunkPage";
import { CallCenterPage } from "./pages/CallCenterPage";
import { TarifsPage } from "./pages/TarifsPage";
import { CompatibilitePage } from "./pages/CompatibilitePage";
import { SecuritePage } from "./pages/SecuritePage";
import { SupportPage } from "./pages/SupportPage";
import { DemoPage } from "./pages/DemoPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { BlogIndexPage as BlogListPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return sessionStorage.getItem("assilel-tech_loader_seen") !== "1";
    } catch {
      return true;
    }
  });
  const [logoSrc, setLogoSrc] = useState("/biglogo.png");

  useEffect(() => {
    if (!isLoading) return;
    try {
      sessionStorage.setItem("assilel-tech_loader_seen", "1");
    } catch {
      // Ignore storage errors and keep default behavior.
    }

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-[#0D0B15] text-slate-300 selection:bg-cyan-300/20">
      <Background /> {/* Le fond est global */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#070B14]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.15),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(59,130,246,0.16),transparent_48%),linear-gradient(160deg,#070B14_5%,#0A1220_55%,#070B14_100%)]" />
            <motion.div
              animate={{ backgroundPositionX: ["0px", "120px"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(125,211,252,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.18)_1px,transparent_1px)] bg-[size:30px_30px]"
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex flex-col items-center px-6 py-6"
            >
              <motion.div
                animate={{ opacity: [0.25, 0.65, 0.25] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[90vw] max-w-[1420px] h-36 rounded-full bg-cyan-300/20 blur-3xl"
              />
              <motion.img
                src={logoSrc}
                alt="Logo Assilel-Tech"
                onError={() => setLogoSrc("/vite.svg")}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.42, ease: "easeOut", delay: 0.04 }}
                className="relative object-contain h-auto w-[1080px] max-w-[95vw]"
              />
              <p className="relative mt-5 text-[11px] font-semibold tracking-[0.3em] text-cyan-100/90 uppercase">
                Assilel-Tech
              </p>
              <motion.div
                initial={{ scaleX: 0.45, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="relative h-px mt-3 origin-center w-80 bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="voip" element={<VoipPage />} />
            <Route path="cloud-pbx" element={<CloudPbxPage />} />
            <Route path="sip-trunk" element={<SipTrunkPage />} />
            <Route path="call-center" element={<CallCenterPage />} />
            <Route path="tarifs" element={<TarifsPage />} />
            <Route path="compatibilite" element={<CompatibilitePage />} />
            <Route path="securite" element={<SecuritePage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="demo" element={<DemoPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
