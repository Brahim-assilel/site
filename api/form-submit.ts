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

type EmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  reply_to?: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MIN_INTERVAL_MS = 10 * 1000;

type RateLimitEntry = {
  timestamps: number[];
  lastRequestAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const getHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const getClientIp = (req: ApiRequest) => {
  const forwardedFor = getHeaderValue(req.headers?.["x-forwarded-for"]);
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = getHeaderValue(req.headers?.["x-real-ip"]);
  if (realIp) {
    return realIp.trim();
  }

  return req.socket?.remoteAddress || "unknown";
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = rateLimitStore.get(key) || {
    timestamps: [],
    lastRequestAt: 0,
  };

  entry.timestamps = entry.timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (entry.lastRequestAt > 0 && now - entry.lastRequestAt < RATE_LIMIT_MIN_INTERVAL_MS) {
    rateLimitStore.set(key, entry);
    return true;
  }

  if (entry.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, entry);
    return true;
  }

  entry.timestamps.push(now);
  entry.lastRequestAt = now;
  rateLimitStore.set(key, entry);
  return false;
};

const pad = (value: number) => String(value).padStart(2, "0");

const generateSubmissionId = (date: Date) => {
  const timestamp = `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(
    date.getUTCDate(),
  )}-${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(
    date.getUTCSeconds(),
  )}`;
  const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FORM-${timestamp}-${randomSuffix}`;
};

const isEnabled = (value: string | undefined, defaultValue = true) => {
  if (!value) return defaultValue;
  const normalized = value.trim().toLowerCase();
  return !["0", "false", "no", "off"].includes(normalized);
};

const sendResendEmail = async (apiKey: string, payload: EmailPayload) => {
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!emailResponse.ok) {
    return {
      ok: false as const,
      error: await emailResponse.text(),
    };
  }

  return {ok: true as const};
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Trop de tentatives. Reessayez dans quelques instants.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmailRaw =
    process.env.FORM_TO_EMAILS?.trim() ||
    process.env.FORM_TO_EMAIL?.trim() ||
    "bramazene@gmail.com";
  const toEmails = Array.from(
    new Set(
      toEmailRaw
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
    ),
  );
  const fromEmail =
    process.env.FORM_FROM_EMAIL?.trim() ||
    "Assilel Tech <contact@assilel-tech.net>";
  const autoReplyEnabled = isEnabled(process.env.FORM_AUTOREPLY_ENABLED, true);

  if (!apiKey) {
    return res.status(500).json({
      error: "RESEND_API_KEY manquant.",
    });
  }

  let parsedBody: Record<string, string> = {};
  try {
    parsedBody =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : ((req.body as Record<string, string>) ?? {});
  } catch {
    return res.status(400).json({ error: "Payload JSON invalide." });
  }

  const { formName = "site_form", __hp: honeypotRaw, ...fields } = parsedBody;
  const honeypot = typeof honeypotRaw === "string" ? honeypotRaw.trim() : "";

  // Silently accept bot submissions caught by the honeypot.
  if (honeypot.length > 0) {
    return res.status(200).json({ ok: true });
  }
  const safeFormName = String(formName).trim() || "site_form";

  const cleanedFields = Object.entries(fields).filter(
    ([key, value]) =>
      key.trim().length > 0 &&
      value !== undefined &&
      value !== null &&
      String(value).trim().length > 0,
  );

  if (cleanedFields.length === 0) {
    return res.status(400).json({ error: "Aucune donnee a envoyer." });
  }

  const nowDate = new Date();
  const now = nowDate.toISOString();
  const submissionId = generateSubmissionId(nowDate);
  const subject = `[${submissionId}] Nouveau formulaire: ${safeFormName}`;
  const textLines = cleanedFields.map(([key, value]) => `${key}: ${value}`);
  const text = [
    `Reference: ${submissionId}`,
    `Formulaire: ${safeFormName}`,
    `Date: ${now}`,
    "",
    ...textLines,
  ].join("\n");

  const htmlRows = cleanedFields
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;"><strong>${escapeHtml(
          key,
        )}</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(
          String(value),
        )}</td></tr>`,
    )
    .join("");

  const requesterEmail =
    typeof fields.email === "string" && fields.email.includes("@")
      ? fields.email
      : undefined;

  const emailPayload: EmailPayload = {
    from: fromEmail,
    to: toEmails,
    subject,
    text,
    html: `<div style="font-family:Arial,sans-serif;">
      <p><strong>Reference:</strong> ${escapeHtml(submissionId)}</p>
      <p><strong>Formulaire:</strong> ${escapeHtml(safeFormName)}</p>
      <p><strong>Date:</strong> ${escapeHtml(now)}</p>
      <table style="border-collapse:collapse;">${htmlRows}</table>
    </div>`,
    reply_to: requesterEmail,
  };

  const notifyResult = await sendResendEmail(apiKey, emailPayload);
  if (!notifyResult.ok) {
    return res.status(502).json({
      error: "Echec envoi email.",
      details: notifyResult.error,
    });
  }

  if (requesterEmail && autoReplyEnabled) {
    const autoReplySubject = `[${submissionId}] Confirmation de reception`;
    const autoReplyText = [
      "Bonjour,",
      "",
      `Nous avons bien recu votre demande via le formulaire "${safeFormName}".`,
      `Reference: ${submissionId}`,
      "",
      "Notre equipe vous recontactera dans les plus brefs delais.",
      "",
      "Assilel Tech",
    ].join("\n");

    const autoReplyHtml = `<div style="font-family:Arial,sans-serif;">
      <p>Bonjour,</p>
      <p>Nous avons bien recu votre demande via le formulaire <strong>${escapeHtml(
        safeFormName,
      )}</strong>.</p>
      <p><strong>Reference:</strong> ${escapeHtml(submissionId)}</p>
      <p>Notre equipe vous recontactera dans les plus brefs delais.</p>
      <p>Assilel Tech</p>
    </div>`;

    const autoReplyPayload: EmailPayload = {
      from: fromEmail,
      to: [requesterEmail],
      subject: autoReplySubject,
      text: autoReplyText,
      html: autoReplyHtml,
    };

    const autoReplyResult = await sendResendEmail(apiKey, autoReplyPayload);
    if (!autoReplyResult.ok) {
      // Ne bloque pas la soumission principale si la confirmation client échoue.
      console.error(
        `[${submissionId}] Auto-reply failed: ${autoReplyResult.error}`,
      );
    }
  }

  return res.status(200).json({ ok: true });
}
