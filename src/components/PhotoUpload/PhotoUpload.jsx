import { useState } from "react";
import { Camera, X } from "lucide-react";

// Redimensionne l'image côté client avant l'upload (max 1200px de large) —
// identifier un animal ne demande pas une photo haute résolution, et ça
// réduit fortement la bande passante Cloudinary à l'échelle. Voir le plan,
// section "Passage à l'échelle".
async function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Compression échouée"));
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality,
        );
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PhotoUpload({ previewUrl, onFileReady, onClear }) {
  // States
  const [isCompressing, setIsCompressing] = useState(false);

  // Fonctions
  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCompressing(true);
    try {
      const compressed = await compressImage(file);
      onFileReady(compressed);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-neutral">Photo (optionnelle)</label>
      {previewUrl ? (
        <div className="relative w-28 h-28">
          <img
            src={previewUrl}
            alt="Aperçu"
            className="w-28 h-28 object-cover rounded-2xl"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl border-2 border-dashed border-base-300 cursor-pointer text-neutral">
          <Camera className="h-6 w-6 mb-1" />
          <span className="text-xs">{isCompressing ? "..." : "Ajouter"}</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  );
}
