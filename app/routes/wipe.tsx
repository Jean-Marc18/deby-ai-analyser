import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { ArrowLeft, Trash2 } from "lucide-react";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 items-center justify-center">
      <p>
        Authentifié en tant que:{" "}
        <span className="font-bold text-lg uppercase text-fuchsia-600">
          {auth.user?.username}
        </span>
      </p>
      <div>Fichiers existants:</div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {files.map((file) => (
          <div key={file.id} className="flex flex-row gap-4">
            <p className="font-bold text-blue-600">{file.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 items-center justify-center">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer flex flex-row gap-2 items-center"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer flex flex-row gap-2 items-center"
          onClick={() => handleDelete()}
        >
          <Trash2 className="w-4 h-4" /> Supprimer les données de l'application
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
