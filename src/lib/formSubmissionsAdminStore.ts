export type AdminFormSubmission = {
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

type SubmissionsApiResponse = {
  submissions?: unknown;
  error?: string;
};

const parseErrorMessage = async (response: Response, fallback: string) => {
  const body = (await response.json().catch(() => null)) as
    | SubmissionsApiResponse
    | null;
  return body && typeof body.error === "string" ? body.error : fallback;
};

const toSubmission = (value: unknown): AdminFormSubmission | null => {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;

  const id = typeof row.id === "string" ? row.id : "";
  const submissionId = typeof row.submissionId === "string" ? row.submissionId : "";
  const formName = typeof row.formName === "string" ? row.formName : "";
  const createdAt = typeof row.createdAt === "string" ? row.createdAt : "";

  if (!id || !submissionId || !formName || !createdAt) return null;

  const safeString = (field: string) =>
    typeof row[field] === "string" && (row[field] as string).trim()
      ? (row[field] as string).trim()
      : undefined;

  const payloadRaw = row.payload;
  const payload =
    payloadRaw && typeof payloadRaw === "object"
      ? Object.fromEntries(
          Object.entries(payloadRaw as Record<string, unknown>).map(([k, v]) => [
            k,
            String(v ?? ""),
          ]),
        )
      : {};

  return {
    id,
    submissionId,
    formName,
    requesterName: safeString("requesterName"),
    requesterEmail: safeString("requesterEmail"),
    requesterPhone: safeString("requesterPhone"),
    company: safeString("company"),
    website: safeString("website"),
    message: safeString("message"),
    payload,
    clientIp: safeString("clientIp"),
    createdAt,
  };
};

export const getAdminFormSubmissions = async (limit = 50) => {
  const response = await fetch(
    `/api/admin-blog-posts?resource=form-submissions&limit=${limit}`,
    {
    method: "GET",
    credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(
        response,
        "Impossible de charger les demandes de formulaires.",
      ),
    );
  }

  const payload = (await response.json().catch(() => ({}))) as SubmissionsApiResponse;
  const list = Array.isArray(payload.submissions) ? payload.submissions : [];

  return list
    .map(toSubmission)
    .filter((submission): submission is AdminFormSubmission => submission !== null);
};
