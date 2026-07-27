export default function DescriptionAnimalFields({ register, errors }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">Espèce</label>
          <select
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("espece", { required: "L'espèce est obligatoire" })}
            defaultValue=""
          >
            <option value="" disabled>
              Choisir...
            </option>
            <option value="chat">Chat</option>
            <option value="chien">Chien</option>
            <option value="cheval">Cheval</option>
            <option value="nac">NAC (lapin, furet, etc.)</option>
          </select>
          {errors.espece && (
            <p className="text-error mt-1 text-sm">{errors.espece.message}</p>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">Taille</label>
          <select
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("taille")}
            defaultValue="moyen"
          >
            <option value="petit">Petit</option>
            <option value="moyen">Moyen</option>
            <option value="grand">Grand</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">Sexe</label>
          <select
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("sexe")}
            defaultValue="inconnu"
          >
            <option value="male">Mâle</option>
            <option value="femelle">Femelle</option>
            <option value="inconnu">Je ne sais pas</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-sm text-neutral mb-1">Couleur</label>
          <input
            type="text"
            placeholder="Ex : noir et blanc, roux..."
            className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
            {...register("couleur")}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-neutral mb-1">Signe particulier</label>
        <input
          type="text"
          placeholder="Ex : collier rouge, tache blanche sur l'oreille..."
          className="bg-base-100 rounded-full px-4 py-2 border-0 focus:outline-none"
          {...register("signeParticulier")}
        />
      </div>

      <label className="flex flex-row items-center gap-2 cursor-pointer w-fit">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          {...register("estPuce")}
        />
        <span className="text-sm text-base-content">
          Animal identifié par puce électronique
        </span>
      </label>
    </div>
  );
}
