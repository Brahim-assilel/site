import { isSecureRequest, serializeSessionClearCookie } from "./admin-auth";

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => unknown;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  res.setHeader(
    "Set-Cookie",
    serializeSessionClearCookie(isSecureRequest(req.headers)),
  );

  return res.status(200).json({ ok: true });
}
