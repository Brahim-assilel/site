type SubmitMode = "remote" | "local";

type SubmitFormOptions = {
  allowLocalFallback?: boolean;
  formName?: string;
};

export const submitForm = async (
  endpoint: string | undefined,
  payload: Record<string, string>,
  options: SubmitFormOptions = {}
): Promise<SubmitMode> => {
  const { allowLocalFallback = true, formName } = options;
  const resolvedEndpoint = endpoint?.trim() || "/api/form-submit";

  if (!resolvedEndpoint) {
    if (!allowLocalFallback) {
      throw new Error(
        "Endpoint de formulaire non configuré. Définissez la variable d'environnement requise."
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 600));
    return "local";
  }

  const response = await fetch(resolvedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      formName,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const baseMessage =
      errorBody && typeof errorBody.error === "string"
        ? errorBody.error
        : "Impossible d'envoyer le formulaire pour le moment.";
    const details =
      errorBody && typeof errorBody.details === "string"
        ? ` (${errorBody.details})`
        : "";
    const message = `${baseMessage}${details}`;
    throw new Error(message);
  }

  return "remote";
};
