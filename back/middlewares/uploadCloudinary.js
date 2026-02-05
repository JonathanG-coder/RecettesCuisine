import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configuration Multer + Cloudinary avec dossier dynamique
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = "recettesCuisine"; // dossier par défaut

    // Choisir le sous-dossier selon le type d'entité
    const entityType = req.body.entity_type; // doit être 'recipe', 'category' ou 'user'

    if (entityType === "recipe") folder = "recettesCuisine/recettes";
    else if (entityType === "category") folder = "recettesCuisine/categories";
    else if (entityType === "user") folder = "recettesCuisine/avatars";

    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg"]
    };
  }
});

export const upload = multer({ storage });
