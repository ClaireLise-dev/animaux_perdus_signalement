import { Link, Navigate, useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { ArrowLeft, MapPin, CheckCircle2, Phone } from "lucide-react";
import useSignalements from "../Hooks/useSignalements";
import { cloudinaryThumbnail } from "../utils/cloudinaryUrl";

const LABELS_SEXE = { male: "Mâle", femelle: "Femelle", inconnu: "—" };

export default function AnimalProfil() {
  // Variables
  const { id } = useParams();
  const { signalements, isLoading, updateStatut } = useSignalements();
  const signalement = signalements?.find((s) => s.id === id);
  const estRetrouve = signalement?.statut === "retrouve";

  // Fonctions
  const handleMarquerRetrouve = () => {
    updateStatut({ id, statut: "retrouve" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Bars color="#7c3aed" />
      </div>
    );
  }

  if (!signalement) return <Navigate to="/404" replace />;

  return (
    <div className="flex flex-col items-center bg-base-100 min-h-screen p-4 lg:p-8 pb-20 lg:pb-8">
      <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
        <Link
          to="/"
          className="flex flex-row items-center gap-2 text-neutral self-start mb-3 mt-5 lg:mt-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>

        {signalement.photoUrl ? (
          <img
            src={cloudinaryThumbnail(signalement.photoUrl, {
              width: 400,
              height: 400,
            })}
            alt={signalement.nomAnimal}
            className="h-56 w-56 lg:h-64 lg:w-64 rounded-3xl object-cover shrink-0 shadow-xl"
          />
        ) : (
          <div className="h-56 w-56 lg:h-64 lg:w-64 rounded-3xl bg-base-300 shrink-0" />
        )}

        <span className="text-3xl text-base-content font-bold mt-3">
          {signalement.nomAnimal}
        </span>
        <span
          className={`badge ${
            estRetrouve ? "badge-success" : "badge-warning"
          } mb-2`}
        >
          {estRetrouve ? "Vu" : "Recherché"}
        </span>

        <div className="flex flex-col gap-3 w-full bg-base-200 rounded-2xl p-5 mt-4">
          <h2 className="text-lg font-medium text-primary">Caractéristiques</h2>
          <div className="grid grid-cols-2 gap-3 text-base-content">
            <div className="flex flex-col">
              <span className="text-sm text-neutral">Espèce</span>
              <span className="capitalize">{signalement.espece}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral">Taille</span>
              <span className="capitalize">{signalement.taille}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral">Sexe</span>
              <span>{LABELS_SEXE[signalement.sexe] || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral">Couleur</span>
              <span>{signalement.couleur || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral">Signe particulier</span>
              <span>{signalement.signeParticulier || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral">Pucé</span>
              <span>{signalement.estPuce ? "Oui" : "Non"}</span>
            </div>
          </div>
          {signalement.description && (
            <p className="text-base-content border-t border-base-300 pt-3">
              {signalement.description}
            </p>
          )}
        </div>

        <div className="flex flex-row items-center gap-1 text-neutral text-sm w-full mt-4">
          <MapPin className="h-4 w-4" />
          <span>
            {signalement.secteur}
            {signalement.rue ? `, ${signalement.rue}` : ""}
          </span>
        </div>

        <div className="flex flex-row items-center gap-1 text-neutral text-sm w-full mb-4">
          <Phone className="h-4 w-4" />
          <span>
            {signalement.nomProprio} — {signalement.contactProprio}
          </span>
        </div>

        {!estRetrouve && (
          <button
            onClick={handleMarquerRetrouve}
            className="btn btn-primary border-primary gap-2 mb-8"
          >
            <CheckCircle2 className="h-5 w-5" />
            Marquer comme vu
          </button>
        )}
      </div>
    </div>
  );
}
