import { useState } from "react";
import { SECTEURS_EVACUES } from "../../constants/communes";

// Petite fenêtre (pattern <dialog> DaisyUI, comme les modals de CloneX)
// demandant où l'animal a été aperçu avant de confirmer "Marquer comme vu".
export default function MarquerVuModal({ dialogId, onConfirm }) {
  // States
  const [secteurVu, setSecteurVu] = useState("");
  const [rueVu, setRueVu] = useState("");

  // Fonctions
  const handleConfirm = () => {
    onConfirm({ secteurVu: secteurVu || null, rueVu: rueVu || null });
    document.getElementById(dialogId).close();
  };

  return (
    <dialog id={dialogId} className="modal modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Où a-t-il été aperçu ?</h3>
        <p className="text-sm text-neutral mb-4">
          Optionnel, mais ça aide le propriétaire à savoir où chercher.
        </p>

        <div className="flex flex-col gap-3">
          <select
            className="bg-base-200 rounded-full px-4 py-2 border-0 focus:outline-none"
            value={secteurVu}
            onChange={(e) => setSecteurVu(e.target.value)}
          >
            <option value="">Secteur non précisé</option>
            {SECTEURS_EVACUES.map((secteur) => (
              <option key={secteur} value={secteur}>
                {secteur}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Rue / lieu-dit (optionnel)"
            className="bg-base-200 rounded-full px-4 py-2 border-0 focus:outline-none"
            value={rueVu}
            onChange={(e) => setRueVu(e.target.value)}
          />
        </div>

        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn border-base-300">Annuler</button>
          </form>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn btn-primary border-primary"
          >
            Confirmer
          </button>
        </div>
      </div>
    </dialog>
  );
}
