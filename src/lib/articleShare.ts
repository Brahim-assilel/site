export type ArticleShareLinks = {
  articleUrl: string;
  shareLandingUrl: string;
  facebookUrl: string;
  xUrl: string;
  linkedinUrl: string;
  whatsappUrl: string;
};

const getSiteOrigin = () => {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }

  const envOrigin = import.meta.env.VITE_SITE_URL;
  if (typeof envOrigin === "string" && envOrigin.trim().length > 0) {
    return envOrigin.trim().replace(/\/+$/, "");
  }

  return "https://assilel-tech.net";
};

export const getArticleUrl = (slug: string) => `${getSiteOrigin()}/blog/${slug}`;
export const getArticleShareLandingUrl = (title: string, slug: string) =>
  `${getSiteOrigin()}/api/share?slug=${encodeURIComponent(slug)}&title=${encodeURIComponent(
    title,
  )}`;

export const getArticleShareLinks = (
  title: string,
  slug: string,
): ArticleShareLinks => {
  const articleUrl = getArticleUrl(slug);
  const shareLandingUrl = getArticleShareLandingUrl(title, slug);
  const encodedTitle = encodeURIComponent(title);
  const encodedLandingUrl = encodeURIComponent(shareLandingUrl);
  const encodedWhatsappMessage = encodeURIComponent(`${title} ${shareLandingUrl}`);

  return {
    articleUrl,
    shareLandingUrl,
    facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedLandingUrl}`,
    xUrl: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedLandingUrl}`,
    linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLandingUrl}`,
    whatsappUrl: `https://wa.me/?text=${encodedWhatsappMessage}`,
  };
};
