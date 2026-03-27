import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";

type EnvLike = Record<string, string | undefined>;
type SqlClient = (
  strings: TemplateStringsArray,
  ...params: unknown[]
) => Promise<unknown>;

type FormSubmissionRow = {
  id: string;
  submission_id: string;
  form_name: string;
  requester_name: string | null;
  requester_email: string | null;
  requester_phone: string | null;
  company: string | null;
  website: string | null;
  message: string | null;
  payload_json: string;
  client_ip: string | null;
  created_at: string | Date;
};

export type FormSubmissionRecord = {
  id: string;
  submissionId: string;
  formName: string;
  requesterName?: string;
  requesterEmail?: string;
  requesterPhone?: string;
  company?: string;
  website?: string;
  message?: string;
  payload: Record<string, string>;
  clientIp?: string;
  createdAt: string;
};

export type CreateFormSubmissionInput = {
  submissionId: string;
  formName: string;
  fields: Record<string, string>;
  clientIp?: string;
};

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

const normalizeDateTimeValue = (value: string | Date) => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
};

const parsePayload = (raw: string): Record<string, string> => {
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [key, String(value ?? "")]),
    );
  } catch {
    return {};
  }
};

const mapRowToRecord = (row: FormSubmissionRow): FormSubmissionRecord => ({
  id: row.id,
  submissionId: row.submission_id,
  formName: row.form_name,
  requesterName: row.requester_name || undefined,
  requesterEmail: row.requester_email || undefined,
  requesterPhone: row.requester_phone || undefined,
  company: row.company || undefined,
  website: row.website || undefined,
  message: row.message || undefined,
  payload: parsePayload(row.payload_json),
  clientIp: row.client_ip || undefined,
  createdAt: normalizeDateTimeValue(row.created_at),
});

const ensureFormSubmissionsSchema = async (sql: SqlClient) => {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS form_submissions (
          id TEXT PRIMARY KEY,
          submission_id TEXT UNIQUE NOT NULL,
          form_name TEXT NOT NULL,
          requester_name TEXT,
          requester_email TEXT,
          requester_phone TEXT,
          company TEXT,
          website TEXT,
          message TEXT,
          payload_json TEXT NOT NULL,
          client_ip TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS form_submissions_submission_id_unique_idx
        ON form_submissions (submission_id)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS form_submissions_created_at_idx
        ON form_submissions (created_at DESC)
      `;
    })();
  }

  await schemaReadyPromise;
};

const withFormSchema = async <T>(
  env: EnvLike,
  callback: (sql: SqlClient) => Promise<T>,
) => {
  const sql = getSqlClient(env);
  await ensureFormSubmissionsSchema(sql);
  return callback(sql);
};

const safeField = (fields: Record<string, string>, key: string) => {
  const value = fields[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
};

export const createFormSubmission = async (
  env: EnvLike,
  input: CreateFormSubmissionInput,
) =>
  withFormSchema(env, async (sql) => {
    const id = randomUUID();
    const payloadJson = JSON.stringify(input.fields);

    const rows = (await sql`
      INSERT INTO form_submissions (
        id,
        submission_id,
        form_name,
        requester_name,
        requester_email,
        requester_phone,
        company,
        website,
        message,
        payload_json,
        client_ip
      ) VALUES (
        ${id},
        ${input.submissionId},
        ${input.formName},
        ${safeField(input.fields, "name")},
        ${safeField(input.fields, "email")},
        ${safeField(input.fields, "phone")},
        ${safeField(input.fields, "company")},
        ${safeField(input.fields, "website")},
        ${safeField(input.fields, "message")},
        ${payloadJson},
        ${input.clientIp?.trim() || null}
      )
      RETURNING
        id,
        submission_id,
        form_name,
        requester_name,
        requester_email,
        requester_phone,
        company,
        website,
        message,
        payload_json,
        client_ip,
        created_at
    `) as FormSubmissionRow[];

    return mapRowToRecord(rows[0]);
  });

export const listAdminFormSubmissions = async (env: EnvLike, limit = 50) =>
  withFormSchema(env, async (sql) => {
    const resolvedLimit = Number.isFinite(limit)
      ? Math.max(1, Math.min(200, Math.round(limit)))
      : 50;

    const rows = (await sql`
      SELECT
        id,
        submission_id,
        form_name,
        requester_name,
        requester_email,
        requester_phone,
        company,
        website,
        message,
        payload_json,
        client_ip,
        created_at
      FROM form_submissions
      ORDER BY created_at DESC
      LIMIT ${resolvedLimit}
    `) as FormSubmissionRow[];

    return rows.map(mapRowToRecord);
  });
