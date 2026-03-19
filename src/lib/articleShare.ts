export type ArticleShareLinks = {
  articleUrl: string;
  sharePreviewUrl: string;
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
export const getArticleSharePreviewUrl = (slug: string) =>
  `${getSiteOrigin()}/blog-share/${slug}`;

export const getArticleShareLinks = (
  title: string,
  slug: string,
): ArticleShareLinks => {
  const articleUrl = getArticleUrl(slug);
  const sharePreviewUrl = getArticleSharePreviewUrl(slug);
  const encodedTitle = encodeURIComponent(title);
  const encodedPreviewUrl = encodeURIComponent(sharePreviewUrl);
  const encodedWhatsappMessage = encodeURIComponent(`${title} ${sharePreviewUrl}`);

  return {
    articleUrl,
    sharePreviewUrl,
    facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedPreviewUrl}`,
    xUrl: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedPreviewUrl}`,
    linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPreviewUrl}`,
    whatsappUrl: `https://wa.me/?text=${encodedWhatsappMessage}`,
  };
};
