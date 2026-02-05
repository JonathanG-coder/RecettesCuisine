import { Image } from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";

// Upload une image
export const uploadImage = async (req, res) => {
  const { entity_type, entity_id } = req.body;

  if (!req.file) return res.status(400).json({ message: "Aucune image uploadée" });

  try {
    const result = await Image.addImage({
      url: req.file.path,
      public_id: req.file.filename,
      entity_type,
      entity_id
    });

    res.status(201).json({ message: "Image uploadée avec succès", image: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer une image
export const deleteImage = async (req, res) => {
  const { public_id } = req.params;

  try {
    await cloudinary.uploader.destroy(public_id);
    await Image.deleteImage(public_id);

    res.json({ message: "Image supprimée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer toutes les images d'une entité
export const getImagesByEntity = async (req, res) => {
  const { entity_type, entity_id } = req.params;

  try {
    const images = await Image.getImagesByEntity(entity_type, entity_id);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
