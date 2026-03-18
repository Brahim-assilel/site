import {
  createBlogPost,
  deleteBlogPost,
  listAdminBlogPosts,
  setBlogPostPublished,
  updateBlogPost,
} from "./blog-db.js";
import {
  isUniqueViolationError,
  parseApiBody,
  parseBlogPostId,
  parseBlogPostWriteInput,
  parsePublishToggleInput,
} from "./blog-payload.js";
import {
  getClientIp,
  getSessionTokenFromCookie,
  isAdminIpAllowed,
  resolveAdminConfig,
  verifyAdminSessionToken,
} from "./admin-auth.js";

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => unknown;
};

const getHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const isAdminAuthenticated = (req: ApiRequest) => {
  const clientIp = getClientIp(req.headers, req.socket?.remoteAddress);
  if (!isAdminIpAllowed(clientIp, process.env)) {
    return {
      ok: false as const,
      status: 403,
      message: "Acces admin refusé depuis cette IP.",
    };
  }

  const adminConfig = resolveAdminConfig(process.env);
  if (!adminConfig.isConfigured) {
    return { ok: false as const, status: 500, message: "Configuration admin manquante." };
  }

  const cookieHeader = getHeaderValue(req.headers?.cookie);
  const token = getSessionTokenFromCookie(cookieHeader);
  const sessionEmail = verifyAdminSessionToken(token, adminConfig.sessionSecret);
  if (sessionEmail !== adminConfig.email) {
    return { ok: false as const, status: 401, message: "Session admin invalide." };
  }

  return { ok: true as const };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const auth = isAdminAuthenticated(req);
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.message });
  }

  if (req.method === "GET") {
    try {
      const posts = await listAdminBlogPosts(process.env);
      return res.status(200).json({ posts });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Impossible de charger les articles.";
      return res.status(500).json({ error: message });
    }
  }

  if (req.method === "POST") {
    try {
      const body = parseApiBody(req.body);
      const payload = parseBlogPostWriteInput(body);
      const post = await createBlogPost(process.env, payload);
      return res.status(201).json({ post });
    } catch (error) {
      if (isUniqueViolationError(error)) {
        return res.status(409).json({ error: "Ce slug existe déjà." });
      }

      const message =
        error instanceof Error
          ? error.message
          : "Impossible de créer l'article.";
      return res.status(400).json({ error: message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const body = parseApiBody(req.body);
      const hasOnlyPublishedToggle =
        Object.keys(body).every((key) => key === "id" || key === "published") &&
        typeof body.published === "boolean";

      if (hasOnlyPublishedToggle) {
        const { id, published } = parsePublishToggleInput(body);
        const post = await setBlogPostPublished(process.env, id, published);
        if (!post) {
          return res.status(404).json({ error: "Article introuvable." });
        }
        return res.status(200).json({ post });
      }

      const id = parseBlogPostId(body.id);
      const payload = parseBlogPostWriteInput(body);
      const post = await updateBlogPost(process.env, id, payload);
      if (!post) {
        return res.status(404).json({ error: "Article introuvable." });
      }

      return res.status(200).json({ post });
    } catch (error) {
      if (isUniqueViolationError(error)) {
        return res.status(409).json({ error: "Ce slug existe déjà." });
      }

      const message =
        error instanceof Error
          ? error.message
          : "Impossible de modifier l'article.";
      return res.status(400).json({ error: message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const body = parseApiBody(req.body);
      const id = parseBlogPostId(body.id);
      const deleted = await deleteBlogPost(process.env, id);
      if (!deleted) {
        return res.status(404).json({ error: "Article introuvable." });
      }

      return res.status(200).json({ ok: true });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Impossible de supprimer l'article.";
      return res.status(400).json({ error: message });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
