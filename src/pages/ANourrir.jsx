import { Bars } from "react-loader-spinner";
import { Utensils } from "lucide-react";
import useSignalements from "../Hooks/useSignalements";
import ANourrirCard from "../components/ANourrirCard/ANourrirCard";

// Liste des animaux restés sur place et signalés comme ayant besoin d'être
// nourris (voir SignalementForm, case "besoinNourriture"). Triés par ordre
// d'urgence : jamais nourris ou nourris depuis le plus longtemps en premier.
export default function ANourrir() {
  // Variables
  const { signalements, isLoading } = useSignalements();

  const aNourrir = signalements
    ?.filter((signalement) => signalement.besoinNourriture)
    .sort((a, b) => {
      const dateA = a.nourrissages?.[0]?.date;
      const dateB = b.nourrissages?.[0]?.date;
      if (!dateA && !dateB) return 0;
      if (!dateA) return -1;
      if (!dateB) return 1;
      return new Date(dateA) - new Date(dateB);
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
      <div className="flex flex-row items-center gap-2 mt-5 lg:mt-0 mb-2">
        <Utensils className="h-6 w-6 text-primary" />
        <h1 className="text-2xl lg:text-3xl text-primary font-bold">
          Animaux à nourrir
        </h1>
      </div>

      {aNourrir?.length === 0 && (
        <p className="text-neutral text-center mt-8">
          Aucun animal signalé à nourrir pour l'instant.
        </p>
      )}

      {aNourrir?.map((signalement) => (
        <ANourrirCard key={signalement.id} signalement={signalement} />
      ))}
    </div>
  );
}
