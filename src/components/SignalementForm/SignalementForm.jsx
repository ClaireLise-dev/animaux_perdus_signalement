import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import useSignalements from "../../Hooks/useSignalements";
import useUploadPhoto from "../../Hooks/useUploadPhoto";
import DescriptionAnimalFields from "../DescriptionAnimalFields/DescriptionAnimalFields";
import PhotoUpload from "../PhotoUpload/PhotoUpload";
import { SECTEURS_EVACUES } from "../../constants/communes";
import { useNavigate } from "react-router-dom";

export default function SignalementForm() {
  // Variables
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { createSignalement, isCreating } = useSignalements();
  const { uploadPhoto, isUploading } = useUploadPhoto();

  // States
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Fonctions
  const handlePhotoReady = (file) => {
    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handlePhotoClear = () => {
    setPhotoFile(null);
    setPreviewUrl(null);
  };

  const onSubmit = async (data) => {
    // La photo est un bonus : si l'upload échoue (Cloudinary mal
    // configuré, réseau coupé...), on publie quand même le signalement
    // sans photo plutôt que de tout bloquer. C'est ce qui compte le plus
    // en urgence.
    let photoUrl = null;
    if (photoFile) {
      try {
        photoUrl = await uploadPhoto(photoFile);
      } catch (error) {
        console.error("Upload photo échoué :", error);
        toast.warn("La photo n'a pas pu être envoyée, publication sans photo");
      }
    }

    try {
      const newSignalement = {
        nomAnimal: data.nomAnimal,
        espece: data.espece,
        sexe: data.sexe,
        couleur: data.couleur,
        taille: data.taille,
        signeParticulier: data.signeParticulier,
        estPuce: data.estPuce,
        description: data.description,
        photoUrl,
        secteur: data.secteur,
        rue: data.rue,
        nomProprio: data.nomProprio,
        contactProprio: data.contactProprio,
        statut: "recherche",
        createdAt: new Date().toISOString(),
      };

      createSignalement(newSignalement);
      toast.success("Signalement publié !");
      reset();
      handlePhotoClear();
      navigate("/");
    } catch (error) {
      console.error("Publication du signalement échouée :", error);
      toast.error("Une erreur est intervenue");
    }
  };

  const loading = isSubmitting || isCreating || isUploading;

  return (
    <form
      className="flex flex-col gap-4 bg-base-200 p-5 shadow-xl rounded-2xl w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-bold text-primary">
        Signaler un animal perdu
      </h2>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">Nom de l'animal</label>
          <input
            type="text"
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("nomAnimal", { required: "Le nom est obligatoire" })}
          />
          {errors.nomAnimal && (
            <p className="text-error mt-1 text-sm">
              {errors.nomAnimal.message}
            </p>
          )}
        </div>
        <PhotoUpload
          previewUrl={previewUrl}
          onFileReady={handlePhotoReady}
          onClear={handlePhotoClear}
        />
      </div>

      <DescriptionAnimalFields register={register} errors={errors} />

      <div className="flex flex-col">
        <label className="text-sm text-neutral mb-1">
          Description complémentaire
        </label>
        <textarea
          rows={2}
          placeholder="Toute information utile pour le reconnaître..."
          className="bg-base-100 rounded-2xl px-4 py-2 border-0 focus:outline-none resize-none"
          {...register("description")}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">
            Secteur de disparition
          </label>
          <select
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("secteur", { required: "Le secteur est obligatoire" })}
            defaultValue=""
          >
            <option value="" disabled>
              Choisir un secteur...
            </option>
            {SECTEURS_EVACUES.map((secteur) => (
              <option key={secteur} value={secteur}>
                {secteur}
              </option>
            ))}
          </select>
          {errors.secteur && (
            <p className="text-error mt-1 text-sm">{errors.secteur.message}</p>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">Rue / lieu-dit</label>
          <input
            type="text"
            placeholder="Ex : rue des Pins, Cazaux..."
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("rue")}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">Ton nom</label>
          <input
            type="text"
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("nomProprio", { required: "Ton nom est obligatoire" })}
          />
          {errors.nomProprio && (
            <p className="text-error mt-1 text-sm">
              {errors.nomProprio.message}
            </p>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">
            Téléphone ou email
          </label>
          <input
            type="text"
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("contactProprio", {
              required: "Un contact est obligatoire",
            })}
          />
          {errors.contactProprio && (
            <p className="text-error mt-1 text-sm">
              {errors.contactProprio.message}
            </p>
          )}
        </div>
      </div>

      <button
        className="btn btn-primary border-primary self-end disabled:cursor-not-allowed disabled:opacity-90"
        disabled={loading}
      >
        {loading ? "Publication..." : "Publier le signalement"}
      </button>
    </form>
  );
}
