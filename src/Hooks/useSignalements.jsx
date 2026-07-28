import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FIREBASE_DB_URL } from "../config";

export default function useSignalements() {
  const queryClient = useQueryClient();

  const fetchSignalements = async () => {
    const response = await fetch(`${FIREBASE_DB_URL}/signalements.json`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    const data = await response.json();
    if (!data) return [];

    // observations : historique de tous les "vus" (un animal peut être
    // aperçu par plusieurs personnes avant d'être récupéré). nourrissages :
    // historique des passages pour nourrir un animal resté sur place (voir
    // SignalementForm, case "besoinNourriture"). Même principe pour les
    // deux : une liste Firebase à part, triée du plus récent au plus
    // ancien ; [0] = le plus récent.
    return Object.entries(data)
      .map(([id, signalement]) => {
        const observations = signalement.observations
          ? Object.values(signalement.observations).sort(
              (a, b) => new Date(b.date) - new Date(a.date),
            )
          : [];

        const nourrissages = signalement.nourrissages
          ? Object.values(signalement.nourrissages).sort(
              (a, b) => new Date(b.date) - new Date(a.date),
            )
          : [];

        return {
          id,
          ...signalement,
          observations,
          nourrissages,
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const createSignalement = async (signalement) => {
    const response = await fetch(`${FIREBASE_DB_URL}/signalements.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signalement),
    });

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  };

  const marquerVu = async ({ id, secteurVu, rueVu, contactVu }) => {
    const obsResponse = await fetch(
      `${FIREBASE_DB_URL}/signalements/${id}/observations.json`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secteur: secteurVu || null,
          rue: rueVu || null,
          contact: contactVu || null,
          date: new Date().toISOString(),
        }),
      },
    );

    if (!obsResponse.ok) {
      throw new Error("Une erreur est survenue");
    }

    const statutResponse = await fetch(
      `${FIREBASE_DB_URL}/signalements/${id}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut: "retrouve" }),
      },
    );

    if (!statutResponse.ok) {
      throw new Error("Une erreur est survenue");
    }

    return statutResponse.json();
  };

  // Ajoute un passage à l'historique de nourrissage d'un animal resté sur
  // place. Aucune donnée de localisation à demander : l'adresse est déjà
  // celle du signalement (secteur/rue).
  const marquerNourri = async ({ id }) => {
    const response = await fetch(
      `${FIREBASE_DB_URL}/signalements/${id}/nourrissages.json`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: new Date().toISOString() }),
      },
    );

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  };

  const {
    data: signalements,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["signalements"],
    queryFn: fetchSignalements,
  });

  const { mutate: createSignalementMutation, isPending: isCreating } =
    useMutation({
      mutationFn: createSignalement,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["signalements"] });
      },
    });

  const { mutate: marquerVuMutation } = useMutation({
    mutationFn: marquerVu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signalements"] });
    },
  });

  const { mutate: marquerNourriMutation } = useMutation({
    mutationFn: marquerNourri,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signalements"] });
    },
  });

  return {
    signalements,
    isLoading,
    isError,
    createSignalement: createSignalementMutation,
    isCreating,
    marquerVu: marquerVuMutation,
    marquerNourri: marquerNourriMutation,
  };
}
