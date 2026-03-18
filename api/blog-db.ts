import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";

export type BlogPostRecord = {
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

export type BlogPostWriteInput = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  date: string;
  readingTime: number;
  content: string;
  published: boolean;
};

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  date: string | Date;
  reading_time: number;
  content: string;
  published: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

type EnvLike = Record<string, string | undefined>;
type SqlClient = (
  strings: TemplateStringsArray,
  ...params: unknown[]
) => Promise<unknown>;

let schemaReadyPromise: Promise<void> | null = null;

const normalizeDateValue = (value: string | Date) => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
};

const normalizeDateTimeValue = (value: string | Date) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
};

const mapRowToRecord = (row: BlogPostRow): BlogPostRecord => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  description: row.description,
  image: row.image || undefined,
  category: row.category,
  date: normalizeDateValue(row.date),
  readingTime: row.reading_time,
  content: row.content,
  published: row.published,
  createdAt: normalizeDateTimeValue(row.created_at),
  updatedAt: normalizeDateTimeValue(row.updated_at),
});

const resolveDatabaseUrl = (env: EnvLike) =>
  env.DATABASE_URL?.trim() || env.POSTGRES_URL?.trim() || "";

const getSqlClient = (env: EnvLike) => {
  const databaseUrl = resolveDatabaseUrl(env);
  if (!databaseUrl) {
    throw new Error("DATABASE_URL manquant.");
  }

  return neon(databaseUrl) as unknown as SqlClient;
};

const ensureBlogSchema = async (sql: SqlClient) => {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id TEXT PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          image TEXT,
          category TEXT NOT NULL,
          date DATE NOT NULL,
          reading_time INTEGER NOT NULL DEFAULT 1,
          content TEXT NOT NULL,
          published BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique_idx
        ON blog_posts (slug)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS blog_posts_published_date_idx
        ON blog_posts (published, date DESC)
      `;
    })();
  }

  await schemaReadyPromise;
};

const withBlogSchema = async <T>(
  env: EnvLike,
  callback: (sql: SqlClient) => Promise<T>,
) => {
  const sql = getSqlClient(env);
  await ensureBlogSchema(sql);
  return callback(sql);
};

export const listPublishedBlogPosts = async (env: EnvLike) =>
  withBlogSchema(env, async (sql) => {
    const rows = (await sql`
      SELECT
        id,
        slug,
        title,
        description,
        image,
        category,
        date,
        reading_time,
        content,
        published,
        created_at,
        updated_at
      FROM blog_posts
      WHERE published = TRUE
      ORDER BY date DESC, updated_at DESC
    `) as BlogPostRow[];

    return rows.map(mapRowToRecord);
  });

export const listAdminBlogPosts = async (env: EnvLike) =>
  withBlogSchema(env, async (sql) => {
    const rows = (await sql`
      SELECT
        id,
        slug,
        title,
        description,
        image,
        category,
        date,
        reading_time,
        content,
        published,
        created_at,
        updated_at
      FROM blog_posts
      ORDER BY date DESC, updated_at DESC
    `) as BlogPostRow[];

    return rows.map(mapRowToRecord);
  });

export const createBlogPost = async (env: EnvLike, input: BlogPostWriteInput) =>
  withBlogSchema(env, async (sql) => {
    const id = randomUUID();
    const rows = (await sql`
      INSERT INTO blog_posts (
        id,
        slug,
        title,
        description,
        image,
        category,
        date,
        reading_time,
        content,
        published
      ) VALUES (
        ${id},
        ${input.slug},
        ${input.title},
        ${input.description},
        ${input.image || null},
        ${input.category},
        ${input.date},
        ${input.readingTime},
        ${input.content},
        ${input.published}
      )
      RETURNING
        id,
        slug,
        title,
        description,
        image,
        category,
        date,
        reading_time,
        content,
        published,
        created_at,
        updated_at
    `) as BlogPostRow[];

    return mapRowToRecord(rows[0]);
  });

export const updateBlogPost = async (
  env: EnvLike,
  id: string,
  input: BlogPostWriteInput,
) =>
  withBlogSchema(env, async (sql) => {
    const rows = (await sql`
      UPDATE blog_posts
      SET
        slug = ${input.slug},
        title = ${input.title},
        description = ${input.description},
        image = ${input.image || null},
        category = ${input.category},
        date = ${input.date},
        reading_time = ${input.readingTime},
        content = ${input.content},
        published = ${input.published},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING
        id,
        slug,
        title,
        description,
        image,
        category,
        date,
        reading_time,
        content,
        published,
        created_at,
        updated_at
    `) as BlogPostRow[];

    const row = rows[0];
    return row ? mapRowToRecord(row) : null;
  });

export const setBlogPostPublished = async (
  env: EnvLike,
  id: string,
  published: boolean,
) =>
  withBlogSchema(env, async (sql) => {
    const rows = (await sql`
      UPDATE blog_posts
      SET
        published = ${published},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING
        id,
        slug,
        title,
        description,
        image,
        category,
        date,
        reading_time,
        content,
        published,
        created_at,
        updated_at
    `) as BlogPostRow[];

    const row = rows[0];
    return row ? mapRowToRecord(row) : null;
  });

export const deleteBlogPost = async (env: EnvLike, id: string) =>
  withBlogSchema(env, async (sql) => {
    const rows = (await sql`
      DELETE FROM blog_posts
      WHERE id = ${id}
      RETURNING id
    `) as Array<{ id: string }>;

    return rows.length > 0;
  });
