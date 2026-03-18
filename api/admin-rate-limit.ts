import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";

type EnvLike = Record<string, string | undefined>;
type SqlClient = (
  strings: TemplateStringsArray,
  ...params: unknown[]
) => Promise<unknown>;

type CountRow = {
  count: number | string;
};

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

let schemaReadyPromise: Promise<void> | null = null;

const resolveDatabaseUrl = (env: EnvLike) =>
  env.DATABASE_URL?.trim() || env.POSTGRES_URL?.trim() || "";

const getSqlClient = (env: EnvLike) => {
  const databaseUrl = resolveDatabaseUrl(env);
  if (!databaseUrl) {
    throw new Error("DATABASE_URL manquant.");
  }

  return neon(databaseUrl) as unknown as SqlClient;
};

const ensureSchema = async (sql: SqlClient) => {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS admin_login_attempts (
          id TEXT PRIMARY KEY,
          ip TEXT NOT NULL,
          attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS admin_login_attempts_ip_attempted_idx
        ON admin_login_attempts (ip, attempted_at DESC)
      `;
    })();
  }

  await schemaReadyPromise;
};

const parseCount = (value: number | string | undefined) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return parsed;
  }

  return 0;
};

export const isAdminLoginRateLimitedPersistent = async (
  env: EnvLike,
  clientIp: string,
) => {
  const ip = clientIp.trim();
  if (!ip) {
    return false;
  }

  const sql = getSqlClient(env);
  await ensureSchema(sql);

  const windowStart = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();

  await sql`
    DELETE FROM admin_login_attempts
    WHERE attempted_at < ${windowStart}
  `;

  const countRows = (await sql`
    SELECT COUNT(*)::int AS count
    FROM admin_login_attempts
    WHERE ip = ${ip}
      AND attempted_at >= ${windowStart}
  `) as CountRow[];

  const attempts = parseCount(countRows[0]?.count);
  if (attempts >= LOGIN_MAX_ATTEMPTS) {
    return true;
  }

  await sql`
    INSERT INTO admin_login_attempts (id, ip)
    VALUES (${randomUUID()}, ${ip})
  `;

  return false;
};
