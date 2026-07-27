import { useMutation } from "@tanstack/react-query";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../config";

export default function useUploadPhoto() {
  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("L'envoi de la photo a échoué");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const { mutateAsync: uploadPhotoMutation, isPending: isUploading } =
    useMutation({
      mutationFn: uploadPhoto,
    });

  return { uploadPhoto: uploadPhotoMutation, isUploading };
}
