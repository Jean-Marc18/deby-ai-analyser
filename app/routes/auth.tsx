import { LucideArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Deby AI Analyser | Auth" },
  {
    name: "description",
    content: "Connectez-vous pour commencer",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-xl p-10">
          <div>
            <Link to="/" className="back-button w-fit">
              <LucideArrowLeft />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Bienvenue</h1>
            <h2>Connectez-vous pour commencer</h2>
          </div>

          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Connexion en cours ...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Déconnexion</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Se connecter</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
