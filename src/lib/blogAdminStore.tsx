import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { blogPosts, type BlogPost } from "../data/blog";

export type ManagedBlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  date: string;
  readingTime: number;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PublicBlogPost = BlogPost & {
  source: "static" | "managed";
  managedId?: string;
};

type ManagedBlogPostInput = {
  id?: string;
  slug?: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  date: string;
  readingTime?: number;
  content: string;
  published: boolean;
};

type BlogApiResponse = {
  posts?: unknown;
  post?: unknown;
  error?: string;
};

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

const parseDateValue = (value: string) => {
  const date = new Date(value);
  const timestamp = date.getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
};

const toDateSortValue = (value: string) => {
  const timestamp = parseDateValue(value);
  return timestamp ?? 0;
};

const sortByDateDesc = <T extends { date: string; updatedAt?: string }>(
  left: T,
  right: T,
) => {
  const byDate = toDateSortValue(right.date) - toDateSortValue(left.date);
  if (byDate !== 0) return byDate;
  return (
    toDateSortValue(right.updatedAt || "") - toDateSortValue(left.updatedAt || "")
  );
};

const toRecord = (value: unknown): ManagedBlogPostRecord | null => {
  if (!value || typeof value !== "object") return null;
  const maybeRecord = value as Record<string, unknown>;

  const id = safeString(maybeRecord.id);
  const slug = normalizeSlug(safeString(maybeRecord.slug));
  const title = safeString(maybeRecord.title);
  const description = safeString(maybeRecord.description);
  const image = safeString(maybeRecord.image) || undefined;
  const category = safeString(maybeRecord.category);
  const date = safeString(maybeRecord.date);
  const content = safeString(maybeRecord.content);
  const createdAt = safeString(maybeRecord.createdAt);
  const updatedAt = safeString(maybeRecord.updatedAt);

  const readingTimeRaw = maybeRecord.readingTime;
  const readingTime =
    typeof readingTimeRaw === "number" && Number.isFinite(readingTimeRaw)
      ? Math.max(1, Math.round(readingTimeRaw))
      : estimateReadingTime(content);

  const published = Boolean(maybeRecord.published);

  if (
    !id ||
    !slug ||
    !title ||
    !description ||
    !category ||
    !date ||
    !content
  ) {
    return null;
  }

  return {
    id,
    slug,
    title,
    description,
    image,
    category,
    date,
    readingTime,
    content,
    published,
    createdAt: createdAt || new Date().toISOString(),
    updatedAt: updatedAt || new Date().toISOString(),
  };
};

const parseErrorMessage = async (response: Response, fallback: string) => {
  const body = (await response.json().catch(() => null)) as BlogApiResponse | null;
  return body && typeof body.error === "string" ? body.error : fallback;
};

const parsePostsPayload = (payload: BlogApiResponse) => {
  const list = Array.isArray(payload.posts) ? payload.posts : [];
  return list
    .map(toRecord)
    .filter((post): post is ManagedBlogPostRecord => post !== null)
    .sort(sortByDateDesc);
};

const parseSinglePostPayload = (payload: BlogApiResponse) => {
  const post = toRecord(payload.post);
  if (!post) {
    throw new Error("Réponse article invalide.");
  }
  return post;
};

const renderManagedContent = (content: string): ReactNode => {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return (
      <div className="space-y-4 text-slate-300">
        <p>Contenu de l&apos;article à venir.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-slate-300 leading-relaxed">
      {blocks.map((block, index) => (
        <p key={`${index}-${block.slice(0, 24)}`}>{block}</p>
      ))}
    </div>
  );
};

const mapManagedToPublic = (post: ManagedBlogPostRecord): PublicBlogPost => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  image: post.image,
  category: post.category,
  date: post.date,
  readingTime: post.readingTime,
  content: renderManagedContent(post.content),
  footer: null,
  source: "managed",
  managedId: post.id,
});

const getStaticPublicPosts = (): PublicBlogPost[] =>
  blogPosts.map((post) => ({
    ...post,
    source: "static" as const,
  }));

export const createSlugFromTitle = (value: string) => normalizeSlug(value);

export const getManagedBlogPosts = async () => {
  const response = await fetch("/api/admin-blog-posts", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(response, "Impossible de charger les articles."),
    );
  }

  const payload = (await response.json().catch(() => ({}))) as BlogApiResponse;
  return parsePostsPayload(payload);
};

const getPublishedManagedPosts = async () => {
  const response = await fetch("/api/blog-posts", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(response, "Impossible de charger le blog."),
    );
  }

  const payload = (await response.json().catch(() => ({}))) as BlogApiResponse;
  return parsePostsPayload(payload);
};

export const getPublicBlogPosts = async () => {
  const managedPosts = (await getPublishedManagedPosts()).map(mapManagedToPublic);
  const staticPosts = getStaticPublicPosts();
  return [...managedPosts, ...staticPosts].sort(sortByDateDesc);
};

export const saveManagedBlogPost = async (input: ManagedBlogPostInput) => {
  const payload = {
    ...(input.id ? { id: input.id } : {}),
    title: input.title,
    slug: input.slug,
    description: input.description,
    image: input.image,
    category: input.category,
    date: input.date,
    readingTime: input.readingTime,
    content: input.content,
    published: input.published,
  };

  const response = await fetch("/api/admin-blog-posts", {
    method: input.id ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(
        response,
        input.id
          ? "Impossible de modifier l'article."
          : "Impossible de créer l'article.",
      ),
    );
  }

  const responsePayload = (await response.json().catch(() => ({}))) as BlogApiResponse;
  return parseSinglePostPayload(responsePayload);
};

export const setManagedBlogPostPublished = async (
  id: string,
  published: boolean,
) => {
  const response = await fetch("/api/admin-blog-posts", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      id,
      published,
    }),
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(
        response,
        "Impossible de modifier l'état de publication.",
      ),
    );
  }

  const payload = (await response.json().catch(() => ({}))) as BlogApiResponse;
  return parseSinglePostPayload(payload);
};

export const deleteManagedBlogPost = async (id: string) => {
  const response = await fetch("/api/admin-blog-posts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(response, "Impossible de supprimer l'article."),
    );
  }
};

export const usePublicBlogPosts = () => {
  const [posts, setPosts] = useState<PublicBlogPost[]>(() =>
    getStaticPublicPosts().sort(sortByDateDesc),
  );

  useEffect(() => {
    let isMounted = true;

    getPublicBlogPosts()
      .then((nextPosts) => {
        if (!isMounted) return;
        setPosts(nextPosts);
      })
      .catch(() => {
        // Keep static fallback posts if remote API is unavailable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return posts;
};
