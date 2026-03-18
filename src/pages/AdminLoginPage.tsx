import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { getAdminSession, loginAdmin } from "../lib/adminAuth";
import { trackEvent } from "../lib/analytics";

const resolveNextPath = (nextPath: string | null) => {
  if (!nextPath) return "/admin";
  return nextPath.startsWith("/admin") ? nextPath : "/admin";
};

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPath = useMemo(
    () => resolveNextPath(searchParams.get("next")),
    [searchParams],
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getAdminSession()
      .then((session) => {
        if (!isMounted) return;
        if (session.authenticated) {
          navigate(nextPath, { replace: true });
          return;
        }
        setIsCheckingSession(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setIsCheckingSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, nextPath]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginAdmin(email, password);
      trackEvent("admin_login_success", { next_path: nextPath });
      navigate(nextPath, { replace: true });
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Echec de connexion admin.";
      setError(message);
      trackEvent("admin_login_error", { reason: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-[#070B14]">
        <div className="w-full max-w-md p-8 border rounded-2xl bg-slate-900/70 border-white/10">
          <p className="text-sm text-center text-slate-300">
            Vérification de session admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[#070B14]">
      <div className="w-full max-w-md p-8 border rounded-2xl bg-slate-900/80 border-cyan-300/20">
        <h1 className="text-2xl font-bold text-slate-100">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-400">
          Accès réservé à l'administration du site.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Email admin
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 border rounded-xl bg-slate-800/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 border rounded-xl bg-slate-800/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            as="button"
            type="submit"
            className="w-full py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>

        <a
          href="/"
          className="inline-block mt-6 text-sm transition-colors text-slate-400 hover:text-cyan-300"
        >
          Retour au site
        </a>
      </div>
    </div>
  );
};
