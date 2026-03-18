import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage } from "node:http";
import {
  createAdminSessionToken,
  getClientIp,
  getSessionTokenFromCookie,
  isAdminIpAllowed,
  isSecureRequest,
  isValidAdminCredential,
  resolveAdminConfig,
  serializeSessionClearCookie,
  serializeSessionCookie,
  verifyAdminSessionToken,
} from "./api/admin-auth";
import { isAdminLoginRateLimitedPersistent } from "./api/admin-rate-limit";
import {
  createBlogPost,
  deleteBlogPost,
  listAdminBlogPosts,
  listPublishedBlogPosts,
  setBlogPostPublished,
  updateBlogPost,
} from "./api/blog-db";
import {
  isUniqueViolationError,
  parseApiBody,
  parseBlogPostId,
  parseBlogPostWriteInput,
  parsePublishToggleInput,
} from "./api/blog-payload";

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

type EmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  reply_to?: string;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

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

const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000;
const ADMIN_LOGIN_MAX_ATTEMPTS = 8;
const adminLoginAttemptFallbackStore = new Map<string, number[]>();

const isAdminLoginRateLimitedFallback = (key: string) => {
  const now = Date.now();
  const timestamps = adminLoginAttemptFallbackStore.get(key) || [];
  const recentAttempts = timestamps.filter(
    (timestamp) => now - timestamp < ADMIN_LOGIN_WINDOW_MS,
  );

  if (recentAttempts.length >= ADMIN_LOGIN_MAX_ATTEMPTS) {
    adminLoginAttemptFallbackStore.set(key, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  adminLoginAttemptFallbackStore.set(key, recentAttempts);
  return false;
};

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => resolve(body));
  });

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-api-endpoints",
      configureServer(server) {
        const env = loadEnv(server.config.mode, process.cwd(), "");
        const apiKey = env.RESEND_API_KEY;
        const toEmailRaw =
          env.FORM_TO_EMAILS ||
          env.FORM_TO_EMAIL ||
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
          env.FORM_FROM_EMAIL ||
          "Assilel Tech <contact@assilel-tech.net>";
        const autoReplyEnabled = isEnabled(env.FORM_AUTOREPLY_ENABLED, true);
        const getHeaderValue = (value: string | string[] | undefined) =>
          Array.isArray(value) ? value[0] : value;
        const getAdminAuthState = (req: IncomingMessage) => {
          const clientIp = getClientIp(req.headers, req.socket.remoteAddress);
          if (!isAdminIpAllowed(clientIp, env)) {
            return {
              ok: false as const,
              status: 403,
              message: "Acces admin refusé depuis cette IP.",
            };
          }

          const adminConfig = resolveAdminConfig(env);
          if (!adminConfig.isConfigured) {
            return {
              ok: false as const,
              status: 500,
              message: "Configuration admin manquante.",
            };
          }

          const cookieHeader = getHeaderValue(req.headers.cookie);
          const token = getSessionTokenFromCookie(cookieHeader);
          const sessionEmail = verifyAdminSessionToken(
            token,
            adminConfig.sessionSecret,
          );
          if (sessionEmail !== adminConfig.email) {
            return {
              ok: false as const,
              status: 401,
              message: "Session admin invalide.",
            };
          }

          return {
            ok: true as const,
          };
        };

        server.middlewares.use(async (req, res, next) => {
          const urlPath = req.url?.split("?")[0] || "";

          if (urlPath === "/api/admin-session") {
            if (req.method !== "GET") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method Not Allowed" }));
              return;
            }

            const adminConfig = resolveAdminConfig(env);
            if (!adminConfig.isConfigured) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ authenticated: false }));
              return;
            }

            const clientIp = getClientIp(req.headers, req.socket.remoteAddress);
            if (!isAdminIpAllowed(clientIp, env)) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ authenticated: false, email: null }));
              return;
            }

            const cookieHeader = getHeaderValue(req.headers.cookie);
            const token = getSessionTokenFromCookie(cookieHeader);
            const sessionEmail = verifyAdminSessionToken(
              token,
              adminConfig.sessionSecret,
            );
            const isAuthenticated = sessionEmail === adminConfig.email;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                authenticated: isAuthenticated,
                email: isAuthenticated ? adminConfig.email : null,
              }),
            );
            return;
          }

          if (urlPath === "/api/admin-logout") {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method Not Allowed" }));
              return;
            }

            res.statusCode = 200;
            res.setHeader(
              "Set-Cookie",
              serializeSessionClearCookie(isSecureRequest(req.headers)),
            );
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
            return;
          }

          if (urlPath === "/api/admin-login") {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method Not Allowed" }));
              return;
            }

            const clientIp = getClientIp(req.headers, req.socket.remoteAddress);
            if (!isAdminIpAllowed(clientIp, env)) {
              res.statusCode = 403;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Acces admin refusé depuis cette IP.",
                }),
              );
              return;
            }

            let isRateLimited = false;
            try {
              isRateLimited = await isAdminLoginRateLimitedPersistent(env, clientIp);
            } catch {
              isRateLimited = isAdminLoginRateLimitedFallback(clientIp);
            }

            if (isRateLimited) {
              res.statusCode = 429;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Trop de tentatives de connexion. Reessayez plus tard.",
                }),
              );
              return;
            }

            const adminConfig = resolveAdminConfig(env);
            if (!adminConfig.isConfigured) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error:
                    "Configuration admin manquante. Definissez ADMIN_EMAIL, ADMIN_PASSWORD et ADMIN_SESSION_SECRET.",
                }),
              );
              return;
            }

            try {
              const body = await readBody(req);
              const parsedBody = body
                ? (JSON.parse(body) as Record<string, unknown>)
                : {};
              const email =
                typeof parsedBody.email === "string" ? parsedBody.email : "";
              const password =
                typeof parsedBody.password === "string"
                  ? parsedBody.password
                  : "";

              if (!email.trim() || !password) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(
                  JSON.stringify({
                    error: "Email et mot de passe requis.",
                  }),
                );
                return;
              }

              const isValid = isValidAdminCredential(
                email,
                password,
                adminConfig.email,
                adminConfig.password,
              );

              if (!isValid) {
                res.statusCode = 401;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Identifiants invalides." }));
                return;
              }

              const sessionToken = createAdminSessionToken(
                adminConfig.email,
                adminConfig.sessionSecret,
              );
              res.statusCode = 200;
              res.setHeader(
                "Set-Cookie",
                serializeSessionCookie(
                  sessionToken,
                  isSecureRequest(req.headers),
                ),
              );
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  ok: true,
                  email: adminConfig.email,
                }),
              );
              return;
            } catch {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Payload JSON invalide." }));
              return;
            }
          }

          if (urlPath === "/api/blog-posts") {
            if (req.method !== "GET") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method Not Allowed" }));
              return;
            }

            try {
              const posts = await listPublishedBlogPosts(env);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ posts }));
              return;
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : "Impossible de charger le blog.";
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: message }));
              return;
            }
          }

          if (urlPath === "/api/admin-blog-posts") {
            const authState = getAdminAuthState(req);
            if (!authState.ok) {
              res.statusCode = authState.status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: authState.message }));
              return;
            }

            if (req.method === "GET") {
              try {
                const posts = await listAdminBlogPosts(env);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ posts }));
                return;
              } catch (error) {
                const message =
                  error instanceof Error
                    ? error.message
                    : "Impossible de charger les articles.";
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: message }));
                return;
              }
            }

            if (req.method === "POST") {
              try {
                const body = parseApiBody(await readBody(req));
                const payload = parseBlogPostWriteInput(body);
                const post = await createBlogPost(env, payload);
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ post }));
                return;
              } catch (error) {
                if (isUniqueViolationError(error)) {
                  res.statusCode = 409;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Ce slug existe déjà." }));
                  return;
                }

                const message =
                  error instanceof Error
                    ? error.message
                    : "Impossible de créer l'article.";
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: message }));
                return;
              }
            }

            if (req.method === "PATCH") {
              try {
                const body = parseApiBody(await readBody(req));
                const hasOnlyPublishedToggle =
                  Object.keys(body).every(
                    (key) => key === "id" || key === "published",
                  ) && typeof body.published === "boolean";

                if (hasOnlyPublishedToggle) {
                  const { id, published } = parsePublishToggleInput(body);
                  const post = await setBlogPostPublished(env, id, published);
                  if (!post) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ error: "Article introuvable." }));
                    return;
                  }

                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ post }));
                  return;
                }

                const id = parseBlogPostId(body.id);
                const payload = parseBlogPostWriteInput(body);
                const post = await updateBlogPost(env, id, payload);
                if (!post) {
                  res.statusCode = 404;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Article introuvable." }));
                  return;
                }

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ post }));
                return;
              } catch (error) {
                if (isUniqueViolationError(error)) {
                  res.statusCode = 409;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Ce slug existe déjà." }));
                  return;
                }

                const message =
                  error instanceof Error
                    ? error.message
                    : "Impossible de modifier l'article.";
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: message }));
                return;
              }
            }

            if (req.method === "DELETE") {
              try {
                const body = parseApiBody(await readBody(req));
                const id = parseBlogPostId(body.id);
                const deleted = await deleteBlogPost(env, id);
                if (!deleted) {
                  res.statusCode = 404;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Article introuvable." }));
                  return;
                }

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ ok: true }));
                return;
              } catch (error) {
                const message =
                  error instanceof Error
                    ? error.message
                    : "Impossible de supprimer l'article.";
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: message }));
                return;
              }
            }

            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method Not Allowed" }));
            return;
          }

          if (urlPath !== "/api/form-submit") {
            return next();
          }

          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method Not Allowed" }));
            return;
          }

          const clientIp = getClientIp(req.headers, req.socket.remoteAddress);
          if (isRateLimited(clientIp)) {
            res.statusCode = 429;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: "Trop de tentatives. Reessayez dans quelques instants.",
              }),
            );
            return;
          }

          if (!apiKey) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "RESEND_API_KEY manquant." }));
            return;
          }

          try {
            const body = await readBody(req);
            const parsedBody = body ? JSON.parse(body) : {};
            const {
              formName = "site_form",
              __hp: honeypotRaw,
              ...fields
            } = parsedBody as Record<string, unknown>;
            const honeypot =
              typeof honeypotRaw === "string" ? honeypotRaw.trim() : "";

            // Silently accept bot submissions caught by the honeypot.
            if (honeypot.length > 0) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
              return;
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
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Aucune donnee a envoyer." }));
              return;
            }

            const nowDate = new Date();
            const now = nowDate.toISOString();
            const submissionId = generateSubmissionId(nowDate);
            const subject = `[${submissionId}] Nouveau formulaire: ${safeFormName}`;
            const textLines = cleanedFields.map(
              ([key, value]) => `${key}: ${value}`,
            );
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
              res.statusCode = 502;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Echec envoi email.",
                  details: notifyResult.error,
                }),
              );
              return;
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

              const autoReplyResult = await sendResendEmail(
                apiKey,
                autoReplyPayload,
              );
              if (!autoReplyResult.ok) {
                // Ne bloque pas la soumission principale si la confirmation client échoue.
                console.error(
                  `[${submissionId}] Auto-reply failed: ${autoReplyResult.error}`,
                );
              }
            }

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Payload JSON invalide." }));
            return;
          }
        });
      },
    },
  ],
});
