import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <Ghost size={200} className="mx-auto text-primary" />
      <p className="text-2xl text-center text-base-content font-bold">
        Oups, la page que tu cherches n'existe pas !
      </p>
      <Link
        to="/"
        className="btn btn-primary border-primary text-white hover:bg-primary/80 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
