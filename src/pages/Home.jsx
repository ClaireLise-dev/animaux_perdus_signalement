import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { PlusCircle, MapPin } from "lucide-react";
import useSignalements from "../Hooks/useSignalements";
import AnimalCard from "../components/AnimalCard/AnimalCard";
import { SECTEURS_EVACUES } from "../constants/communes";

export default function Home() {
  // Variables
  const { signalements, isLoading } = useSignalements();

  // States
  const [filtreEspece, setFiltreEspece] = useState("toutes");
  const [filtreSecteur, setFiltreSecteur] = useState("tous");

  const signalementsFiltres = signalements?.filter((signalement) => {
    const matchEspece =
      filtreEspece === "toutes" || signalement.espece === filtreEspece;
    const matchSecteur =
      filtreSecteur === "tous" || signalement.secteur === filtreSecteur;
    return matchEspece && matchSecteur;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Bars color="#7c3aed" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-base-100 p-4 lg:p-8 max-w-2xl mx-auto">
      <div className="flex flex-row items-center justify-between mt-5 lg:mt-0 mb-2">
        <h1 className="text-2xl lg:text-3xl text-primary font-bold">
          Animaux recherchés
        </h1>
        <Link to="/signaler" className="btn btn-primary border-primary gap-2">
          <PlusCircle className="h-5 w-5" />
          Signaler
        </Link>
      </div>

      <div className="flex flex-row gap-3">
        <select
          className="flex-1 min-w-0 bg-base-200 rounded-full px-4 py-2 border-0 focus:outline-none"
          value={filtreEspece}
          onChange={(e) => setFiltreEspece(e.target.value)}
        >
          <option value="toutes">Toutes espèces</option>
          <option value="chat">Chat</option>
          <option value="chien">Chien</option>
          <option value="cheval">Cheval</option>
          <option value="nac">NAC</option>
        </select>
        <select
          className="flex-1 min-w-0 bg-base-200 rounded-full px-4 py-2 border-0 focus:outline-none"
          value={filtreSecteur}
          onChange={(e) => setFiltreSecteur(e.target.value)}
        >
          <option value="tous">Tous secteurs</option>
          {SECTEURS_EVACUES.map((secteur) => (
            <option key={secteur} value={secteur}>
              {secteur}
            </option>
          ))}
        </select>
      </div>

      {filtreSecteur !== "tous" && (
        <div className="flex flex-row items-center gap-1 text-neutral text-sm -mt-2">
          <MapPin className="h-4 w-4" />
          <span>Filtré sur : {filtreSecteur}</span>
        </div>
      )}

      {signalementsFiltres?.length === 0 && (
        <p className="text-neutral text-center mt-8">
          Aucun signalement pour l'instant.
        </p>
      )}

      {signalementsFiltres?.map((signalement) => (
        <AnimalCard key={signalement.id} signalement={signalement} />
      ))}
    </div>
  );
}
