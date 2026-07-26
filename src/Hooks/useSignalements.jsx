import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FIREBASE_DB_URL } from "../config";

// Calqué sur useTweets.jsx de CloneX : mêmes noms de variables, même forme
// (fetch + Object.entries + tri), juste un noeud différent ("signalements"
// au lieu de "tweets") et pas de authorId puisqu'il n'y a pas d'auth.
export default function useSignalements() {
  // Variables
  const queryClient = useQueryClient();

  // Fonctions
  const fetchSignalements = async () => {
    const response = await fetch(`${FIREBASE_DB_URL}/signalements.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    const data = await response.json();
    if (!data) return [];

    return Object.entries(data)
      .map(([id, signalement]) => ({
        id,
        ...signalement,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const createSignalement = async (signalement) => {
    const response = await fetch(`${FIREBASE_DB_URL}/signalements.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signalement),
    });

    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }

    return response.json();
  };

  const updateStatut = async ({ id, statut }) => {
    const response = await fetch(`${FIREBASE_DB_URL}/signalements/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statut }),
    });

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

  const { mutate: updateStatutMutation } = useMutation({
    mutationFn: updateStatut,
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
    updateStatut: updateStatutMutation,
  };
}
