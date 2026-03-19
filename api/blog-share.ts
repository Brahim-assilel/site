import { listPublishedBlogPosts } from "./blog-db.js";
import { staticBlogShareMeta } from "../src/data/blogShareMetadata.js";

type ApiRequest = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | undefined>;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  send: (payload: string) => unknown;
};

type ShareMeta = {
  slug: string;
  title: string;
  description: string;
  image?: string;
};

const DEFAULT_SITE_URL = "https://assilel-tech.net";
const DEFAULT_IMAGE_PATH = "/logo.png";

const safeText = (value: unknown, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const cleaned = value.trim();
  return cleaned || fallback;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getBaseUrl = (req: ApiRequest) => {
  const envUrl = process.env.VITE_SITE_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  const hostHeader = req.headers?.host?.trim();
  if (hostHeader) {
    return `https://${hostHeader.replace(/\/+$/, "")}`;
  }

  return DEFAULT_SITE_URL;
};

const absoluteUrl = (baseUrl: string, value: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${baseUrl}${value.startsWith("/") ? "" : "/"}${value}`;
};

const getSlugFromRequest = (req: ApiRequest) => {
  const raw = req.query?.slug;
  const slug = Array.isArray(raw) ? raw[0] : raw;
  return safeText(slug, "");
};

const findMetaBySlug = async (slug: string): Promise<ShareMeta | null> => {
  if (!slug) return null;

  try {
    const published = await listPublishedBlogPosts(process.env);
    const managedPost = published.find((post) => post.slug === slug);
    if (managedPost) {
      return {
        slug: managedPost.slug,
        title: managedPost.title,
        description: managedPost.description,
        image: managedPost.image,
      };
    }
  } catch {
    // Ignore DB issues and fallback to static metadata.
  }

  const staticPost = staticBlogShareMeta.find((post) => post.slug === slug);
  if (!staticPost) return null;

  return {
    slug: staticPost.slug,
    title: staticPost.title,
    description: staticPost.description,
    image: staticPost.image,
  };
};

const buildHtml = (meta: ShareMeta, baseUrl: string) => {
  const articleUrl = absoluteUrl(baseUrl, `/blog/${meta.slug}`);
  const ogImage = absoluteUrl(baseUrl, meta.image || DEFAULT_IMAGE_PATH);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const safeArticleUrl = escapeHtml(articleUrl);
  const safeImageUrl = escapeHtml(ogImage);

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Assilel-Tech" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${safeArticleUrl}" />
    <meta property="og:image" content="${safeImageUrl}" />
    <meta property="og:image:secure_url" content="${safeImageUrl}" />
    <meta property="og:image:alt" content="${title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${safeImageUrl}" />
    <link rel="canonical" href="${safeArticleUrl}" />
    <meta http-equiv="refresh" content="0;url=${safeArticleUrl}" />
  </head>
  <body>
    <script>
      window.location.replace(${JSON.stringify(articleUrl)});
    </script>
    <p>Redirection vers l'article...</p>
  </body>
</html>`;
};

const buildNotFoundHtml = (baseUrl: string) => {
  const blogUrl = absoluteUrl(baseUrl, "/blog");
  const safeBlogUrl = escapeHtml(blogUrl);
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${safeBlogUrl}" />
  </head>
  <body>
    <script>window.location.replace(${JSON.stringify(blogUrl)});</script>
    <p>Article introuvable. Redirection vers le blog...</p>
  </body>
</html>`;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(405).send("Method Not Allowed");
  }

  const baseUrl = getBaseUrl(req);
  const slug = getSlugFromRequest(req);
  const meta = await findMetaBySlug(slug);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");

  if (!meta) {
    return res.status(404).send(buildNotFoundHtml(baseUrl));
  }

  return res.status(200).send(buildHtml(meta, baseUrl));
}
