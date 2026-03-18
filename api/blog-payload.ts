import type { BlogPostWriteInput } from "./blog-db.js";

const safeString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const estimateReadingTime = (content: string) => {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
};

const parseDate = (value: string) => {
  const match = /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (!match) return null;

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;

  return value;
};

const parseReadingTime = (value: unknown, content: string) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return estimateReadingTime(content);
  }

  return Math.max(1, Math.round(value));
};

export const parseApiBody = (body: unknown) => {
  if (!body) return {} as Record<string, unknown>;

  if (typeof body === "string") {
    return JSON.parse(body || "{}") as Record<string, unknown>;
  }

  if (typeof body === "object") {
    return body as Record<string, unknown>;
  }

  return {} as Record<string, unknown>;
};

export const parseBlogPostId = (value: unknown) => {
  const id = safeString(value);
  if (!id) {
    throw new Error("Identifiant d'article invalide.");
  }

  return id;
};

export const parseBlogPostWriteInput = (
  body: Record<string, unknown>,
): BlogPostWriteInput => {
  const title = safeString(body.title);
  const description = safeString(body.description);
  const category = safeString(body.category);
  const content = safeString(body.content);
  const image = safeString(body.image) || undefined;
  const dateRaw = safeString(body.date);
  const slugRaw = safeString(body.slug) || title;
  const slug = normalizeSlug(slugRaw);
  const date = parseDate(dateRaw);

  if (!title) throw new Error("Le titre est requis.");
  if (!description) throw new Error("La description est requise.");
  if (!category) throw new Error("La catégorie est requise.");
  if (!content) throw new Error("Le contenu est requis.");
  if (!slug) throw new Error("Le slug est invalide.");
  if (!date) throw new Error("La date est invalide.");

  const published = Boolean(body.published);
  const readingTime = parseReadingTime(body.readingTime, content);

  return {
    slug,
    title,
    description,
    image,
    category,
    date,
    readingTime,
    content,
    published,
  };
};

export const parsePublishToggleInput = (body: Record<string, unknown>) => {
  if (typeof body.published !== "boolean") {
    throw new Error("Le statut de publication est invalide.");
  }

  return {
    id: parseBlogPostId(body.id),
    published: body.published,
  };
};

export const isUniqueViolationError = (error: unknown) => {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: string }).code || "")
      : "";

  const message = error instanceof Error ? error.message : String(error || "");

  return (
    code === "23505" ||
    message.includes("duplicate key value") ||
    message.includes("blog_posts_slug_unique_idx") ||
    message.includes("blog_posts_slug_key")
  );
};
