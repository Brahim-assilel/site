type HeaderValue = string | string[] | undefined;

type ApiRequest = {
  method?: string;
  url?: string;
  headers?: Record<string, HeaderValue>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  end: (body: string) => void;
  json: (payload: unknown) => void;
};

const DEFAULT_SITE = "https://www.assilel-tech.net";
const DEFAULT_TITLE = "Assilel Tech";
const DEFAULT_DESCRIPTION =
  "Solutions IT, téléphonie cloud et cybersécurité pour les entreprises.";
const DEFAULT_IMAGE = `${DEFAULT_SITE}/cover.png`;

const getHeaderValue = (value: HeaderValue) =>
  Array.isArray(value) ? value[0] : value;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const toSafeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

const resolveOrigin = (headers: ApiRequest["headers"]) => {
  const forwardedProto = getHeaderValue(headers?.["x-forwarded-proto"]);
  const forwardedHost = getHeaderValue(headers?.["x-forwarded-host"]);
  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const host = getHeaderValue(headers?.host);
  if (host) {
    const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1");
    return `${isLocalHost ? "http" : "https"}://${host}`;
  }

  return DEFAULT_SITE;
};

const parseShareData = (req: ApiRequest) => {
  const origin = resolveOrigin(req.headers);
  const requestUrl = new URL(req.url || "/api/share", origin);
  const rawSlug = requestUrl.searchParams.get("slug") || "";
  const slug = toSafeSlug(rawSlug);
  const title = (requestUrl.searchParams.get("title") || DEFAULT_TITLE).trim();
  const image = (requestUrl.searchParams.get("image") || "").trim();

  const articleUrl = slug ? `${origin}/blog/${slug}` : `${origin}/blog`;
  const safeImage = image.startsWith("http")
    ? image
    : image.startsWith("/")
      ? `${origin}${image}`
      : DEFAULT_IMAGE;

  return {
    articleUrl,
    title: title || DEFAULT_TITLE,
    imageUrl: safeImage,
  };
};

const renderShareHtml = (articleUrl: string, title: string, imageUrl: string) => {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(DEFAULT_DESCRIPTION);
  const safeUrl = escapeHtml(articleUrl);
  const safeImage = escapeHtml(imageUrl);

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:image" content="${safeImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
    <meta http-equiv="refresh" content="0; url=${safeUrl}" />
    <link rel="canonical" href="${safeUrl}" />
  </head>
  <body>
    <p>Redirection vers l'article… <a href="${safeUrl}">Continuer</a></p>
    <script>window.location.replace(${JSON.stringify(articleUrl)});</script>
  </body>
</html>`;
};

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { articleUrl, title, imageUrl } = parseShareData(req);
  const html = renderShareHtml(articleUrl, title, imageUrl);

  res.status(200);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=900");
  res.end(html);
}
