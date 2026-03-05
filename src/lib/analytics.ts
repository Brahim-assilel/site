type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

const hasAnalytics = () => Boolean(measurementId);

export const initAnalytics = () => {
  if (!hasAnalytics() || typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const scriptId = "ga4-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
};

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  if (!hasAnalytics() || !window.gtag) return;
  window.gtag("event", eventName, params);
};

export const trackPageView = (pagePath: string) => {
  trackEvent("page_view", { page_path: pagePath });
};
