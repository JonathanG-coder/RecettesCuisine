import express from "express";
import { uploadImage, deleteImage, getImagesByEntity } from "../controllers/imageController.js";
import { verifyToken } from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadCloudinary.js"; 

const router = express.Router();

// Routes protégées par JWT
router.use(verifyToken);

// Upload image
router.post("/", upload.single("image"), uploadImage);

// Supprimer image par public_id
router.delete("/:public_id", deleteImage);

// Récupérer images d'une entité
router.get("/:entity_type/:entity_id", getImagesByEntity);

export default router;
