export type ArticleShareLinks = {
  articleUrl: string;
  facebookUrl: string;
  xUrl: string;
  linkedinUrl: string;
  whatsappUrl: string;
};

const getSiteOrigin = () => {
  const envOrigin = import.meta.env.VITE_SITE_URL;
  if (typeof envOrigin === "string" && envOrigin.trim().length > 0) {
    return envOrigin.trim().replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

export const getArticleUrl = (slug: string) => `${getSiteOrigin()}/blog/${slug}`;

export const getArticleShareLinks = (
  title: string,
  slug: string,
): ArticleShareLinks => {
  const articleUrl = getArticleUrl(slug);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedWhatsappMessage = encodeURIComponent(`${title} ${articleUrl}`);

  return {
    articleUrl,
    facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    xUrl: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsappUrl: `https://wa.me/?text=${encodedWhatsappMessage}`,
  };
};
