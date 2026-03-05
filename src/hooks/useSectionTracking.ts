import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

const STORAGE_KEY = "tracked_sections";

const getTrackedSections = (): Set<string> => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
};

const saveTrackedSections = (sections: Set<string>) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...sections]));
};

export const useSectionTracking = (sectionIds: string[]) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const tracked = getTrackedSections();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute("id");
          if (!sectionId || tracked.has(sectionId)) return;

          trackEvent("section_view", { section_id: sectionId });
          tracked.add(sectionId);
          saveTrackedSections(tracked);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      if (tracked.has(id)) return;
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);
};
