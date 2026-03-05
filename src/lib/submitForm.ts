type SubmitMode = "remote" | "local";

type SubmitFormOptions = {
  allowLocalFallback?: boolean;
};

export const submitForm = async (
  endpoint: string | undefined,
  payload: Record<string, string>,
  options: SubmitFormOptions = {}
): Promise<SubmitMode> => {
  const { allowLocalFallback = true } = options;

  if (!endpoint) {
    if (!allowLocalFallback) {
      throw new Error(
        "Endpoint de formulaire non configuré. Définissez la variable d'environnement requise."
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 600));
    return "local";
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Impossible d'envoyer le formulaire pour le moment.");
  }

  return "remote";
};
