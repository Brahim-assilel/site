type SessionResponse = {
  authenticated: boolean;
  email?: string | null;
};

const parseErrorMessage = async (response: Response, fallback: string) => {
  const errorBody = await response.json().catch(() => null);
  if (errorBody && typeof errorBody.error === "string") {
    return errorBody.error;
  }

  return fallback;
};

export const getAdminSession = async () => {
  const response = await fetch("/api/admin-session", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return {
      authenticated: false,
      email: null,
    } satisfies SessionResponse;
  }

  const payload = (await response.json().catch(() => ({
    authenticated: false,
    email: null,
  }))) as SessionResponse;

  return {
    authenticated: Boolean(payload.authenticated),
    email: payload.email ?? null,
  } satisfies SessionResponse;
};

export const loginAdmin = async (email: string, password: string) => {
  const response = await fetch("/api/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(response, "Echec de connexion admin."),
    );
  }

  const payload = (await response.json().catch(() => ({
    ok: true,
  }))) as { ok?: boolean; email?: string };

  return {
    ok: Boolean(payload.ok),
    email: payload.email ?? null,
  };
};

export const logoutAdmin = async () => {
  const response = await fetch("/api/admin-logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      await parseErrorMessage(response, "Echec de deconnexion admin."),
    );
  }
};
