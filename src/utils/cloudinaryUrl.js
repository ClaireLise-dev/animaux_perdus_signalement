// Insère une transformation Cloudinary (redimensionnement + format/qualité
// auto) directement dans l'URL, sans re-upload ni fichier supplémentaire à
// gérer : la version redimensionnée est générée une fois puis mise en
// cache par le CDN Cloudinary. Réduit fortement la bande passante
// consommée pour les vignettes de la liste — voir le plan, section
// "Passage à l'échelle".
export function cloudinaryThumbnail(url, { width = 150, height = 150 } = {}) {
  if (!url || !url.includes("/upload/")) return url;
  const transformation = `w_${width},h_${height},c_fill,q_auto,f_auto`;
  return url.replace("/upload/", `/upload/${transformation}/`);
}
