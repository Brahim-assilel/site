import { useMemo } from "react";
import { Hero } from "../components/sections/Hero";
import { ServicesSection } from "../components/sections/ServicesSection";
import { WebDevelopmentSection } from "../components/sections/WebDevelopmentSection";
import { EngagementSection } from "../components/sections/EngagementSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ValuesSection } from "../components/sections/ValuesSection";
import { PartnersSection } from "../components/sections/PartnersSection";
import { AuditSection } from "../components/sections/AuditSection";
import { FaqSection } from "../components/sections/FaqSection";
import { Contact } from "../components/sections/Contact";
import { useSectionTracking } from "../hooks/useSectionTracking";

export const HomePage = () => {
  const trackedSections = useMemo(
    () => [
      "accueil",
      "services",
      "developpement-web",
      "engagement",
      "a-propos",
      "nos-valeurs",
      "partners",
      "audit",
      "faq",
      "contact",
    ],
    []
  );

  useSectionTracking(trackedSections);

  return (
    <>
      <Hero />
      <ServicesSection />
      <WebDevelopmentSection />
      <EngagementSection />
      <AboutSection />
      <ValuesSection />
      <PartnersSection />
      <AuditSection />
      <FaqSection />
      <Contact />
    </>
  );
};
