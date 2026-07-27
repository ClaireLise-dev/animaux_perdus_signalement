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

    return Object.entries(data)
      .map(([id, signalement]) => {
        const observations = signalement.observations
          ? Object.values(signalement.observations).sort(
              (a, b) => new Date(b.date) - new Date(a.date),
            )
          : [];

        return {
          id,
          ...signalement,
          observations,
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

  // Ajoute un "vu" à l'historique du signalement (secteur/rue optionnels)
  // et passe le statut à "retrouve" au premier vu. Peut être appelé
  // plusieurs fois : chaque appel ajoute une nouvelle observation sans
  // écraser les précédentes (voir AnimalCard/AnimalProfil).
  const marquerVu = async ({ id, secteurVu, rueVu }) => {
    const obsResponse = await fetch(
      `${FIREBASE_DB_URL}/signalements/${id}/observations.json`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secteur: secteurVu || null,
          rue: rueVu || null,
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

  return {
    signalements,
    isLoading,
    isError,
    createSignalement: createSignalementMutation,
    isCreating,
    marquerVu: marquerVuMutation,
  };
}
