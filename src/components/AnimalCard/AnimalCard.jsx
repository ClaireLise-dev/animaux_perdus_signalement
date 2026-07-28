import { Link } from "react-router-dom";
import useSignalements from "../../Hooks/useSignalements";
import { MapPin, CheckCircle2, Cpu } from "lucide-react";
import { cloudinaryThumbnail } from "../../utils/cloudinaryUrl";
import { formatDateVu } from "../../utils/formatDate";
import MarquerVuModal from "../MarquerVuModal/MarquerVuModal";

const LABELS_SEXE = { male: "Mâle", femelle: "Femelle" };

export default function AnimalCard({ signalement }) {
  const { marquerVu } = useSignalements();
  const estRetrouve = signalement.statut === "retrouve";
  const dialogId = `marquer-vu-${signalement.id}`;
  const dernierVu = signalement.observations?.[0];

  const handleMarquerRetrouve = ({ secteurVu, rueVu, contactVu }) => {
    marquerVu({ id: signalement.id, secteurVu, rueVu, contactVu });
  };

  return (
    <div className="flex flex-col bg-base-100 p-5 mt-4 shadow-xl rounded-2xl w-full">
      <div className="flex flex-row items-start gap-4 mb-3">
        <Link to={`/animal/${signalement.id}`} className="shrink-0">
          {signalement.photoUrl ? (
            <img
              src={cloudinaryThumbnail(signalement.photoUrl, {
                width: 160,
                height: 160,
              })}
              alt={signalement.nomAnimal}
              className="h-20 w-20 rounded-2xl object-cover shrink-0"
            />
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-base-300 shrink-0" />
          )}
        </Link>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center justify-between">
            <Link
              to={`/animal/${signalement.id}`}
              className="font-medium text-base-content text-lg hover:underline"
            >
              {signalement.nomAnimal}
            </Link>
            <span
              className={`badge ${
                estRetrouve ? "badge-success" : "badge-warning"
              }`}
            >
              {estRetrouve ? "Vu" : "Recherché"}
            </span>
          </div>
          <span className="text-sm text-neutral capitalize">
            {signalement.espece}
            {LABELS_SEXE[signalement.sexe]
              ? ` · ${LABELS_SEXE[signalement.sexe]}`
              : ""}
            {" · "}
            {signalement.couleur} · {signalement.taille}
          </span>
          {signalement.signeParticulier && (
            <span className="text-sm text-neutral">
              {signalement.signeParticulier}
            </span>
          )}
          {signalement.estPuce && (
            <span className="flex flex-row items-center gap-1 text-sm text-neutral">
              <Cpu className="h-3.5 w-3.5" />
              Pucé
            </span>
          )}
        </div>
      </div>

      {signalement.description && (
        <p className="text-base-content mb-3">{signalement.description}</p>
      )}

      <div className="flex flex-row items-center gap-1 text-neutral text-sm mb-3">
        <MapPin className="h-4 w-4" />
        <span>
          {signalement.secteur}
          {signalement.rue ? `, ${signalement.rue}` : ""}
        </span>
      </div>

      {dernierVu && (
        <div className="flex flex-row items-center gap-1 text-success text-sm mb-3">
          <MapPin className="h-4 w-4" />
          <span>
            Dernier vu {dernierVu.secteur ? `à ${dernierVu.secteur}` : ""}
            {dernierVu.rue ? `, ${dernierVu.rue}` : ""}
            {dernierVu.date ? ` le ${formatDateVu(dernierVu.date)}` : ""}
            {dernierVu.contact ? ` — contact : ${dernierVu.contact}` : ""}
          </span>
        </div>
      )}

      <div className="flex flex-row justify-between items-center border-t border-base-300 pt-3">
        <span className="text-sm text-neutral">
          Contact : {signalement.nomProprio} — {signalement.contactProprio}
        </span>
        <button
          onClick={() => document.getElementById(dialogId).showModal()}
          className="flex flex-row items-center gap-1 text-success text-sm cursor-pointer"
        >
          <CheckCircle2 className="h-4 w-4" />
          {estRetrouve ? "Signaler un nouveau vu" : "Marquer comme vu"}
        </button>
      </div>

      <MarquerVuModal dialogId={dialogId} onConfirm={handleMarquerRetrouve} />
    </div>
  );
}
