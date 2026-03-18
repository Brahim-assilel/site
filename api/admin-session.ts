import {
  getClientIp,
  getSessionTokenFromCookie,
  isAdminIpAllowed,
  resolveAdminConfig,
  verifyAdminSessionToken,
} from "./admin-auth";

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => unknown;
};

const getHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const adminConfig = resolveAdminConfig(process.env);
  if (!adminConfig.isConfigured) {
    return res.status(200).json({ authenticated: false });
  }

  const clientIp = getClientIp(req.headers, req.socket?.remoteAddress);
  if (!isAdminIpAllowed(clientIp, process.env)) {
    return res.status(200).json({ authenticated: false, email: null });
  }

  const cookieHeader = getHeaderValue(req.headers?.cookie);
  const token = getSessionTokenFromCookie(cookieHeader);
  const sessionEmail = verifyAdminSessionToken(token, adminConfig.sessionSecret);
  const isAuthenticated = sessionEmail === adminConfig.email;

  return res.status(200).json({
    authenticated: isAuthenticated,
    email: isAuthenticated ? adminConfig.email : null,
  });
}
