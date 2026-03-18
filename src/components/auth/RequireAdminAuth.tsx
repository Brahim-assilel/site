import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAdminSession } from "../../lib/adminAuth";

type RequireAdminAuthProps = {
  children: React.ReactNode;
};

type AuthStatus = "loading" | "granted" | "denied";

export const RequireAdminAuth = ({ children }: RequireAdminAuthProps) => {
  const location = useLocation();
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let isMounted = true;

    getAdminSession()
      .then((session) => {
        if (!isMounted) return;
        setStatus(session.authenticated ? "granted" : "denied");
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus("denied");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-[#070B14]">
        <div className="w-full max-w-md p-8 text-center border rounded-2xl bg-slate-900/70 border-white/10">
          <p className="text-sm text-slate-300">Vérification de session admin...</p>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    const nextPath = `${location.pathname}${location.search}${location.hash}`;
    return (
      <Navigate
        to={`/admin/login?next=${encodeURIComponent(nextPath)}`}
        replace
      />
    );
  }

  return <>{children}</>;
};
