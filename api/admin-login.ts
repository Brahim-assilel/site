import {
  createAdminSessionToken,
  getClientIp,
  isAdminIpAllowed,
  isSecureRequest,
  isValidAdminCredential,
  resolveAdminConfig,
  serializeSessionCookie,
} from "./admin-auth";
import { isAdminLoginRateLimitedPersistent } from "./admin-rate-limit";

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => unknown;
  setHeader: (name: string, value: string) => void;
};

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

const loginAttemptFallbackStore = new Map<string, number[]>();

const isRateLimitedFallback = (key: string) => {
  const now = Date.now();
  const timestamps = loginAttemptFallbackStore.get(key) || [];
  const recentAttempts = timestamps.filter(
    (timestamp) => now - timestamp < LOGIN_WINDOW_MS,
  );

  if (recentAttempts.length >= LOGIN_MAX_ATTEMPTS) {
    loginAttemptFallbackStore.set(key, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  loginAttemptFallbackStore.set(key, recentAttempts);
  return false;
};

const parseCredentials = (body: unknown) => {
  if (!body) return { email: "", password: "" };

  const parsedBody =
    typeof body === "string"
      ? (JSON.parse(body || "{}") as Record<string, unknown>)
      : (body as Record<string, unknown>);

  return {
    email: typeof parsedBody.email === "string" ? parsedBody.email : "",
    password:
      typeof parsedBody.password === "string" ? parsedBody.password : "",
  };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const adminConfig = resolveAdminConfig(process.env);
  if (!adminConfig.isConfigured) {
    return res.status(500).json({
      error:
        "Configuration admin manquante. Definissez ADMIN_EMAIL, ADMIN_PASSWORD et ADMIN_SESSION_SECRET.",
    });
  }

  const clientIp = getClientIp(req.headers, req.socket?.remoteAddress);
  if (!isAdminIpAllowed(clientIp, process.env)) {
    return res.status(403).json({
      error: "Acces admin refusé depuis cette IP.",
    });
  }

  let isRateLimited = false;
  try {
    isRateLimited = await isAdminLoginRateLimitedPersistent(process.env, clientIp);
  } catch {
    isRateLimited = isRateLimitedFallback(clientIp);
  }

  if (isRateLimited) {
    return res.status(429).json({
      error: "Trop de tentatives de connexion. Reessayez plus tard.",
    });
  }

  let email = "";
  let password = "";
  try {
    const parsed = parseCredentials(req.body);
    email = parsed.email;
    password = parsed.password;
  } catch {
    return res.status(400).json({ error: "Payload JSON invalide." });
  }

  if (!email.trim() || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis." });
  }

  const isValid = isValidAdminCredential(
    email,
    password,
    adminConfig.email,
    adminConfig.password,
  );

  if (!isValid) {
    return res.status(401).json({ error: "Identifiants invalides." });
  }

  const sessionToken = createAdminSessionToken(
    adminConfig.email,
    adminConfig.sessionSecret,
  );
  res.setHeader(
    "Set-Cookie",
    serializeSessionCookie(sessionToken, isSecureRequest(req.headers)),
  );

  return res.status(200).json({
    ok: true,
    email: adminConfig.email,
  });
}
