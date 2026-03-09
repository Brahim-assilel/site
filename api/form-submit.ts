const TO_EMAIL = "brahim@assilel-tech.net";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => unknown;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
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
        : req.body ?? {};
  } catch {
    return res.status(400).json({ error: "Payload JSON invalide." });
  }

  const { formName = "site_form", ...fields } = parsedBody;

  const safeFormName = String(formName).trim() || "site_form";
  const cleanedFields = Object.entries(fields).filter(
    ([key, value]) =>
      key.trim().length > 0 &&
      value !== undefined &&
      value !== null &&
      String(value).trim().length > 0
  );

  if (cleanedFields.length === 0) {
    return res.status(400).json({ error: "Aucune donnee a envoyer." });
  }

  const now = new Date().toISOString();
  const subject = `Nouveau formulaire: ${safeFormName}`;
  const textLines = cleanedFields.map(([key, value]) => `${key}: ${value}`);
  const text = [`Formulaire: ${safeFormName}`, `Date: ${now}`, "", ...textLines].join(
    "\n"
  );

  const htmlRows = cleanedFields
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;"><strong>${escapeHtml(
          key
        )}</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(
          String(value)
        )}</td></tr>`
    )
    .join("");

  const requesterEmail =
    typeof fields.email === "string" && fields.email.includes("@")
      ? fields.email
      : undefined;

  const emailPayload = {
    from: process.env.FORM_FROM_EMAIL || "Assilel Tech <onboarding@resend.dev>",
    to: [TO_EMAIL],
    subject,
    text,
    html: `<div style="font-family:Arial,sans-serif;">
      <p><strong>Formulaire:</strong> ${escapeHtml(safeFormName)}</p>
      <p><strong>Date:</strong> ${escapeHtml(now)}</p>
      <table style="border-collapse:collapse;">${htmlRows}</table>
    </div>`,
    reply_to: requesterEmail,
  };

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!emailResponse.ok) {
    const errorBody = await emailResponse.text();
    return res.status(502).json({
      error: "Echec envoi email.",
      details: errorBody,
    });
  }

  return res.status(200).json({ ok: true });
}
