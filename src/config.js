// Petite amélioration par rapport à CloneX (qui répétait l'URL Firebase en
// dur dans chaque hook) : un seul endroit à changer si l'URL de la base
// change.
export const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
