import { MapPin, Utensils, Phone } from "lucide-react";
import useSignalements from "../../Hooks/useSignalements";
import { formatDateVu } from "../../utils/formatDate";

// Card pour un animal resté sur place et signalé comme ayant besoin
// d'être nourri (voir SignalementForm, case "besoinNourriture"). Reprend
// la structure d'AnimalCard, avec les consignes d'accès et l'historique
// de nourrissage à la place du statut "vu"/"recherché".
export default function ANourrirCard({ signalement }) {
  // Variables
  const { marquerNourri } = useSignalements();
  const dernierNourrissage = signalement.nourrissages?.[0];

  // Fonctions
  const handleMarquerNourri = () => {
    marquerNourri({ id: signalement.id });
  };

  return (
    <div className="flex flex-col bg-base-100 p-5 mt-4 shadow-xl rounded-2xl w-full">
      <div className="flex flex-row items-center justify-between mb-2">
        <span className="font-medium text-base-content text-lg">
          {signalement.nomAnimal}{" "}
          <span className="text-neutral text-sm capitalize font-normal">
            · {signalement.espece}
          </span>
        </span>
        {!dernierNourrissage && (
          <span className="badge badge-warning">Jamais nourri</span>
        )}
      </div>

      <div className="flex flex-row items-center gap-1 text-neutral text-sm mb-2">
        <MapPin className="h-4 w-4" />
        <span>
          {signalement.secteur}
          {signalement.rue ? `, ${signalement.rue}` : ""}
        </span>
      </div>

      {signalement.accesInstructions && (
        <p className="text-base-content text-sm mb-3 bg-base-200 rounded-xl p-3">
          {signalement.accesInstructions}
        </p>
      )}

      <div className="flex flex-row items-center gap-1 text-neutral text-sm mb-3">
        <Phone className="h-4 w-4" />
        <span>
          {signalement.nomProprio} — {signalement.contactProprio}
        </span>
      </div>

      <div className="flex flex-row justify-between items-center border-t border-base-300 pt-3">
        {dernierNourrissage ? (
          <span className="flex flex-row items-center gap-1 text-success text-sm">
            <Utensils className="h-4 w-4" />
            Nourri le {formatDateVu(dernierNourrissage.date)}
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={handleMarquerNourri}
          className="flex flex-row items-center gap-1 text-success text-sm cursor-pointer"
        >
          <Utensils className="h-4 w-4" />
          Marquer nourri aujourd'hui
        </button>
      </div>
    </div>
  );
}
