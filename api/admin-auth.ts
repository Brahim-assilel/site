import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE_NAME = "assilel_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 12 * 60 * 60;

type HeaderValue = string | string[] | undefined;
type HeadersLike = Record<string, HeaderValue> | undefined;

type SessionPayload = {
  email: string;
  exp: number;
};

const getHeaderValue = (value: HeaderValue) =>
  Array.isArray(value) ? value[0] : value;

const toBase64Url = (value: string) => Buffer.from(value, "utf8").toString("base64url");

const fromBase64Url = (value: string) => Buffer.from(value, "base64url").toString("utf8");

const signValue = (value: string, secret: string) =>
  createHmac("sha256", secret).update(value).digest("base64url");

const constantTimeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
};

export const isSecureRequest = (headers: HeadersLike) => {
  const forwardedProto = getHeaderValue(headers?.["x-forwarded-proto"]);
  return typeof forwardedProto === "string" && forwardedProto.trim().toLowerCase() === "https";
};

export const getClientIp = (
  headers: HeadersLike,
  remoteAddress: string | undefined,
) => {
  const forwardedFor = getHeaderValue(headers?.["x-forwarded-for"]);
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = getHeaderValue(headers?.["x-real-ip"]);
  if (realIp) {
    return realIp.trim();
  }

  return remoteAddress || "unknown";
};

const normalizeIp = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return "";
  if (normalized === "localhost") return "127.0.0.1";
  if (normalized.startsWith("::ffff:")) {
    return normalized.slice(7);
  }

  return normalized;
};

const expandLoopbackAliases = (ip: string) => {
  if (ip === "127.0.0.1" || ip === "::1") {
    return ["127.0.0.1", "::1"];
  }

  return [ip];
};

export const parseAdminAllowedIps = (value: string | undefined) =>
  (value || "")
    .split(",")
    .map((part) => normalizeIp(part))
    .filter(Boolean);

export const isAdminIpAllowed = (
  clientIp: string,
  env: Record<string, string | undefined>,
) => {
  const allowedIps = parseAdminAllowedIps(env.ADMIN_ALLOWED_IPS);
  if (allowedIps.length === 0) {
    return true;
  }

  const normalizedClientIp = normalizeIp(clientIp);
  if (!normalizedClientIp) {
    return false;
  }

  const candidateIps = expandLoopbackAliases(normalizedClientIp);
  return candidateIps.some((ip) => allowedIps.includes(ip));
};

export const parseCookieHeader = (cookieHeader: string | undefined) => {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, rawPart) => {
    const separatorIndex = rawPart.indexOf("=");
    if (separatorIndex <= 0) return acc;

    const key = rawPart.slice(0, separatorIndex).trim();
    const value = rawPart.slice(separatorIndex + 1).trim();
    if (!key) return acc;
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
};

export const getSessionTokenFromCookie = (cookieHeader: string | undefined) => {
  const cookies = parseCookieHeader(cookieHeader);
  return cookies[ADMIN_SESSION_COOKIE_NAME];
};

export const createAdminSessionToken = (email: string, sessionSecret: string) => {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const payloadEncoded = toBase64Url(JSON.stringify(payload));
  const signature = signValue(payloadEncoded, sessionSecret);
  return `${payloadEncoded}.${signature}`;
};

export const verifyAdminSessionToken = (
  token: string | undefined,
  sessionSecret: string,
) => {
  if (!token) return null;

  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex <= 0) return null;

  const payloadEncoded = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);
  const expectedSignature = signValue(payloadEncoded, sessionSecret);

  if (!constantTimeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payloadRaw = fromBase64Url(payloadEncoded);
    const payload = JSON.parse(payloadRaw) as SessionPayload;
    if (
      typeof payload.email !== "string" ||
      payload.email.trim().length === 0 ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) {
      return null;
    }

    return payload.email.trim().toLowerCase();
  } catch {
    return null;
  }
};

export const serializeSessionCookie = (token: string, secure: boolean) => {
  const secureFlag = secure ? "; Secure" : "";
  return `${ADMIN_SESSION_COOKIE_NAME}=${encodeURIComponent(
    token,
  )}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${ADMIN_SESSION_TTL_SECONDS}${secureFlag}`;
};

export const serializeSessionClearCookie = (secure: boolean) => {
  const secureFlag = secure ? "; Secure" : "";
  return `${ADMIN_SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secureFlag}`;
};

export const resolveAdminConfig = (env: Record<string, string | undefined>) => {
  const email = env.ADMIN_EMAIL?.trim().toLowerCase() || "";
  const password = env.ADMIN_PASSWORD?.trim() || "";
  const sessionSecret = env.ADMIN_SESSION_SECRET?.trim() || "";
  const isConfigured = email.length > 0 && password.length > 0 && sessionSecret.length > 0;

  return {
    isConfigured,
    email,
    password,
    sessionSecret,
  };
};

export const isValidAdminCredential = (
  inputEmail: string,
  inputPassword: string,
  expectedEmail: string,
  expectedPassword: string,
) => {
  const normalizedEmail = inputEmail.trim().toLowerCase();
  return (
    constantTimeEqual(normalizedEmail, expectedEmail) &&
    constantTimeEqual(inputPassword, expectedPassword)
  );
};
